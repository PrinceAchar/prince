"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STORE_IMAGES = [
  "/store/store-front.png",
  "/store/store-2.png",
  "/store/store-3.png",
  "/store/store-4.png",
];

const reachItems = [
  {
    title: "Visit Our Store",
    lines: [
      "Shop No. 6673, Khari Baoli Road,",
      "Fatehpuri, Chandni Chowk,",
      "New Delhi – 110006",
    ],
    action: {
      label: "Get Directions",
      href: "https://www.google.com/maps?q=28.6570235,77.2212014",
    },
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
  },
  {
    title: "Phone",
    lines: ["+91 98110 56593"],
    href: "tel:+919811056593",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
  },
  {
    title: "Email",
    lines: ["info@princeachar.com"],
    href: "mailto:info@princeachar.com",
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    title: "Hours",
    lines: ["Mon – Sat: 9 AM – 6 PM"],
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const SUBJECTS = [
  "General Inquiry",
  "Distribution Partnership",
  "Bulk / Wholesale Order",
  "Product Information",
  "Feedback",
];

const fieldClass =
  "w-full px-4 py-3 bg-white border border-brand-black/10 rounded-xl text-[14px] text-brand-black placeholder:text-gray/60 focus:outline-none focus:ring-2 focus:ring-red/30 focus:border-red transition-colors";

function Slideshow() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % STORE_IMAGES.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative h-full min-h-[340px] lg:min-h-0 rounded-2xl overflow-hidden bg-yellow/30">
      {STORE_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Prince Achar store in Khari Baoli, Chandni Chowk"
          fill
          sizes="58vw"
          className={`object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-4 left-4 text-white text-[12px] tracking-[0.2em] font-medium drop-shadow-sm">
        {String(idx + 1).padStart(2, "0")} / {String(STORE_IMAGES.length).padStart(2, "0")}
      </div>
      <div className="absolute bottom-4 right-4 flex gap-1.5">
        {STORE_IMAGES.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Show slide ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-5 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: SUBJECTS[0],
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update =
    (key: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Prince Achar — ${form.subject}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:info@princeachar.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[1100px] mx-auto px-6 py-8 md:py-10 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Get in Touch
          </span>
          <h1 className="font-heading text-[34px] md:text-[48px] font-bold text-brand-black mb-3 leading-tight">
            Contact Us
          </h1>
          <p className="text-[13px] md:text-[15px] text-gray max-w-[480px] mx-auto leading-relaxed">
            Distributors, retailers, or pickle lovers — we&apos;re here for you. Reach out and
            we&apos;ll get back to you shortly.
          </p>
        </div>
      </section>

      {/* MAIN: SLIDESHOW + FORM */}
      <section className="bg-[#FAF5E4] py-8 md:py-10">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-8 lg:items-stretch">
            <Slideshow />

            <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 md:p-8">
              {submitted ? (
                <div className="h-full min-h-[340px] flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 bg-red/10 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-7 h-7 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-[20px] font-bold text-brand-black mb-2">Thank You!</h3>
                  <p className="text-[13px] text-gray max-w-[260px]">
                    Your email client should have opened with your message. We&apos;ll get back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Name</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={update("name")}
                        className={fieldClass}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={update("phone")}
                        className={fieldClass}
                        placeholder="+91"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      className={fieldClass}
                      placeholder="you@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Subject</label>
                    <select value={form.subject} onChange={update("subject")} className={fieldClass}>
                      {SUBJECTS.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold uppercase tracking-[1px] text-brand-black mb-1.5">Message</label>
                    <textarea
                      required
                      rows={4}
                      value={form.message}
                      onChange={update("message")}
                      className={`${fieldClass} resize-none`}
                      placeholder="Tell us how we can help..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 bg-red text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-xl hover:bg-red/90 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* REACH US STRIP */}
      <section className="bg-[#FAF5E4] pb-8 md:pb-10">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-6 border-t border-brand-black/10 pt-8">
            {reachItems.map((item) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red/10 text-red flex items-center justify-center mt-0.5">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[10px] font-semibold uppercase tracking-[1.5px] text-brand-black/50 mb-1">
                    {item.title}
                  </h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-[13px] text-brand-black leading-snug">
                      {item.href ? (
                        <a href={item.href} className="hover:text-red transition-colors">
                          {line}
                        </a>
                      ) : (
                        line
                      )}
                    </p>
                  ))}
                  {item.action && (
                    <a
                      href={item.action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-red hover:opacity-70 transition-opacity"
                    >
                      {item.action.label}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
