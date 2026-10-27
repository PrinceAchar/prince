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
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";

async function getMurabbaProducts(): Promise<ShopifyProduct[] | null> {
  try {
    const data = await shopifyFetch<CollectionByHandleData>(PRODUCTS_BY_COLLECTION_QUERY, {
      handle: "murabba",
      first: 20,
    });
    const products = data.collectionByHandle?.products.edges.map((e) => e.node) || [];
    return products.sort((a, b) => a.title.localeCompare(b.title));
  } catch {
    // Distinguish fetch failure from an empty collection so we don't
    // present an outage as "Products coming soon".
    return null;
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
  const base = await productPageMetadata(product, PAGE_TITLE, PAGE_DESCRIPTION);
  return {
    ...base,
    alternates: base.alternates ?? { canonical: `${SITE_URL}/murabba` },
  };
}

export default async function MurabbaPage() {
  const [murabbas, chutneys] = await Promise.all([
    getMurabbaProducts(),
    getProductsByType("Chutney"),
  ]);
  chutneys.sort((a, b) => a.title.localeCompare(b.title));
  const allProducts = [...(murabbas ?? []), ...chutneys];

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

      <section className="bg-surface py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {murabbas === null ? (
            <p className="text-center text-gray text-[14px]">
              Unable to load products right now. Please refresh the page.
            </p>
          ) : murabbas.length > 0 ? (
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
          <section className="bg-surface">
            <CollectionHero section="murabba-chutney" />
          </section>

          <section className="bg-surface py-12 md:py-20">
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
