"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type ShopifyProduct, formatPrice, isProductSoldOut } from "@/lib/shopify";
import { useCart } from "./CartProvider";
import ProductTitle from "./ProductTitle";

export default function RelatedProductsRow({ products }: { products: ShopifyProduct[] }) {
  if (products.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <RelatedCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function RelatedCard({ product }: { product: ShopifyProduct }) {
  const { addItem, openCart } = useCart();
  const router = useRouter();
  const [isAdding, setIsAdding] = useState(false);

  const image = product.images.edges[0]?.node;
  const variant = product.variants.edges[0]?.node;
  const soldOut = isProductSoldOut(product);
  const price = formatPrice(
    product.priceRange.minVariantPrice.amount,
    product.priceRange.minVariantPrice.currencyCode
  );

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!variant || soldOut || isAdding) return;
    setIsAdding(true);
    try {
      await addItem(variant.id);
      openCart();
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div
      className="group bg-yellow rounded-xl overflow-hidden border border-brand-black/5 hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => router.push(`/products/${product.handle}`)}
    >
      <div className="relative aspect-square bg-brand-black/5 flex items-center justify-center overflow-hidden">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, 25vw"
          />
        ) : (
          <Image
            src="/logo.jpeg"
            alt={product.title}
            width={80}
            height={80}
            className="w-[80px] h-[80px] object-contain opacity-30"
          />
        )}
        {soldOut && (
          <div className="absolute top-3 left-3 z-20 bg-black/80 text-white text-[10px] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full">
            Sold Out
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading text-[15px] font-semibold text-brand-black mb-1 leading-snug line-clamp-2">
          <Link
            href={`/products/${product.handle}`}
            onClick={(e) => e.stopPropagation()}
            className="hover:text-red transition-colors"
          >
            <ProductTitle title={product.title} />
          </Link>
        </h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[16px] font-bold text-red">{price}</span>
          <button
            onClick={handleAddToCart}
            disabled={isAdding || soldOut}
            className={`px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider rounded-full transition-colors ${
              soldOut
                ? "bg-brand-black/10 text-gray cursor-not-allowed"
                : "bg-red text-white hover:bg-red-dark disabled:opacity-50"
            }`}
          >
            {soldOut ? "Sold Out" : isAdding ? (
              <span className="flex items-center gap-1.5">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
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
