export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "";

export function getCloudinaryUrl(publicId: string, options?: { width?: number; height?: number; quality?: string }): string {
  const params = new URLSearchParams();
  if (options?.width) params.set("w", String(options.width));
  if (options?.height) params.set("h", String(options.height));
  if (options?.quality) params.set("q", options.quality);
  const qs = params.toString();
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${qs ? qs + "/" : ""}${publicId}`;
}

/**
 * Uploads through our own signed endpoint (/api/admin/upload).
 * The endpoint verifies the caller's Firebase ID token (admin allowlist)
 * and signs the Cloudinary request server-side — the API secret and the
 * unsigned preset are no longer exposed to the browser.
 */
export async function uploadToCloudinary(file: File, folder: string): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("folder", folder);

  let idToken: string | null = null;
  try {
    const { getClientAuth } = await import("./firebase");
    idToken = (await getClientAuth().currentUser?.getIdToken()) ?? null;
  } catch {
    // Not signed in locally — the dev server bypasses auth on the endpoint.
  }

  const res = await fetch("/api/admin/upload", {
    method: "POST",
    headers: idToken ? { Authorization: `Bearer ${idToken}` } : {},
    body: formData,
  });

  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed. Please try again.");
  }
  return data.url;
}
