"use client";

import { useCart } from "./CartProvider";
import CartContent from "./CartContent";

export default function CartContentWrapper() {
  const { items, checkoutUrl, totalItems, totalPrice } = useCart();
  
  // If there are no items, show empty cart state
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-brand-black/10 p-6">
        <div className="text-center py-12">
          <p className="text-gray mb-4">Your cart is empty</p>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
            <div className="space-y-4 max-w-md mx-auto">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Create a cart-like structure from CartProvider items
  const cartFromProvider = {
    id: "",
    checkoutUrl,
    totalQuantity: totalItems,
    lines: {
      edges: items.map((item) => ({
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
  
  return <CartContent cart={cartFromProvider} />;
}