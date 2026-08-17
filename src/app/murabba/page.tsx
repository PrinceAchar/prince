import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import CollectionHero from "@/components/CollectionHero";
import {
  shopifyFetch,
  getProductsByType,
  type CollectionByHandleData,
  type ShopifyProduct,
} from "@/lib/shopify";
import { PRODUCTS_BY_COLLECTION_QUERY } from "@/lib/queries";
import { Suspense } from "react";
import { productsJsonLd } from "@/lib/jsonld";
import { productPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

async function getMurabbaProducts(): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<CollectionByHandleData>(PRODUCTS_BY_COLLECTION_QUERY, {
      handle: "murabba",
      first: 20,
    });
    return data.collectionByHandle?.products.edges.map((e) => e.node) || [];
  } catch {
    return [];
  }
}

const PAGE_TITLE = "Murabba & Chutney | Prince Achar";
const PAGE_DESCRIPTION =
  "Slow-cooked fruit preserves and bold, tangy chutneys made with time-honored recipes. Every jar is a labor of love.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}): Promise<Metadata> {
  const { product } = await searchParams;
  return productPageMetadata(product, PAGE_TITLE, PAGE_DESCRIPTION);
}

export default async function MurabbaPage() {
  const [murabbas, chutneys] = await Promise.all([
    getMurabbaProducts(),
    getProductsByType("Chutney"),
  ]);
  const allProducts = [...murabbas, ...chutneys];

  return (
    <>
      {allProducts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd(allProducts)) }}
        />
      )}
      <Navbar />

      <section className="pt-[60px] md:pt-[70px]">
        <CollectionHero section="murabba" />
      </section>

      <section className="bg-white py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {murabbas.length > 0 ? (
            <Suspense>
              <ProductGrid products={murabbas} />
            </Suspense>
          ) : (
            <p className="text-center text-gray text-[14px]">Products coming soon.</p>
          )}
        </div>
      </section>

      {chutneys.length > 0 && (
        <>
          <section className="bg-white">
            <CollectionHero section="murabba-chutney" />
          </section>

          <section className="bg-white py-12 md:py-20">
            <div className="max-w-[1200px] mx-auto px-6">
              <Suspense>
                <ProductGrid products={chutneys} />
              </Suspense>
            </div>
          </section>
        </>
      )}

      <Footer />
    </>
  );
}
