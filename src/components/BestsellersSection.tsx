"use client";

import { Suspense } from "react";
import { type ShopifyProduct } from "@/lib/shopify";
import ProductGrid from "./ProductGrid";
import { useContent } from "@/lib/content";

export default function BestsellersSection({ products }: { products: ShopifyProduct[] }) {
  const content = useContent();
  const bs = content.homepage.bestsellers;

  if (products.length === 0) return null;

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

        <Suspense fallback={<GridSkeleton />}>
          <ProductGrid products={products} featured />
        </Suspense>

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

function GridSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl overflow-hidden border border-brand-black/5 bg-white"
        >
          <div className="aspect-square bg-brand-black/5" />
          <div className="p-5 space-y-2">
            <div className="h-3 w-16 rounded bg-brand-black/10" />
            <div className="h-4 w-3/4 rounded bg-brand-black/10" />
            <div className="h-3 w-full rounded bg-brand-black/5" />
          </div>
        </div>
      ))}
    </div>
  );
}
