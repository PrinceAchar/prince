"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/shopify";
import Image from "next/image";
import { navigateAfterTracking } from "@/lib/analytics";

interface CartContentProps {
  cart?: {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    lines: {
      edges: {
        node: {
          id: string;
          quantity: number;
          merchandise: {
            id: string;
            title: string;
            price: {
              amount: string;
              currencyCode: string;
            };
            product: {
              title: string;
              handle: string;
              images: {
                edges: {
                  node: {
                    url: string;
                    altText: string | null;
                  };
                }[];
              };
            };
          };
        };
      }[];
    };
    cost: {
      totalAmount: {
        amount: string;
        currencyCode: string;
      };
      subtotalAmount: {
        amount: string;
        currencyCode: string;
      };
    };
  };
}

export default function CartContent({ cart }: CartContentProps) {
  const { items, checkoutUrl, totalItems, totalPrice } = useCart();
  
  // If cart is provided (from cart/[cartId] page), use it
  // Otherwise, use the cart from CartProvider (for /cart page)
  const displayCart = cart || {
    id: "",
    checkoutUrl,
    totalQuantity: totalItems,
    lines: {
      edges: items.map((item, index) => ({
        node: {
          id: item.lineId,
          quantity: item.quantity,
          merchandise: {
            id: item.variantId,
            title: item.variantTitle,
            price: {
              amount: item.price,
              currencyCode: item.currencyCode,
            },
            product: {
              title: item.productTitle,
              handle: "", // We don't have the handle in the CartProvider items
              images: {
                edges: [
                  {
                    node: {
                      url: item.image,
                      altText: null,
                    },
                  },
                ],
              },
            },
          },
        },
      })),
    },
    cost: {
      totalAmount: {
        amount: totalPrice,
        currencyCode: "INR", // Default currency, should be stored in CartProvider
      },
      subtotalAmount: {
        amount: totalPrice,
        currencyCode: "INR", // Default currency, should be stored in CartProvider
      },
    },
  };
  const { removeItem, updateQuantity, beginCheckout } = useCart();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleRemoveItem = async (lineId: string) => {
    setIsRemoving(lineId);
    try {
      await removeItem(lineId);
    } finally {
      setIsRemoving(null);
    }
  };

  const handleUpdateQuantity = async (lineId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setIsUpdating(lineId);
    try {
      await updateQuantity(lineId, quantity);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleCheckout = () => {
    beginCheckout();
    // Let GTM fire begin_checkout before the full-page hand-off to Shopify.
    navigateAfterTracking(displayCart.checkoutUrl);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2">
        <div className="bg-white rounded-lg border border-brand-black/10 p-6">
          <h2 className="font-heading text-[20px] font-bold text-brand-black mb-6">
            Items ({displayCart.totalQuantity})
          </h2>
          
          {displayCart.lines.edges.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray mb-4">Your cart is empty</p>
              <Link 
                href="/" 
                className="inline-block text-red font-semibold hover:opacity-70 transition-opacity"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {displayCart.lines.edges.map((edge) => {
                const line = edge.node;
                const image = line.merchandise.product.images.edges[0]?.node;
                
                return (
                  <div key={line.id} className="flex gap-4 pb-4 border-b border-brand-black/10 last:border-0 last:pb-0">
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-gray-100">
                      {image ? (
                        <Image
                          src={image.url}
                          alt={image.altText || line.merchandise.product.title}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium text-brand-black mb-1">
                            <Link 
                              href={`/products/${line.merchandise.product.handle}`}
                              className="hover:text-red transition-colors"
                            >
                              {line.merchandise.product.title}
                            </Link>
                          </h3>
                          <p className="text-sm text-gray">
                            {line.merchandise.title}
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(line.id)}
                          disabled={isRemoving === line.id}
                          className="text-gray-400 hover:text-red transition-colors disabled:opacity-50"
                        >
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center border border-brand-black/15 rounded-full">
                            <button
                              onClick={() => handleUpdateQuantity(line.id, line.quantity - 1)}
                              disabled={isUpdating === line.id}
                              className="w-8 h-8 flex items-center justify-center text-brand-black hover:bg-brand-black/5 rounded-l-full transition-colors disabled:opacity-50"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                              </svg>
                            </button>
                            <span className="w-10 text-center text-sm font-medium text-brand-black">
                              {line.quantity}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(line.id, line.quantity + 1)}
                              disabled={isUpdating === line.id}
                              className="w-8 h-8 flex items-center justify-center text-brand-black hover:bg-brand-black/5 rounded-r-full transition-colors disabled:opacity-50"
                            >
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                              </svg>
                            </button>
                          </div>
                          <span className="text-sm text-gray">
                            {formatPrice(
                              (parseFloat(line.merchandise.price.amount) * line.quantity).toString(),
                              line.merchandise.price.currencyCode
                            )}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-brand-black">
                          {formatPrice(line.merchandise.price.amount, line.merchandise.price.currencyCode)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white rounded-lg border border-brand-black/10 p-6 sticky top-24">
          <h2 className="font-heading text-[20px] font-bold text-brand-black mb-6">
            Order Summary
          </h2>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-gray">Subtotal</span>
              <span className="font-medium text-brand-black">
                {formatPrice(displayCart.cost.subtotalAmount.amount, displayCart.cost.subtotalAmount.currencyCode)}
              </span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray">Shipping</span>
              <span className="font-medium text-brand-black">Calculated at checkout</span>
            </div>
            
            <div className="border-t border-brand-black/10 pt-4">
              <div className="flex justify-between">
                <span className="font-medium text-brand-black">Total</span>
                <span className="font-bold text-lg text-brand-black">
                  {formatPrice(displayCart.cost.totalAmount.amount, displayCart.cost.totalAmount.currencyCode)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleCheckout}
              className="w-full bg-red text-white py-3.5 rounded-full font-semibold hover:bg-red-dark transition-colors"
            >
              Proceed to Checkout
            </button>
            
            <Link
              href="/"
              className="block w-full text-center py-3.5 text-brand-black font-semibold border border-brand-black/20 rounded-full hover:bg-brand-black/5 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}