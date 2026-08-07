"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
            Reach Out
          </span>
          <h1 className="font-heading text-[36px] md:text-[48px] lg:text-[56px] font-bold text-brand-black mb-5 leading-tight">
            Contact Us
          </h1>
          <p className="text-[14px] md:text-[16px] text-gray leading-[1.8] max-w-[600px] mx-auto">
            Whether you&apos;re a distributor, retailer, or simply a lover of authentic flavors —
            we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            {/* Contact Info */}
            <div className="md:w-[40%]">
              <h2 className="font-heading text-[24px] md:text-[28px] font-bold text-brand-black mb-6">
                Get in Touch
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[2px] text-red mb-2">
                    Address
                  </h3>
                  <p className="text-[14px] text-gray leading-relaxed">
                    Prince Achar<br />
                    Old Delhi, Delhi<br />
                    India
                  </p>
                </div>

                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[2px] text-red mb-2">
                    Phone
                  </h3>
                  <a href="tel:+919810000000" className="text-[14px] text-gray hover:text-red transition-colors">
                    +91 98100 00000
                  </a>
                </div>

                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[2px] text-red mb-2">
                    Email
                  </h3>
                  <a href="mailto:info@princeachar.com" className="text-[14px] text-gray hover:text-red transition-colors">
                    info@princeachar.com
                  </a>
                </div>

                <div>
                  <h3 className="text-[12px] font-semibold uppercase tracking-[2px] text-red mb-2">
                    Hours
                  </h3>
                  <p className="text-[14px] text-gray leading-relaxed">
                    Monday – Saturday: 9:00 AM – 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:flex-1">
              {submitted ? (
                <div className="bg-yellow/50 rounded-xl p-8 md:p-12 text-center border border-brand-black/5">
                  <div className="w-16 h-16 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-[22px] font-bold text-brand-black mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[14px] text-gray">
                    We&apos;ve received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-5"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[12px] font-semibold uppercase tracking-[1px] text-brand-black mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-yellow/50 border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] font-semibold uppercase tracking-[1px] text-brand-black mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-3 bg-yellow/50 border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors"
                        placeholder="+91"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-[1px] text-brand-black mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 bg-yellow/50 border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-[1px] text-brand-black mb-2">
                      Subject
                    </label>
                    <select className="w-full px-4 py-3 bg-yellow/50 border border-brand-black/10 rounded-lg text-[14px] text-brand-black focus:outline-none focus:border-red transition-colors">
                      <option>General Inquiry</option>
                      <option>Distribution Partnership</option>
                      <option>Bulk / Wholesale Order</option>
                      <option>Product Information</option>
                      <option>Feedback</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[12px] font-semibold uppercase tracking-[1px] text-brand-black mb-2">
                      Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-yellow/50 border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-8 py-3 bg-red text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
