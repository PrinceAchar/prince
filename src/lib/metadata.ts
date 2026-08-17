import type { Metadata } from "next";
import { getProductByHandle } from "./shopify";
import { SITE_NAME, SITE_URL } from "./site";

export async function productPageMetadata(
  handle: string | undefined,
  fallbackTitle: string,
  fallbackDescription: string
): Promise<Metadata> {
  const base: Metadata = { title: fallbackTitle, description: fallbackDescription };
  if (!handle) return base;

  const product = await getProductByHandle(handle);
  if (!product) return base;

  const title = `${product.title} | ${SITE_NAME}`;
  const description = product.description.trim() || fallbackDescription;
  const image = product.images.edges[0]?.node;
  const url = `${SITE_URL}/products/${product.handle}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      siteName: SITE_NAME,
      images: image
        ? [{ url: image.url, width: image.width, height: image.height, alt: image.altText || product.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}
