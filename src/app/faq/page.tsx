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

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-red/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-red/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="max-w-[800px] mx-auto px-6 py-14 md:py-20 text-center relative">
          <div className="w-12 h-[2px] bg-red mx-auto mb-5" />
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
            Help Center
          </span>
          <h1 className="font-heading text-[34px] md:text-[44px] font-bold text-brand-black mb-4 leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-[14px] md:text-[15px] text-gray max-w-[500px] mx-auto leading-relaxed">
            Everything you need to know about our products, orders, and services.
          </p>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="bg-gradient-to-b from-white to-yellow/30 py-12 md:py-16">
        <div className="max-w-[750px] mx-auto px-6">
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                  open === i ? "border-red/20 shadow-md bg-white" : "border-brand-black/10 bg-white"
                }`}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                >
                  <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold ${
                    open === i ? "bg-red text-white" : "bg-red/10 text-red"
                  }`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`text-[14px] md:text-[15px] font-medium flex-1 ${
                    open === i ? "text-red" : "text-brand-black"
                  }`}>
                    {faq.q}
                  </span>
                  <svg
                    className={`w-5 h-5 flex-shrink-0 transition-transform duration-200 ${
                      open === i ? "rotate-180 text-red" : "text-gray"
                    }`}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div className={`overflow-hidden transition-all duration-200 ${open === i ? "max-h-[300px]" : "max-h-0"}`}>
                  <div className="px-6 pb-5 pl-[76px]">
                    <div className="w-8 h-[1px] bg-red/30 mb-3" />
                    <p className="text-[13px] md:text-[14px] text-gray leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <p className="text-[13px] text-gray mb-3">Still have questions?</p>
            <a href="/contact" className="inline-block px-6 py-2.5 border-2 border-red text-red text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red hover:text-white transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
