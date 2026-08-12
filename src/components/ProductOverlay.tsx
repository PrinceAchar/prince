"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { type ShopifyProduct, formatPrice, getProductSize, isProductSoldOut } from "@/lib/shopify";
import { useCart } from "./CartProvider";

function getCosmeticRating(handle: string) {
  const seed = handle.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const rating = 4.3 + (seed % 7) / 10;
  const reviews = 50 + (seed % 200);
  return { rating: Math.min(rating, 4.9), reviews };
}

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const full = Math.floor(rating);
  const partial = rating - full;
  const empty = 5 - full - (partial > 0 ? 1 : 0);

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: full }).map((_, i) => (
          <svg key={`full-${i}`} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        {partial > 0 && (
          <div className="relative w-4 h-4">
            <svg className="absolute w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute overflow-hidden" style={{ width: `${partial * 100}%` }}>
              <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        )}
        {Array.from({ length: empty }).map((_, i) => (
          <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="text-[13px] text-gray">
        {rating.toFixed(1)} ({reviews} reviews)
      </span>
    </div>
  );
}

interface VariantSelectorProps {
  groups: { name: string; values: string[] }[];
  selected: Record<string, string>;
  onSelect: (name: string, value: string) => void;
}

function VariantSelector({ groups, selected, onSelect }: VariantSelectorProps) {
  return (
    <div className="space-y-4 mb-5">
      {groups.map((group) => (
        <div key={group.name}>
          <h3 className="text-[11px] font-semibold uppercase tracking-wider text-brand-black/40 mb-2">
            {group.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {group.values.map((value) => {
              const active = selected[group.name] === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => onSelect(group.name, value)}
                  className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-wider rounded-full border transition-colors ${
                    active
                      ? "bg-red border-red text-white"
                      : "border-brand-black/15 text-brand-black hover:border-red hover:text-red"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

interface ProductOverlayProps {
  product: ShopifyProduct;
  onClose: () => void;
}

export default function ProductOverlay({ product, onClose }: ProductOverlayProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { addItem, openCart, isLoading } = useCart();

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: product.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const images = product.images.edges.map((e) => e.node);
  const mainImage = images[selectedIndex] || images[0];
  const variants = product.variants.edges.map((e) => e.node);
  const soldOut = isProductSoldOut(product);

  // Build option groups from variants (e.g. Size: 250g / 500g / 1kg)
  const optionNames = Array.from(
    new Set(variants.flatMap((v) => v.selectedOptions.map((o) => o.name)))
  );
  const optionsByGroup = optionNames.map((name) => ({
    name,
    values: Array.from(
      new Set(
        variants.map((v) => v.selectedOptions.find((o) => o.name === name)?.value)
      )
    ).filter((v): v is string => Boolean(v)),
  }));

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const preferred = variants.find((v) => v.availableForSale) || variants[0];
    if (preferred) {
      return Object.fromEntries(preferred.selectedOptions.map((o) => [o.name, o.value]));
    }
    return {};
  });

  const selectedVariant =
    variants.find((v) =>
      v.selectedOptions.every((o) => selectedOptions[o.name] === o.value)
    ) || null;

  const selectedVariantSoldOut = selectedVariant ? !selectedVariant.availableForSale : false;
  const price = formatPrice(
    selectedVariant?.price.amount ?? product.priceRange.minVariantPrice.amount,
    selectedVariant?.price.currencyCode ?? product.priceRange.minVariantPrice.currencyCode
  );
  const size = getProductSize(product);
  const tag = product.tags[0] || product.productType;
  const { rating, reviews } = getCosmeticRating(product.handle);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && selectedIndex > 0) setSelectedIndex(selectedIndex - 1);
      if (e.key === "ArrowRight" && selectedIndex < images.length - 1) setSelectedIndex(selectedIndex + 1);
    },
    [onClose, selectedIndex, images.length]
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const handleAddToCart = async () => {
    if (!selectedVariant || selectedVariantSoldOut) return;
    await addItem(
      selectedVariant.id,
      product.title,
      selectedVariant.title,
      selectedVariant.price.amount,
      selectedVariant.price.currencyCode,
      mainImage?.url || "/logo.jpeg"
    );
    openCart();
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-0 md:p-6 lg:p-12">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 animate-overlay-backdrop"
        onClick={onClose}
      />

      {/* Mobile: scrollable full-screen layout */}
      <div className="relative z-10 w-full h-full md:hidden overflow-y-auto animate-overlay-panel">
        {/* Mobile back button - fixed top-left */}
        <button
          onClick={onClose}
          className="fixed top-4 left-4 z-30 w-10 h-10 rounded-full bg-yellow flex items-center justify-center shadow-lg"
        >
          <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Mobile share button - fixed top-right */}
        <button
          onClick={handleShare}
          className="fixed top-4 right-4 z-30 w-10 h-10 rounded-full bg-yellow flex items-center justify-center shadow-lg"
        >
          {copied ? (
            <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
            </svg>
          )}
        </button>

        {/* Mobile image section */}
        <div className="relative w-full bg-black">
          {/* Main image */}
          <div className="relative w-full aspect-square">
            {mainImage ? (
              <Image
                src={mainImage.url}
                alt={mainImage.altText || product.title}
                fill
                className="object-contain"
                priority
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

            {/* Navigation arrows on mobile */}
            {images.length > 1 && (
              <>
                {selectedIndex > 0 && (
                  <button
                    onClick={() => setSelectedIndex(selectedIndex - 1)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>
                )}
                {selectedIndex < images.length - 1 && (
                  <button
                    onClick={() => setSelectedIndex(selectedIndex + 1)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center"
                  >
                    <svg className="w-5 h-5 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </button>
                )}
              </>
            )}
          </div>

          {/* Mobile thumbnails strip */}
          {images.length > 1 && (
            <div className="flex gap-2 p-3 overflow-x-auto bg-black">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIndex(i)}
                  className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden transition-all ${
                    selectedIndex === i
                      ? "shadow-[0_0_0_2px_white]"
                      : "opacity-50"
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

        {/* Mobile description */}
        <div className="bg-[#FAF5E4] rounded-t-2xl -mt-2 relative z-10 p-6">
          {/* Tag + Size */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red/10 text-red">
              {tag}
            </span>
            {size && (
              <span className="text-[11px] text-gray bg-brand-black/5 px-2 py-0.5 rounded-full">
                {size}
              </span>
            )}
          </div>

          <h2 className="font-heading text-[22px] font-bold text-brand-black mb-3 leading-tight">
            {product.title}
          </h2>

          <div className="mb-4">
            <StarRating rating={rating} reviews={reviews} />
          </div>

          <div className="mb-5">
            <span className="text-[26px] font-bold text-red">{price}</span>
          </div>

          {optionsByGroup.length > 0 && (
            <VariantSelector
              groups={optionsByGroup}
              selected={selectedOptions}
              onSelect={(name, value) =>
                setSelectedOptions((prev) => ({ ...prev, [name]: value }))
              }
            />
          )}

          <div className="mb-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-brand-black/40 mb-2">
              Description
            </h3>
            <p className="text-[13px] text-gray leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-[12px] text-gray">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No artificial preservatives</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Traditional homemade preparation</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Premium quality ingredients</span>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isLoading || selectedVariantSoldOut || soldOut}
            className={`w-full py-3.5 text-white text-[12px] font-semibold uppercase tracking-wider rounded-full transition-colors disabled:opacity-50 ${
              selectedVariantSoldOut || soldOut ? "bg-brand-black/40 cursor-not-allowed" : "bg-red hover:bg-red-dark"
            }`}
          >
            {soldOut
              ? "Sold Out"
              : selectedVariantSoldOut
                ? "This Size Sold Out"
                : isLoading
                  ? "Adding..."
                  : "Add to Cart"}
          </button>

          <p className="text-[10px] text-gray text-center mt-3">
            Shipping & taxes calculated at checkout
          </p>
        </div>

      </div>

      {/* Desktop: 3 columns layout (unchanged) */}
      <div className="relative z-10 hidden md:flex gap-3 w-fit max-w-[1200px] h-[80vh] items-stretch animate-overlay-panel">
        {/* Column 1: Thumbnails */}
        <div className="flex flex-col gap-2.5 w-[64px] flex-shrink-0 justify-center">
          {images.length === 0 && (
            <div className="w-[60px] h-[60px] rounded-lg overflow-hidden flex-shrink-0 opacity-60">
              <Image
                src="/logo.jpeg"
                alt={product.title}
                fill
                className="object-cover"
                sizes="60px"
              />
            </div>
          )}
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative w-[60px] h-[60px] rounded-lg flex-shrink-0 transition-all ${
                selectedIndex === i
                  ? "shadow-[0_0_0_2px_white] scale-105"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <div className="relative w-full h-full rounded-lg overflow-hidden">
                <Image
                  src={img.url}
                  alt={img.altText || `${product.title} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="60px"
                />
              </div>
            </button>
          ))}
        </div>

        {/* Column 2: Main image */}
        <div
          className="relative h-full rounded-2xl overflow-hidden w-auto"
          style={mainImage ? { aspectRatio: `${mainImage.width} / ${mainImage.height}` } : undefined}
        >
          {mainImage ? (
            <Image
              src={mainImage.url}
              alt={mainImage.altText || product.title}
              fill
              className="object-contain"
              priority
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

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              {selectedIndex > 0 && (
                <button
                  onClick={() => setSelectedIndex(selectedIndex - 1)}
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

        {/* Column 3: Product info */}
        <div className="relative w-[420px] flex-shrink-0 p-8 overflow-y-auto bg-[#FAF5E4] rounded-2xl">
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="w-9 h-9 rounded-full bg-brand-black/5 flex items-center justify-center hover:bg-brand-black/10 transition-colors"
              aria-label="Share"
            >
              {copied ? (
                <svg className="w-4 h-4 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              ) : (
                <svg className="w-4 h-4 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                </svg>
              )}
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-brand-black/5 flex items-center justify-center hover:bg-brand-black/10 transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4 text-brand-black" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-red/10 text-red">
              {tag}
            </span>
            {size && (
              <span className="text-[11px] text-gray bg-brand-black/5 px-2 py-0.5 rounded-full">
                {size}
              </span>
            )}
          </div>

          <h2 className="font-heading text-[26px] font-bold text-brand-black mb-3 leading-tight">
            {product.title}
          </h2>

          <div className="mb-4">
            <StarRating rating={rating} reviews={reviews} />
          </div>

          <div className="mb-5">
            <span className="text-[26px] font-bold text-red">{price}</span>
          </div>

          {optionsByGroup.length > 0 && (
            <VariantSelector
              groups={optionsByGroup}
              selected={selectedOptions}
              onSelect={(name, value) =>
                setSelectedOptions((prev) => ({ ...prev, [name]: value }))
              }
            />
          )}

          <div className="mb-5">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-brand-black/40 mb-2">
              Description
            </h3>
            <p className="text-[13px] text-gray leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-2 text-[12px] text-gray">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>No artificial preservatives</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Traditional homemade preparation</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-gray">
              <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Premium quality ingredients</span>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isLoading || selectedVariantSoldOut || soldOut}
            className={`w-full py-3.5 text-white text-[12px] font-semibold uppercase tracking-wider rounded-full transition-colors disabled:opacity-50 ${
              selectedVariantSoldOut || soldOut ? "bg-brand-black/40 cursor-not-allowed" : "bg-red hover:bg-red-dark"
            }`}
          >
            {soldOut
              ? "Sold Out"
              : selectedVariantSoldOut
                ? "This Size Sold Out"
                : isLoading
                  ? "Adding..."
                  : "Add to Cart"}
          </button>

          <p className="text-[10px] text-gray text-center mt-3">
            Shipping & taxes calculated at checkout
          </p>
        </div>
      </div>
    </div>
  );
}
