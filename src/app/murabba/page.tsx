import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/ProductGrid";
import { shopifyFetch, type CollectionByHandleData, type ShopifyProduct } from "@/lib/shopify";
import { PRODUCTS_BY_COLLECTION_QUERY } from "@/lib/queries";
import { Suspense } from "react";

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

export const metadata = {
  title: "Murabbas | Prince Achar",
  description:
    "Slow-cooked fruit preserves made with time-honored recipes. Each murabba is a labor of love.",
};

export default async function MurabbaPage() {
  const products = await getMurabbaProducts();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
            Sweet Preserves
          </span>
          <h1 className="font-heading text-[36px] md:text-[48px] lg:text-[56px] font-bold text-brand-black mb-5 leading-tight">
            Murabbas
          </h1>
          <p className="text-[14px] md:text-[16px] text-gray leading-[1.8] max-w-[600px] mx-auto">
            Slow-cooked fruit preserves made with time-honored recipes. Each murabba is a
            labor of love — simmered to perfection and sealed with tradition.
          </p>
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
          Looking for something sweet and traditional?
        </h2>
        <p className="text-[14px] text-gray mb-6 max-w-[500px] mx-auto">
          Our murabbas make perfect gifts and festive treats. Reach out for bulk orders and custom assortments.
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
