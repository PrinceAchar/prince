"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />

      <section className="pt-[60px] md:pt-[70px] min-h-screen bg-white flex items-center">
        <div className="max-w-[1200px] mx-auto px-6 py-6 md:py-8 w-full">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            {/* Contact Info */}
            <div className="md:w-[35%]">
              <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
                Contact Us
              </span>
              <h1 className="font-heading text-[30px] md:text-[36px] font-bold text-brand-black mb-6 leading-tight">
                Let&apos;s Talk
              </h1>

              <div className="space-y-4">
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1">
                    Address
                  </h3>
                  <p className="text-[13px] text-gray leading-snug">
                    Prince Achar, Old Delhi, India
                  </p>
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1">
                    Phone
                  </h3>
                  <a href="tel:+919810000000" className="text-[13px] text-gray hover:text-red transition-colors">
                    +91 98100 00000
                  </a>
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1">
                    Email
                  </h3>
                  <a href="mailto:info@princeachar.com" className="text-[13px] text-gray hover:text-red transition-colors">
                    info@princeachar.com
                  </a>
                </div>
                <div>
                  <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1">
                    Hours
                  </h3>
                  <p className="text-[13px] text-gray leading-snug">
                    Mon – Sat: 9 AM – 6 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:flex-1">
              {submitted ? (
                <div className="bg-yellow/50 rounded-xl p-8 text-center border border-brand-black/5">
                  <div className="w-14 h-14 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-[20px] font-bold text-brand-black mb-1">
                    Thank You!
                  </h3>
                  <p className="text-[13px] text-gray">
                    We&apos;ve received your message and will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        className="w-full px-3 py-2.5 bg-yellow/50 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-3 py-2.5 bg-yellow/50 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors"
                        placeholder="+91"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        className="w-full px-3 py-2.5 bg-yellow/50 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors"
                        placeholder="you@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1">
                        Subject
                      </label>
                      <select className="w-full px-3 py-2.5 bg-yellow/50 border border-brand-black/10 rounded-lg text-[13px] text-brand-black focus:outline-none focus:border-red transition-colors">
                        <option>General Inquiry</option>
                        <option>Distribution Partnership</option>
                        <option>Bulk / Wholesale Order</option>
                        <option>Product Information</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1">
                      Message
                    </label>
                    <textarea
                      required
                      rows={3}
                      className="w-full px-3 py-2.5 bg-yellow/50 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray focus:outline-none focus:border-red transition-colors resize-none"
                      placeholder="Tell us how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 bg-red text-white text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red/90 transition-colors"
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
