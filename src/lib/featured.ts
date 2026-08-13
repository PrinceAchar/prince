import { getProductByHandle, type ShopifyProduct } from "./shopify";

// Source of truth for the homepage "Featured Bestsellers" section.
// This ordered list is what the store owner wants to showcase — a future
// admin panel will let the owner pick and reorder these products, writing
// back to this list (or the storage the panel uses). Until then, the
// handles below are the curated default, shown in this exact order.

export const FEATURED_PRODUCT_HANDLES = [
  "mango-pickle",
  "mix-pickle",
  "lemon-pickle",
  "amla-murabba",
];

export async function getFeaturedProducts(
  count = FEATURED_PRODUCT_HANDLES.length
): Promise<ShopifyProduct[]> {
  const products: ShopifyProduct[] = [];
  for (const handle of FEATURED_PRODUCT_HANDLES.slice(0, count)) {
    const product = await getProductByHandle(handle);
    if (product) products.push(product);
  }
  return products;
}
