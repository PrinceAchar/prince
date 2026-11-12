"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartContent from "@/components/CartContent";
import { getCart } from "@/lib/shopify";

export default function CartPage({
  params,
}: {
  params: Promise<{ cartId: string }>;
}) {
  const router = useRouter();
  const [cart, setCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { cartId } = params;

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await getCart(cartId as string);
        if (cartData) {
          setCart(cartData);
          // Save the cart ID to localStorage for future reference
          localStorage.setItem("shopify_cart_id", cartId as string);
        } else {
          // Cart not found, redirect to home
          router.push("/");
        }
      } catch (error) {
        console.error("Failed to load cart:", error);
        // Error loading cart, redirect to home
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCart();
  }, [cartId, router]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="pt-[60px] md:pt-[70px] min-h-screen bg-surface">
          <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
            <div className="mb-8">
              <h1 className="font-heading text-[28px] md:text-[34px] font-bold text-brand-black mb-2">
                Your Cart
              </h1>
              <p className="text-gray">Loading your cart...</p>
            </div>
            <div className="bg-white rounded-lg border border-brand-black/10 p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="space-y-4">
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
        </main>
        <Footer />
      </>
    );
  }

  if (!cart) {
    return null; // Will redirect to home in useEffect
  }

  return (
    <>
      <Navbar />
      <main className="pt-[60px] md:pt-[70px] min-h-screen bg-surface">
        <div className="max-w-[1200px] mx-auto px-6 py-12 md:py-16">
          <div className="mb-8">
            <h1 className="font-heading text-[28px] md:text-[34px] font-bold text-brand-black mb-2">
              Your Cart
            </h1>
            <p className="text-gray">
              {cart.totalQuantity} {cart.totalQuantity === 1 ? "item" : "items"} in your cart
            </p>
          </div>
          
          <CartContent cart={cart} />
        </div>
      </main>
      <Footer />
    </>
  );
}