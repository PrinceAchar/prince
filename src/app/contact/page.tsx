"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-14 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Get in Touch
          </span>
          <h1 className="font-heading text-[32px] md:text-[42px] font-bold text-brand-black mb-3 leading-tight">
            Contact Us
          </h1>
          <p className="text-[13px] md:text-[14px] text-gray max-w-[480px] mx-auto">
            Distributors, retailers, or pickle lovers — we&apos;re here for you.
          </p>
        </div>
      </section>

      {/* FORM + INFO */}
      <section className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6 py-10 md:py-14">
          <div className="flex flex-col md:flex-row gap-10 md:gap-16">
            {/* Left: Info */}
            <div className="md:w-[35%] space-y-6">
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1.5">Visit Our Store</h3>
                <p className="text-[14px] text-gray leading-snug">
                  Shop No. 6673, Khari Baoli Road,<br />
                  Fatehpuri, Chandni Chowk,<br />
                  New Delhi – 110006
                </p>
                <a
                  href="https://www.google.com/maps?q=28.6570235,77.2212014"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-[12px] font-semibold uppercase tracking-wider text-red hover:opacity-70 transition-opacity"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  Get Directions
                </a>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1.5">Phone</h3>
                <a href="tel:+919811056593" className="text-[14px] text-gray hover:text-red transition-colors">+91 98110 56593</a>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1.5">Email</h3>
                <a href="mailto:info@princeachar.com" className="text-[14px] text-gray hover:text-red transition-colors">info@princeachar.com</a>
              </div>
              <div>
                <h3 className="text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1.5">Hours</h3>
                <p className="text-[14px] text-gray">Mon – Sat: 9 AM – 6 PM</p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="md:flex-1">
              {submitted ? (
                <div className="bg-yellow/40 rounded-xl p-10 text-center">
                  <div className="w-14 h-14 bg-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-7 h-7 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-[20px] font-bold text-brand-black mb-1">Thank You!</h3>
                  <p className="text-[13px] text-gray">We&apos;ll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Name</label>
                      <input type="text" required className="w-full px-3 py-2.5 bg-yellow/40 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray/60 focus:outline-none focus:border-red transition-colors" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Phone</label>
                      <input type="tel" className="w-full px-3 py-2.5 bg-yellow/40 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray/60 focus:outline-none focus:border-red transition-colors" placeholder="+91" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Email</label>
                      <input type="email" required className="w-full px-3 py-2.5 bg-yellow/40 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray/60 focus:outline-none focus:border-red transition-colors" placeholder="you@example.com" />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Subject</label>
                      <select className="w-full px-3 py-2.5 bg-yellow/40 border border-brand-black/10 rounded-lg text-[13px] text-brand-black focus:outline-none focus:border-red transition-colors">
                        <option>General Inquiry</option>
                        <option>Distribution Partnership</option>
                        <option>Bulk / Wholesale Order</option>
                        <option>Product Information</option>
                        <option>Feedback</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Message</label>
                    <textarea required rows={4} className="w-full px-3 py-2.5 bg-yellow/40 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray/60 focus:outline-none focus:border-red transition-colors resize-none" placeholder="Tell us how we can help..." />
                  </div>
                  <button type="submit" className="w-full py-2.5 bg-red text-white text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red/90 transition-colors">
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STORE */}
      <section className="bg-[#FAF5E4] py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-8 md:mb-10">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
              Our Store
            </span>
            <h2 className="font-heading text-[26px] md:text-[32px] font-bold text-brand-black mb-3">
              Find Us in Khari Baoli
            </h2>
            <p className="text-[13px] md:text-[14px] text-gray max-w-[560px] mx-auto">
              Drop by our shop in the heart of Old Delhi&apos;s famous spice market,
              just a short walk from Fatehpuri Masjid.
            </p>
          </div>

          {/* Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/store/store-front.png"
                alt="Prince Achar storefront in Khari Baoli, Chandni Chowk"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/store/store-2.png"
                alt="Inside Prince Achar store, Khari Baoli"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/store/store-3.png"
                alt="Prince Achar pickles display"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/store/store-4.png"
                alt="Prince Achar products at the Khari Baoli store"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Map */}
          <div className="relative aspect-[16/7] rounded-xl overflow-hidden border border-brand-black/10">
            <iframe
              title="Prince Achar location on Google Maps"
              src="https://www.google.com/maps?q=28.6570235,77.2212014&z=17&output=embed"
              className="absolute inset-0 w-full h-full"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
