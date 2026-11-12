import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartContentWrapper from "@/components/CartContentWrapper";

export default function CartPage() {
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
              View and manage your items
            </p>
          </div>
          
          <Suspense fallback={<div>Loading cart...</div>}>
            <CartContentWrapper />
          </Suspense>
        </div>
      </main>
      
      <Footer />
    </>
  );
}