"use client";

import { useState } from "react";
import Link from "next/link";
import { type ShopifyProduct, formatPrice, isProductSoldOut } from "@/lib/shopify";
import { useCart } from "./CartProvider";
import VariantSelector from "./VariantSelector";

const benefits = [
  "No artificial preservatives",
  "Traditional homemade preparation",
  "Premium quality ingredients",
];

interface ProductDetailsProps {
  product: ShopifyProduct;
  titleClassName?: string;
  showViewDetails?: boolean;
  onCloseDetails?: () => void;
}

export default function ProductDetails({
  product,
  titleClassName = "font-heading text-[24px] md:text-[26px] font-bold text-brand-black mb-3 leading-tight",
  showViewDetails = false,
  onCloseDetails,
}: ProductDetailsProps) {
  const { addItem, openCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const variants = product.variants.edges.map((e) => e.node);
  const soldOut = isProductSoldOut(product);

  // Build option groups from variants (e.g. Size: 250g / 500g / 1kg)
  const optionNames = Array.from(
    new Set(variants.flatMap((v) => v.selectedOptions.map((o) => o.name)))
  );
  const optionsByGroup = optionNames.map((name) => ({
    name,
    values: Array.from(
      new Set(variants.map((v) => v.selectedOptions.find((o) => o.name === name)?.value))
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

  const handleAddToCart = async () => {
    if (!selectedVariant || selectedVariantSoldOut || isAdding) return;
    setIsAdding(true);
    try {
      await addItem(selectedVariant.id);
      openCart();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className={titleClassName}>{product.title}</h2>

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
        <div
          className="rich-text text-[13px] text-gray leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      </div>

      <div className="mb-6 space-y-2">
        {benefits.map((benefit) => (
          <div key={benefit} className="flex items-center gap-2 text-[12px] text-gray">
            <svg className="w-3.5 h-3.5 text-green-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{benefit}</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isAdding || selectedVariantSoldOut || soldOut}
        className={`w-full py-3.5 text-white text-[12px] font-semibold uppercase tracking-wider rounded-full transition-colors disabled:opacity-50 ${
          selectedVariantSoldOut || soldOut ? "bg-brand-black/40 cursor-not-allowed" : "bg-red hover:bg-red-dark"
        }`}
      >
        {soldOut
          ? "Sold Out"
          : selectedVariantSoldOut
            ? "This Size Sold Out"
            : isAdding ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Adding
              </span>
            )
              : "Add to Cart"}
      </button>

      <p className="text-[10px] text-gray text-center mt-3">
        Shipping & taxes calculated at checkout
      </p>

      {showViewDetails && (
        <Link
          href={`/products/${product.handle}`}
          onClick={onCloseDetails}
          className="mt-4 inline-block text-center text-[11px] font-semibold uppercase tracking-wider text-red hover:opacity-70 transition-opacity"
        >
          View Full Details →
        </Link>
      )}
    </div>
  );
}
