"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { type ShopifyProduct, formatPrice, getProductSize, isProductSoldOut } from "@/lib/shopify";
import { useCart } from "./CartProvider";

const tagColors: Record<string, string> = {
  Pickle: "bg-red/10 text-red",
  Pickles: "bg-red/10 text-red",
  Murabba: "bg-yellow text-red",
  Special: "bg-brand-black/10 text-brand-black",
  "Special Products": "bg-brand-black/10 text-brand-black",
  Chutney: "bg-brand-black/10 text-brand-black",
};

interface ProductCardProps {
  product: ShopifyProduct;
  onImageClick: (product: ShopifyProduct) => void;
  featured?: boolean;
}

export default function ProductCard({ product, onImageClick, featured = false }: ProductCardProps) {
  const { addItem, openCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [mobileImageIndex, setMobileImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const images = product.images.edges.map((e) => e.node);
  const hasMultipleImages = images.length > 1;

  // Mobile: tap to cycle
  const mobileImage = images[mobileImageIndex] || images[0];

  const variant = product.variants.edges[0]?.node;
  const soldOut = isProductSoldOut(product);
  const hasMultipleVariants = product.variants.edges.length > 1;
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );
  const size = getProductSize(product);
  const tag = product.productType || product.tags[0];
  const tagClass = tagColors[tag] || "bg-brand-black/10 text-brand-black";

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!variant || soldOut || isAdding) return;
    if (hasMultipleVariants) {
      onImageClick(product);
      return;
    }
    setIsAdding(true);
    try {
      await addItem(variant.id);
      openCart();
    } finally {
      setIsAdding(false);
    }
  };

  const handleMobileImageTap = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!hasMultipleImages) {
      onImageClick(product);
      return;
    }
    setMobileImageIndex((prev) => {
      const next = prev + 1;
      if (next >= images.length) {
        // Last image tapped — open overlay
        onImageClick(product);
        return 0;
      }
      return next;
    });
  };

  return (
    <div
      className={`group rounded-xl overflow-hidden border border-brand-black/5 hover:shadow-lg transition-shadow cursor-pointer ${
        featured ? "bg-white" : "bg-yellow/50"
      }`}
      onClick={() => onImageClick(product)}
    >
      <div
        className="relative aspect-square bg-brand-black/5 flex items-center justify-center overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleMobileImageTap}
      >
        {/* Desktop images (crossfade on hover) */}
        {images[0] ? (
          <>
            <Image
              src={images[0].url}
              alt={images[0].altText || product.title}
              fill
              className={`object-cover transition-all duration-500 md:block hidden ${
                isHovered && hasMultipleImages ? "opacity-0 scale-105" : "opacity-100 scale-100"
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {hasMultipleImages && (
              <Image
                src={images[1].url}
                alt={images[1].altText || product.title}
                fill
                className={`object-cover transition-all duration-500 md:block hidden ${
                  isHovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            )}
          </>
        ) : (
          <Image
            src="/logo.jpeg"
            alt={product.title}
            width={120}
            height={120}
            className="w-[100px] h-[100px] object-contain opacity-30"
          />
        )}

        {/* Mobile: show current tapped image */}
        {images[0] && (
          <div className="md:hidden absolute inset-0">
            <Image
              src={mobileImage.url}
              alt={mobileImage.altText || product.title}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        )}

        {/* Dot indicators */}
        {hasMultipleImages && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  (typeof window !== "undefined" && window.innerWidth < 768
                    ? mobileImageIndex === i
                    : isHovered
                      ? i === 1
                      : i === 0)
                    ? "bg-red w-3"
                    : "bg-white/70"
                }`}
              />
            ))}
          </div>
        )}

        {/* Hover overlay hint */}
        {hasMultipleImages && (
          <div className={`absolute inset-0 bg-black/10 flex items-center justify-center transition-opacity duration-300 z-10 pointer-events-none ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}>
            <span className="hidden md:block text-white text-[11px] font-medium bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-sm">
              Click to view details
            </span>
          </div>
        )}

        {/* Sold out badge */}
        {soldOut && (
          <div className="absolute top-3 left-3 z-20 bg-brand-black/80 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            Sold Out
          </div>
        )}
      </div>

      <div className="p-5 md:p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${tagClass}`}>
            {tag}
          </span>
          {size && <span className="text-[11px] text-gray">{size}</span>}
        </div>
        <h3 className="font-heading text-[17px] md:text-[18px] font-semibold text-brand-black mb-2 leading-snug">
          <Link
            href={`/products/${product.handle}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-red transition-colors"
          >
            {product.title}
          </Link>
        </h3>
        <div className="rich-text text-[13px] md:text-[14px] text-gray leading-relaxed mb-2 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
        <Link
          href={`/products/${product.handle}`}
          onClick={(e) => e.stopPropagation()}
          className="inline-block text-[11px] font-semibold uppercase tracking-wider text-red hover:opacity-70 transition-opacity mb-4"
        >
          View Details →
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-[18px] font-bold text-red">{price}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || soldOut}
            className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-wider rounded-full transition-colors z-20 relative ${
              soldOut
                ? "bg-brand-black/10 text-gray cursor-not-allowed"
                : "bg-red text-white hover:bg-red-dark disabled:opacity-50"
            }`}
          >
            {soldOut ? "Sold Out" : hasMultipleVariants ? "Choose Size" : isAdding ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Adding
              </span>
            ) : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
