"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const faqs = [
  {
    q: "What are the ingredients used in Prince Achar pickles?",
    a: "We use 100% natural ingredients — fresh fruits, mustard oil, red chili, turmeric, fenugreek, and other traditional spices. No preservatives, no artificial colors.",
  },
  {
    q: "How long do your pickles and murabbas last?",
    a: "Unopened, our pickles and murabbas have a shelf life of 12 months from the date of manufacturing. Once opened, store in a cool, dry place and use within 3 months.",
  },
  {
    q: "Are your products vegetarian?",
    a: "Yes, all Prince Achar products are 100% vegetarian.",
  },
  {
    q: "Do you offer bulk or wholesale orders?",
    a: "Yes. We work with distributors, retailers, and food businesses across India. Contact us at info@princeachar.com or call +91 98100 00000 for bulk pricing.",
  },
  {
    q: "Where can I buy Prince Achar products?",
    a: "Our products are available at leading grocery stores and supermarkets across Delhi NCR and select cities. You can also order directly by contacting us.",
  },
  {
    q: "Are your pickles made in traditional style?",
    a: "Absolutely. Every batch is handcrafted using recipes passed down since 1980. We blend traditional methods with modern hygiene standards to deliver authentic taste.",
  },
  {
    q: "Do you ship across India?",
    a: "Yes, we ship to most locations across India. Delivery times may vary based on your pin code. Contact us for specific shipping inquiries.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <Navbar />

      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[800px] mx-auto px-6 py-10 md:py-14 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Help Center
          </span>
          <h1 className="font-heading text-[32px] md:text-[42px] font-bold text-brand-black mb-3 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[13px] md:text-[14px] text-gray">
            Everything you need to know about our products and services.
          </p>
        </div>
      </section>

      <section className="bg-white py-10 md:py-14">
        <div className="max-w-[800px] mx-auto px-6 space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-brand-black/10 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-[14px] md:text-[15px] font-medium text-brand-black pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-red flex-shrink-0 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                  fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {open === i && (
                <div className="px-5 pb-4">
                  <p className="text-[13px] md:text-[14px] text-gray leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}
