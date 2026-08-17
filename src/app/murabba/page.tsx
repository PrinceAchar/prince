import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
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

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px]">
        <div
          className="relative w-full bg-yellow bg-cover bg-center aspect-[6/1] min-h-[280px]"
          style={{ backgroundImage: "url(/murabba-banner.webp)" }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 py-10">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-white/90 mb-4">
              Slow-Cooked Fruit Preserves
            </span>
            <h1 className="font-heading text-[34px] md:text-[48px] lg:text-[56px] font-bold text-white mb-5 leading-tight">
              Murabba
            </h1>
            <p className="text-[14px] md:text-[16px] text-white/90 leading-[1.8] max-w-[600px] mx-auto">
              Slow-cooked fruit preserves made with time-honored
              recipes — simmered to perfection and sealed with tradition.
            </p>
          </div>
        </div>
      </section>

      {/* MURABBA GRID */}
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

      {/* CHUTNEY SECTION */}
      {chutneys.length > 0 && (
        <>
          {/* CHUTNEY BANNER */}
          <section className="bg-white">
            <div
              className="relative w-full bg-cover bg-center aspect-[6/1] min-h-[200px]"
              style={{ backgroundImage: "url(/chutney-banner.webp)" }}
            >
              <div className="absolute inset-0 bg-black/45" />
              <div className="relative h-full flex flex-col items-center justify-center text-center px-6 py-10">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-white/90 mb-3">
                  Sweet & Savory Companions
                </span>
                <h2 className="font-heading text-[28px] md:text-[38px] lg:text-[46px] font-bold text-white mb-3 leading-tight">
                  Chutneys
                </h2>
                <p className="text-[13px] md:text-[15px] text-white/90 max-w-[560px] mx-auto leading-relaxed">
                  Bold, tangy condiments crafted to pair with everything from parathas to platters.
                </p>
              </div>
            </div>
          </section>

          {/* CHUTNEY GRID */}
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
