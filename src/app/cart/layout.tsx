import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Cart | Prince Achar",
  description:
    "Review the items in your Prince Achar cart and continue to secure Shopify checkout.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
