import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { shopifyFetch, type CollectionByHandleData, type ShopifyProduct } from "@/lib/shopify";
import { PRODUCTS_BY_COLLECTION_QUERY } from "@/lib/queries";
import { Suspense } from "react";
import { productsJsonLd } from "@/lib/jsonld";

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

export const metadata = {
  title: "Authentic Pickles | Prince Achar",
  description:
    "Handcrafted pickles made in small batches using traditional Delhi recipes passed down since 1980.",
};

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

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px]">
        <div
          className="relative w-full bg-yellow bg-cover bg-center aspect-[6/1] min-h-[280px]"
          style={{ backgroundImage: "url(/achar-banner.jpg)" }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative h-full flex flex-col items-center justify-center text-center px-6 py-10">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-white/90 mb-4">
              Our Collection
            </span>
            <h1 className="font-heading text-[34px] md:text-[48px] lg:text-[56px] font-bold text-white mb-5 leading-tight">
              Authentic Pickles
            </h1>
            <p className="text-[14px] md:text-[16px] text-white/90 leading-[1.8] max-w-[600px] mx-auto">
              Handcrafted in small batches using traditional Delhi recipes passed down since 1980.
              Every jar is a promise of purity, flavor, and heritage.
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

      {/* CTA */}
      <section className="bg-yellow py-12 md:py-16 text-center px-6">
        <h2 className="font-heading text-[26px] md:text-[30px] font-bold text-brand-black mb-4">
          Can&apos;t decide? Try our Mixed Pickle.
        </h2>
        <p className="text-[14px] text-gray mb-6 max-w-[500px] mx-auto">
          A curated blend of our finest pickles in one jar — the perfect way to experience the full range of Prince Achar.
        </p>
        <a
          href="/contact"
          className="inline-block px-8 py-3 border-2 border-red text-red text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red hover:text-white transition-colors"
        >
          Get in Touch
        </a>
      </section>

      <Footer />
    </>
  );
}
