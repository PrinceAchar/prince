import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Prince Achar",
  description:
    "Get in touch with Prince Achar for orders, distribution partnerships, or questions. Visit our store in Khari Baoli, Chandni Chowk, New Delhi.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
