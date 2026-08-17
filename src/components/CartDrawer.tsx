"use client";

import Image from "next/image";
import { useCart } from "./CartProvider";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalItems, totalPrice, checkoutUrl, isLoading, beginCheckout } = useCart();

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[2000] transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[2001] shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-light-gray">
          <h2 className="font-heading text-[20px] font-bold text-brand-black">
            Cart ({totalItems})
          </h2>
          <button
            onClick={closeCart}
            className="text-brand-black hover:text-red transition-colors"
            aria-label="Close cart"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 text-light-gray mb-4" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <p className="text-gray text-[14px]">Your cart is empty</p>
              <a
                href="/achar"
                onClick={closeCart}
                className="mt-4 px-6 py-2 bg-red text-white text-[12px] font-semibold uppercase tracking-wider rounded-full hover:bg-red-dark transition-colors"
              >
                Browse Products
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.lineId}
                  className="flex gap-4 p-3 bg-yellow/30 rounded-lg"
                >
                  <div className="relative w-[70px] h-[70px] rounded-lg overflow-hidden bg-brand-black/5 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.productTitle}
                      fill
                      className="object-cover"
                      sizes="70px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-semibold text-brand-black truncate">
                      {item.productTitle}
                    </h3>
                    <p className="text-[11px] text-gray">{item.variantTitle}</p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.lineId, item.quantity - 1)}
                          disabled={isLoading}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded-full bg-brand-black/10 text-brand-black text-[14px] flex items-center justify-center hover:bg-brand-black/20 transition-colors disabled:opacity-50"
                        >
                          -
                        </button>
                        <span className="text-[13px] font-medium w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.lineId, item.quantity + 1)}
                          disabled={isLoading}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded-full bg-brand-black/10 text-brand-black text-[14px] flex items-center justify-center hover:bg-brand-black/20 transition-colors disabled:opacity-50"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[14px] font-bold text-red">
                        ₹{(parseFloat(item.price) * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.lineId)}
                    disabled={isLoading}
                    className="text-gray hover:text-red transition-colors self-start disabled:opacity-50"
                    aria-label="Remove item"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-light-gray px-6 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-gray">Subtotal</span>
              <span className="text-[18px] font-bold text-brand-black">₹{totalPrice}</span>
            </div>
            <a
              href={checkoutUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              onClick={beginCheckout}
              className={`block w-full py-3 bg-red text-white text-[13px] font-semibold uppercase tracking-wider text-center rounded-full hover:bg-red-dark transition-colors ${!checkoutUrl ? "opacity-50 pointer-events-none" : ""}`}
            >
              Checkout
            </a>
            <p className="text-[11px] text-gray text-center">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
