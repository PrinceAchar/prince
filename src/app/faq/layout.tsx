import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQs | Prince Achar",
  description:
    "Answers to common questions about Prince Achar pickles and murabbas — ingredients, shelf life, vegetarian status, shipping, and where to buy.",
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return children;
}
