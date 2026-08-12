"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { type ShopifyProduct } from "@/lib/shopify";
import ProductGrid from "./ProductGrid";

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

function matches(product: ShopifyProduct, terms: string[]): boolean {
  const haystack = normalize(
    [
      product.title,
      product.description,
      product.productType,
      product.handle,
      ...product.tags,
    ].join(" ")
  );
  return terms.every((term) => haystack.includes(term));
}

export default function SearchPage({ products }: { products: ShopifyProduct[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const terms = useMemo(
    () =>
      query
        .split(/\s+/)
        .map(normalize)
        .filter((t) => t.length > 0),
    [query]
  );

  const results = useMemo(() => {
    if (terms.length === 0) return products;
    return products.filter((p) => matches(p, terms));
  }, [products, terms]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = new URL(window.location.href);
    url.searchParams.set("q", query);
    router.replace(url.pathname + url.search, { scroll: false });
  };

  return (
    <>
      {/* Search bar */}
      <section className="bg-white py-8 md:py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <form onSubmit={handleSubmit} className="flex items-center gap-3 max-w-[560px] mx-auto">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pickles, murabbas..."
                autoFocus
                className="w-full pl-12 pr-4 py-3 bg-yellow/40 border border-brand-black/10 rounded-full text-[14px] text-brand-black placeholder:text-gray/60 focus:outline-none focus:border-red transition-colors"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-red text-white text-[12px] font-semibold uppercase tracking-wider rounded-full hover:bg-red-dark transition-colors"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Results */}
      <section className="bg-white pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {terms.length === 0 ? (
            <p className="text-center text-gray text-[14px]">
              Type a keyword above to search our collection.
            </p>
          ) : results.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray text-[15px] mb-2">
                No products found for &ldquo;{query}&rdquo;.
              </p>
              <p className="text-[13px] text-gray/60">
                Try a different keyword, or browse our full collection.
              </p>
            </div>
          ) : (
            <>
              <p className="text-[13px] text-gray mb-6 text-center">
                {results.length} {results.length === 1 ? "result" : "results"} for &ldquo;{query}&rdquo;
              </p>
              <ProductGrid products={results} />
            </>
          )}
        </div>
      </section>
    </>
  );
}
