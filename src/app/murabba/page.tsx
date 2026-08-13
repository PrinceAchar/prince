import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { shopifyFetch, type CollectionByHandleData, type ShopifyProduct } from "@/lib/shopify";
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

const PAGE_TITLE = "Murabbas | Prince Achar";
const PAGE_DESCRIPTION =
  "Slow-cooked fruit preserves made with time-honored recipes. Each murabba is a labor of love.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}): Promise<Metadata> {
  const { product } = await searchParams;
  return productPageMetadata(product, PAGE_TITLE, PAGE_DESCRIPTION);
}

export default async function MurabbaPage() {
  const products = await getMurabbaProducts();

  return (
    <>
      {products.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productsJsonLd(products)) }}
        />
      )}
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px]">
        <div
          className="relative w-full bg-yellow bg-cover bg-center aspect-[6/1] min-h-[280px]"
          style={{ backgroundImage: "url(/murabba-banner.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 py-10">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-white/90 mb-4">
              Sweet Preserves
            </span>
            <h1 className="font-heading text-[34px] md:text-[48px] lg:text-[56px] font-bold text-white mb-5 leading-tight">
              Murabbas
            </h1>
            <p className="text-[14px] md:text-[16px] text-white/90 leading-[1.8] max-w-[600px] mx-auto">
              Slow-cooked fruit preserves made with time-honored recipes. Each murabba is a
              labor of love — simmered to perfection and sealed with tradition.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS GRID */}
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
