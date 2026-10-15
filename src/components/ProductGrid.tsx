"use client";

import { type ShopifyProduct } from "@/lib/shopify";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  featured = false,
}: {
  products: ShopifyProduct[];
  featured?: boolean;
}) {
  return (
    <div
      className={
        featured
          ? "grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
      }
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          featured={featured}
        />
      ))}
    </div>
  );
}
