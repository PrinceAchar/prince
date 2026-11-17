export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://princeachar.com";
export const SITE_NAME = "Prince Achar";

/**
 * Google Tag Manager container. All analytics tags (GA4, Ads, pixels) are
 * configured inside the container, so adding a new vendor does not require a
 * code change or a redeploy.
 */
export const GTM_ID =
  process.env.NEXT_PUBLIC_GTM_ID ?? "GTM-NXXBQ7LC";

/**
 * GA4 measurement ID. Not loaded directly by the site — GA4 runs as a tag
 * inside the GTM container above. Kept here so the value is documented in one
 * place and can be referenced if a direct gtag fallback is ever needed.
 */
export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-30ZQMK56KN";
