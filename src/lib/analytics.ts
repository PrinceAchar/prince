/**
 * Google Tag Manager dataLayer helpers.
 *
 * Nothing here sends data by itself — it only pushes standard GA4 ecommerce
 * payloads onto `window.dataLayer`. The GTM container decides what to do with
 * them, so the storefront stays decoupled from any single analytics vendor.
 *
 * Payload shapes follow the GA4 ecommerce schema:
 * https://developers.google.com/analytics/devguides/collection/ga4/ecommerce
 */

export interface Ga4Item {
  item_id: string;
  item_name: string;
  item_variant?: string;
  item_brand?: string;
  price: number;
  quantity: number;
}

declare global {
  interface Window {
    // GTM commands are pushed as arrays (gtag command form), tags as objects.
    dataLayer?: (Record<string, unknown> | unknown[])[];
  }
}

export function pushDataLayer(payload: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  // Reset the shared ecommerce object so a smaller event can't inherit items
  // from the previous one (a well-known GTM dataLayer gotcha).
  if ("ecommerce" in payload) window.dataLayer.push({ ecommerce: null });
  window.dataLayer.push(payload);
}

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

export function buildItem(input: {
  id: string;
  name: string;
  variant?: string;
  brand?: string;
  price: string | number;
  quantity?: number;
}): Ga4Item {
  return {
    item_id: input.id,
    item_name: input.name,
    ...(input.variant ? { item_variant: input.variant } : {}),
    item_brand: input.brand,
    price: Number(input.price),
    quantity: input.quantity ?? 1,
  };
}

function cartValue(items: Ga4Item[]): number {
  return round(
    items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );
}

export function trackViewItem(item: Ga4Item, currency: string): void {
  pushDataLayer({
    event: "view_item",
    ecommerce: {
      currency,
      value: round(item.price * item.quantity),
      items: [item],
    },
  });
}

export function trackAddToCart(item: Ga4Item, currency: string): void {
  pushDataLayer({
    event: "add_to_cart",
    ecommerce: {
      currency,
      value: round(item.price * item.quantity),
      items: [item],
    },
  });
}

export function trackRemoveFromCart(item: Ga4Item, currency: string): void {
  pushDataLayer({
    event: "remove_from_cart",
    ecommerce: {
      currency,
      value: round(item.price * item.quantity),
      items: [item],
    },
  });
}

export function trackBeginCheckout(
  items: Ga4Item[],
  currency: string
): void {
  pushDataLayer({
    event: "begin_checkout",
    ecommerce: {
      currency,
      value: cartValue(items),
      items,
    },
  });
}

/**
 * GTM processes dataLayer pushes asynchronously, so a push immediately
 * followed by a full-page navigation is usually lost. Give the container a
 * moment to fire its tags, then leave. 250ms is below the threshold where a
 * click feels unresponsive.
 */
export function navigateAfterTracking(url: string, delayMs = 250): void {
  if (typeof window === "undefined") return;
  window.setTimeout(() => {
    window.location.href = url;
  }, delayMs);
}
