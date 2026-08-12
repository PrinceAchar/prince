import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchPage from "@/components/SearchPage";
import { shopifyFetch, type ProductData, type ShopifyProduct } from "@/lib/shopify";
import { ALL_PRODUCTS_QUERY } from "@/lib/queries";

export const metadata = {
  title: "Search | Prince Achar",
  description:
    "Search Prince Achar's handcrafted pickles and preserves made in Old Delhi.",
};

async function getAllProducts(): Promise<ShopifyProduct[]> {
  try {
    const data = await shopifyFetch<ProductData>(ALL_PRODUCTS_QUERY, { first: 50 });
    return data.products.edges.map((e) => e.node);
  } catch {
    return [];
  }
}

export default async function SearchPageRoute() {
  const products = await getAllProducts();

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-14 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Search
          </span>
          <h1 className="font-heading text-[32px] md:text-[42px] font-bold text-brand-black mb-3 leading-tight">
            Find Your Flavor
          </h1>
          <p className="text-[13px] md:text-[14px] text-gray max-w-[480px] mx-auto">
            Search our full range of pickles and murabbas.
          </p>
        </div>
      </section>

      <Suspense>
        <SearchPage products={products} />
      </Suspense>

      <Footer />
    </>
  );
}
