"use client";

import { useEffect, useState } from "react";
import { type ShopifyProduct } from "@/lib/shopify";
import ProductCard from "./ProductCard";
import { useContent } from "@/lib/content";

export default function BestsellersSection({ products }: { products: ShopifyProduct[] }) {
  const content = useContent();
  const bs = content.homepage.bestsellers;

  // 3 per view on desktop, 2 on mobile.
  const [perPage, setPerPage] = useState(3);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const calc = () => setPerPage(window.innerWidth < 1024 ? 2 : 3);
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const totalPages = Math.ceil(products.length / perPage);
  // Derive a clamped page during render so a viewport change (which lowers
  // totalPages) never leaves us pointing past the last page.
  const currentPage = Math.min(page, Math.max(totalPages - 1, 0));

  if (products.length === 0) return null;

  const canPrev = currentPage > 0;
  const canNext = currentPage < totalPages - 1;
  const navigate = (dir: number) =>
    setPage(Math.min(Math.max(currentPage + dir, 0), totalPages - 1));

  return (
    <section className="bg-yellow py-12 md:py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="text-center mb-8 md:mb-12">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            {bs.label}
          </span>
          <h2 className="font-heading text-[26px] md:text-[34px] font-bold text-brand-black mb-3 leading-tight">
            {bs.heading}
          </h2>
          <p className="text-[13px] md:text-[14px] text-gray max-w-[560px] mx-auto leading-relaxed">
            {bs.text}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentPage * 100}%)` }}
            >
              {products.map((product) => (
                <div
                  key={product.id}
                  className="w-1/2 lg:w-1/3 shrink-0 px-2 md:px-3"
                >
                  <ProductCard product={product} featured />
                </div>
              ))}
            </div>
          </div>

          {canPrev && (
            <button
              type="button"
              onClick={() => navigate(-1)}
              aria-label="Previous bestsellers"
              className="absolute top-1/2 -translate-y-1/2 left-[-10px] z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface border border-brand-black/10 shadow-md flex items-center justify-center text-brand-black hover:bg-red hover:text-white hover:border-red transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          )}
          {canNext && (
            <button
              type="button"
              onClick={() => navigate(1)}
              aria-label="Next bestsellers"
              className="absolute top-1/2 -translate-y-1/2 right-[-10px] z-20 w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface border border-brand-black/10 shadow-md flex items-center justify-center text-brand-black hover:bg-red hover:text-white hover:border-red transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="text-center mt-8 md:mt-12">
          <a
            href={bs.ctaLink}
            className="inline-block px-8 py-3 border-2 border-red text-red text-[12px] md:text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red hover:text-white transition-colors"
          >
            {bs.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
