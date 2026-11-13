import { defaultContent } from "./content-defaults";
import { mergeContent } from "./content-merge";
import type { SiteContent } from "./content-types";

/**
 * Server-side reader for the published site content document.
 *
 * The admin panel writes `siteContent/main` in Firestore; the storefront reads
 * it here so the first HTML response already contains the published copy
 * (crawlable, no flash of default content).
 *
 * A short in-memory TTL keeps this off the critical path on warm instances and
 * avoids a Firestore read per request. Content edits appear within TTL_MS.
 */
const TTL_MS = 60_000;

let cache: { value: SiteContent; expires: number } | null = null;

function hasAdminCredentials(): boolean {
  return Boolean(
    process.env.FIREBASE_PROJECT_ID &&
      process.env.FIREBASE_CLIENT_EMAIL &&
      process.env.FIREBASE_PRIVATE_KEY
  );
}

export async function getSiteContent(): Promise<SiteContent> {
  const now = Date.now();
  if (cache && cache.expires > now) return cache.value;

  if (!hasAdminCredentials()) {
    // Admin SDK not configured — ship the code defaults.
    return defaultContent;
  }

  try {
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");

    const app =
      getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert({
              projectId: process.env.FIREBASE_PROJECT_ID!,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
              privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
            }),
          });

    const snap = await getFirestore(app).doc("siteContent/main").get();
    const value = snap.exists
      ? mergeContent(defaultContent, snap.data() as Partial<SiteContent>)
      : defaultContent;

    cache = { value, expires: now + TTL_MS };
    return value;
  } catch (error) {
    console.error("[content-server] falling back to defaults:", error);
    return cache?.value ?? defaultContent;
  }
}
