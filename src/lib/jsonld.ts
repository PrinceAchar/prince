import type { ShopifyProduct } from "@/lib/shopify";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function productJsonLd(product: ShopifyProduct) {
  const price = product.priceRange.minVariantPrice;
  const inStock = product.variants.edges.some((e) => e.node.availableForSale);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: product.images.edges.map((e) => e.node.url),
    brand: { "@type": "Brand", name: SITE_NAME },
    url: `${SITE_URL}/products/${product.handle}`,
    offers: {
      "@type": "Offer",
      price: price.amount,
      priceCurrency: price.currencyCode,
      availability: inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };
}

export function productsJsonLd(products: ShopifyProduct[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, i) => {
      const image = product.images.edges[0]?.node.url;
      const price = product.priceRange.minVariantPrice;
      const inStock = product.variants.edges.some((e) => e.node.availableForSale);
      return {
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Product",
          name: product.title,
          description: product.description,
          image,
          brand: { "@type": "Brand", name: SITE_NAME },
          offers: {
            "@type": "Offer",
            price: price.amount,
            priceCurrency: price.currencyCode,
            availability: inStock
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        },
      };
    }),
  };
}
