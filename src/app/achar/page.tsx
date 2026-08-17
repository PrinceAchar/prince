import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import CollectionHero from "@/components/CollectionHero";
import { shopifyFetch, type CollectionByHandleData, type ShopifyProduct } from "@/lib/shopify";
import { PRODUCTS_BY_COLLECTION_QUERY } from "@/lib/queries";
import { Suspense } from "react";
import { productsJsonLd } from "@/lib/jsonld";
import { productPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

async function getAcharProducts(): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<CollectionByHandleData>(PRODUCTS_BY_COLLECTION_QUERY, {
      handle: "pickles",
      first: 20,
    });
    return data.collectionByHandle?.products.edges.map((e) => e.node) || [];
  } catch {
    return [];
  }
}

const PAGE_TITLE = "Authentic Pickles | Prince Achar";
const PAGE_DESCRIPTION =
  "Handcrafted pickles made in small batches using traditional Delhi recipes passed down since 1980.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}): Promise<Metadata> {
  const { product } = await searchParams;
  return productPageMetadata(product, PAGE_TITLE, PAGE_DESCRIPTION);
}

export default async function AcharPage() {
  const products = await getAcharProducts();

  return (
    <>
      {products.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd(products)) }}
        />
      )}
      <Navbar />

      <section className="pt-[60px] md:pt-[70px]">
        <CollectionHero section="achar" />
      </section>

      <section className="bg-white py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {products.length > 0 ? (
            <Suspense>
              <ProductGrid products={products} />
            </Suspense>
          ) : (
            <p className="text-center text-gray text-[14px]">Products coming soon.</p>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
