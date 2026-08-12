"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { type ShopifyProduct } from "@/lib/shopify";
import ProductCard from "./ProductCard";
import ProductOverlay from "./ProductOverlay";

export default function ProductGrid({ products }: { products: ShopifyProduct[] }) {
  const [selectedProduct, setSelectedProduct] = useState<ShopifyProduct | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  // Deep link: open overlay from ?product=handle
  // Track last seen URL handle so the overlay only reacts to URL changes,
  // never to its own selectedProduct state (prevents it re-opening on close).
  const lastHandleRef = useRef<string | null>(null);
  useEffect(() => {
    const handle = searchParams.get("product");
    if (!handle) return;
    if (handle === lastHandleRef.current) return;
    const match = products.find((p) => p.handle === handle);
    if (match) {
      lastHandleRef.current = handle;
      Promise.resolve().then(() => setSelectedProduct(match));
    }
  }, [searchParams, products]);

  const handleClose = () => {
    lastHandleRef.current = null;
    setSelectedProduct(null);
    // Remove ?product= from URL without reload
    const url = new URL(window.location.href);
    url.searchParams.delete("product");
    router.replace(url.pathname + url.search, { scroll: false });
  };

  const handleSelect = (product: ShopifyProduct) => {
    setSelectedProduct(product);
    // Update URL with ?product=handle for shareable link
    const url = new URL(window.location.href);
    url.searchParams.set("product", product.handle);
    router.replace(url.pathname + url.search, { scroll: false });
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onImageClick={handleSelect}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductOverlay
          key={selectedProduct.id}
          product={selectedProduct}
          onClose={handleClose}
        />
      )}
    </>
  );
}
