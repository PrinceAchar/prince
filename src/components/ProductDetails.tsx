"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { type ShopifyProduct, formatPrice, isProductSoldOut } from "@/lib/shopify";
import { useCart } from "./CartProvider";
import VariantSelector from "./VariantSelector";
import { useContent } from "@/lib/content";
import PincodeChecker from "./PincodeChecker";
import ProductTitle from "./ProductTitle";

const trustBadges = [
  {
    label: "Secure Packaging",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m17.25 4.5V6.75a3 3 0 00-3-3H6.375a3 3 0 00-3 3v8.25m16.5 0h1.5" />
      </svg>
    ),
  },
  {
    label: "Quality Assured",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    label: "Traditional Recipes",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
];

const featureIcons = [
  {
    label: "Traditional homemade preparation",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    label: "Loved for generations",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    label: "Premium quality ingredients",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    label: "Store in a cool dry place",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
  },
];

function generateRandomReview() {
  const rating = (4 + Math.random()).toFixed(1);
  const reviews = Math.floor(50 + Math.random() * 250);
  const bought = Math.floor(100 + Math.random() * 1900);
  return { rating, reviews, bought };
}

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
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<string | null>(null);

  const content = useContent();
  const showSocialProof = content.products.showSocialProof !== false;
  const review = useMemo(() => generateRandomReview(), []);

  const ingredients =
    product.ingredients?.value ||
    content.products.ingredients.byType[
      (product.productType ?? "").toLowerCase() as keyof typeof content.products.ingredients.byType
    ] ||
    content.products.ingredients.default;

  const collapsibleSections = [
    {
      title: "Ingredients",
      content: ingredients,
    },
    {
      title: "Storage Instructions",
      content: product.storageInstructions?.value || "Store in a cool, dry place. Use a clean, dry spoon. Refrigerate after opening for extended freshness.",
    },
  ];

  const variants = product.variants.edges.map((e) => e.node);
  const soldOut = isProductSoldOut(product);
  const tag = product.productType || product.tags[0] || "Product";

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
      for (let i = 0; i < quantity; i++) {
        await addItem(selectedVariant.id);
      }
      openCart();
    } finally {
      setIsAdding(false);
    }
  };

  const toggleSection = (title: string) => {
    setOpenSection((prev) => (prev === title ? null : title));
  };

  const fullStars = Math.floor(Number(review.rating));
  const hasHalf = Number(review.rating) - fullStars >= 0.3;

  return (
    <div className="flex flex-col">
      {/* Type badge */}
      <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-red/10 text-red mb-4 w-fit">
        {tag}
      </span>

      {/* Title */}
      <h2 className={titleClassName}><ProductTitle title={product.title} /></h2>

      {/* Reviews & social proof (toggleable in admin) */}
      {showSocialProof && (
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${i < fullStars ? "text-yellow-500" : i === fullStars && hasHalf ? "text-yellow-500" : "text-gray/30"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[13px] font-semibold text-brand-black">{review.rating}</span>
          <span className="text-[13px] text-gray">({review.reviews} reviews)</span>
          <span className="text-[13px] text-gray">|</span>
          <span className="text-[13px] text-gray">1K+ bought in last month</span>
        </div>
      )}

      {/* Price */}
      <div className="mb-5">
        <span className="text-[28px] font-bold text-red">{price}</span>
      </div>

      {/* Size selector */}
      {optionsByGroup.length > 0 && (
        <VariantSelector
          groups={optionsByGroup}
          selected={selectedOptions}
          onSelect={(name, value) =>
            setSelectedOptions((prev) => ({ ...prev, [name]: value }))
          }
        />
      )}

      {/* Quantity + Add to Cart */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex items-center border border-brand-black/15 rounded-full">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-brand-black hover:bg-brand-black/5 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
            </svg>
          </button>
          <span className="w-10 text-center text-[14px] font-medium text-brand-black">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            className="w-10 h-10 flex items-center justify-center text-brand-black hover:bg-brand-black/5 rounded-full transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={isAdding || selectedVariantSoldOut || soldOut}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-white text-[12px] font-semibold uppercase tracking-wider rounded-full transition-colors disabled:opacity-50 ${
            selectedVariantSoldOut || soldOut ? "bg-brand-black/40 cursor-not-allowed" : "bg-red hover:bg-red-dark"
          }`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
          </svg>
          {soldOut
            ? "Sold Out"
            : selectedVariantSoldOut
              ? "This Size Sold Out"
              : isAdding ? "Adding..." : "Add to Cart"}
        </button>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-between py-4 border-t border-b border-brand-black/10 mb-6">
        {trustBadges.map((badge) => (
          <div key={badge.label} className="flex flex-col items-center gap-1.5 text-center">
            <span className="text-green">{badge.icon}</span>
            <span className="text-[10px] text-gray leading-tight">{badge.label}</span>
          </div>
        ))}
      </div>

      {/* Pincode delivery checker */}
      <PincodeChecker />

      {/* Product Details description */}
      <div className="mb-6">
        <h3 className="font-heading text-[18px] font-bold text-brand-black mb-3">Product Details</h3>
        <div
          className="rich-text text-[13px] text-gray leading-relaxed"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
      </div>

      {/* Taste line */}
      {product.tastes?.value && (
        <div className="mb-6">
          <span className="text-[13px] text-brand-black">
            <span className="font-semibold">Tastes:</span> {product.tastes.value}
          </span>
        </div>
      )}

      {/* Feature icons */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {featureIcons.map((feat) => (
          <div key={feat.label} className="flex flex-col items-center gap-2 text-center">
            <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center text-green">
              {feat.icon}
            </div>
            <span className="text-[10px] text-gray leading-tight">{feat.label}</span>
          </div>
        ))}
      </div>

      {/* Collapsible sections */}
      <div className="border-t border-brand-black/10">
        {collapsibleSections.map((section) => (
          <div key={section.title} className="border-b border-brand-black/10">
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full flex items-center justify-between py-4 text-left"
            >
              <span className="text-[14px] font-medium text-brand-black">{section.title}</span>
              <svg
                className={`w-4 h-4 text-gray transition-transform duration-200 ${
                  openSection === section.title ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {openSection === section.title && (
              <div className="pb-4 text-[13px] text-gray leading-relaxed">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>

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
