import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";
import { verifyAdminIdToken } from "@/lib/firebase-admin";

export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const FOLDER_RE = /^[a-z0-9/_-]{1,64}$/;

// Best-effort in-memory rate limiting (per server instance).
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const entry = hits.get(key);
  if (!entry || entry.resetAt < now) {
    hits.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  if (hits.size > 5000) hits.clear(); // bound memory
  return entry.count > RATE_LIMIT_MAX;
}

function getClientKey(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || "unknown";
}

/**
 * Authenticated, signed Cloudinary upload.
 *
 * The old client-side unsigned preset was public in the JS bundle, letting
 * anyone upload to our Cloudinary. Now callers must present a Firebase ID
 * token of an allowlisted admin; the request is signed server-side with the
 * API secret, which never leaves the server.
 */
export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV !== "production";

  if (rateLimited(getClientKey(req))) {
    return NextResponse.json(
      { error: "Too many uploads. Please wait a minute." },
      { status: 429 }
    );
  }

  // Authenticate: Bearer <firebase id token>, except local development.
  let email: string | null = null;
  const authHeader = req.headers.get("authorization");
  if (authHeader?.startsWith("Bearer ")) {
    email = await verifyAdminIdToken(authHeader.slice(7));
  }
  if (!email && isDev) email = "dev@localhost";
  if (!email) {
    return NextResponse.json(
      { error: "Not authorized to upload." },
      { status: 401 }
    );
  }

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    return NextResponse.json(
      {
        error:
          "Server upload is not configured (CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET env vars missing).",
      },
      { status: 500 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data." }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  // Image-only; SVG is rejected (can carry scripts).
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml") {
    return NextResponse.json(
      { error: "Only raster images are allowed (PNG, JPG, WebP, GIF)." },
      { status: 415 }
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "Image is too large (max 8 MB)." },
      { status: 413 }
    );
  }

  const folder = String(form.get("folder") ?? "princeachar/admin");
  if (!FOLDER_RE.test(folder)) {
    return NextResponse.json({ error: "Invalid folder." }, { status: 400 });
  }

  const timestamp = Math.floor(Date.now() / 1000);
  const toSign = `folder=${folder}&timestamp=${timestamp}`;
  const signature = createHash("sha1")
    .update(toSign + apiSecret)
    .digest("hex");

  const outbound = new FormData();
  outbound.append("file", file, file.name || "upload");
  outbound.append("api_key", apiKey);
  outbound.append("timestamp", String(timestamp));
  outbound.append("folder", folder);
  outbound.append("signature", signature);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_/${cloudName}/image/upload`,
      { method: "POST", body: outbound }
    );
    const data = (await res.json()) as {
      secure_url?: string;
      error?: { message?: string };
    };
    if (!res.ok || !data.secure_url) {
      return NextResponse.json(
        { error: data.error?.message ?? "Cloudinary rejected the upload." },
        { status: 502 }
      );
    }
    return NextResponse.json({ url: data.secure_url, uploadedBy: email });
  } catch {
    return NextResponse.json(
      { error: "Could not reach Cloudinary. Try again." },
      { status: 502 }
    );
  }
}
