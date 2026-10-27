import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us | Prince Achar",
  description:
    "Get in touch with Prince Achar for orders, distribution partnerships, or questions. Visit our store in Khari Baoli, Chandni Chowk, New Delhi.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
