"use client";

import { useState } from "react";
import Image from "next/image";
import type { ShopifyProduct } from "@/lib/shopify";

interface ProductReorderProps {
  products: ShopifyProduct[];
  order: string[];
  onChange: (order: string[]) => void;
}

export default function ProductReorder({ products, order, onChange }: ProductReorderProps) {
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const ordered = order.length > 0
    ? order
        .map((h) => products.find((p) => p.handle === h))
        .filter(Boolean)
        .map((p) => p!)
    : products;

  const remaining = order.length > 0
    ? products.filter((p) => !order.includes(p.handle))
    : [];

  const move = (from: number, to: number) => {
    const allHandles = [...ordered, ...remaining].map((p) => p.handle);
    const item = allHandles.splice(from, 1)[0];
    allHandles.splice(to, 0, item);
    onChange(allHandles);
  };

  const addToOrder = (handle: string) => {
    onChange([...ordered.map((p) => p.handle), handle]);
  };

  const removeFromOrder = (handle: string) => {
    onChange(ordered.map((p) => p.handle).filter((h) => h !== handle));
  };

  return (
    <div className="space-y-2">
      <p className="text-[11px] text-gray mb-2">Drag to reorder. Products not in the list appear at the end on the live site.</p>

      {ordered.map((product, i) => {
        const img = product.images.edges[0]?.node;
        return (
          <div
            key={product.handle}
            draggable
            onDragStart={() => setDragIdx(i)}
            onDragEnd={() => setDragIdx(null)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => { if (dragIdx !== null) move(dragIdx, i); }}
            className={`flex items-center gap-3 p-2 bg-white border border-brand-black/10 rounded-lg cursor-grab active:cursor-grabbing transition-colors ${dragIdx === i ? "opacity-50" : ""}`}
          >
            <span className="text-gray/40 text-[14px] cursor-grab">☰</span>
            <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-brand-black/5 flex-shrink-0">
              {img ? (
                <Image src={img.url} alt={product.title} fill className="object-cover" sizes="40px" />
              ) : (
                <Image src="/logo.jpeg" alt={product.title} width={40} height={40} className="w-full h-full object-contain opacity-30 p-1" />
              )}
            </div>
            <span className="flex-1 text-[13px] font-medium text-brand-black truncate">{product.title}</span>
            <span className="text-[10px] text-gray bg-brand-black/5 px-2 py-0.5 rounded-full">{i + 1}</span>
            <button
              type="button"
              onClick={() => removeFromOrder(product.handle)}
              className="text-gray/40 hover:text-red transition-colors"
              aria-label="Remove from order"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        );
      })}

      {remaining.length > 0 && (
        <div className="pt-2 border-t border-brand-black/10">
          <p className="text-[11px] text-gray mb-2">Unordered products (shown after ordered ones):</p>
          {remaining.map((product) => {
            const img = product.images.edges[0]?.node;
            return (
              <div key={product.handle} className="flex items-center gap-3 p-2 bg-white/50 border border-brand-black/5 rounded-lg mb-1.5">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-brand-black/5 flex-shrink-0">
                  {img ? (
                    <Image src={img.url} alt={product.title} fill className="object-cover" sizes="32px" />
                  ) : (
                    <Image src="/logo.jpeg" alt={product.title} width={32} height={32} className="w-full h-full object-contain opacity-30 p-1" />
                  )}
                </div>
                <span className="flex-1 text-[12px] text-gray truncate">{product.title}</span>
                <button
                  type="button"
                  onClick={() => addToOrder(product.handle)}
                  className="text-[11px] font-medium text-red hover:text-red-dark transition-colors"
                >
                  + Add
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
