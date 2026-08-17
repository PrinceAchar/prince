"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopifyProduct } from "@/lib/shopify";

export default function ProductGallery({ product }: { product: ShopifyProduct }) {
  const images = product.images.edges.map((e) => e.node);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const mainImage = images[selectedIndex] || images[0];

  return (
    <div>
      <div className="relative aspect-square bg-yellow/40 rounded-2xl overflow-hidden">
        {mainImage ? (
          <Image
            src={mainImage.url}
            alt={mainImage.altText || product.title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Image
              src="/logo.jpeg"
              alt={product.title}
              width={150}
              height={150}
              className="object-contain opacity-30"
            />
          </div>
        )}

        {images.length > 1 && (
          <>
            {selectedIndex > 0 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex - 1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
            )}
            {selectedIndex < images.length - 1 && (
              <button
                onClick={() => setSelectedIndex(selectedIndex + 1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center hover:bg-white transition-colors"
              >
                <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            )}
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex gap-2.5 mt-3 overflow-x-auto">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                selectedIndex === i
                  ? "shadow-[0_0_0_2px_red]"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img.url}
                alt={img.altText || `${product.title} ${i + 1}`}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
