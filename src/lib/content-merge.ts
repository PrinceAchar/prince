import type { SiteContent } from "./content-types";

/**
 * Overlays a stored (Firestore) content document onto the code defaults.
 * Shared by the client provider and the server-side content loader so both
 * resolve identical content.
 */
export function mergeContent(
  defaults: SiteContent,
  overrides: Partial<SiteContent> | null | undefined
): SiteContent {
  if (!overrides) return defaults;
  const result = { ...defaults };
  for (const key of Object.keys(overrides) as (keyof SiteContent)[]) {
    if (overrides[key] !== undefined && overrides[key] !== null) {
      (result as Record<string, unknown>)[key] = overrides[key];
    }
  }
  return result;
}
