"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const STORE_IMAGES = [
  "/store/store-front.webp",
  "/store/store-2.png",
  "/store/store-3.png",
  "/store/store-4.png",
];

const SUBJECTS = [
  "Wholesale & Distribution",
  "Retail / Stocking Inquiry",
  "Product Feedback",
  "Order Support",
  "Press & Media",
  "Other",
];

function MapPinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 6L2 7" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

const reachItems = [
  {
    title: "Store",
    icon: <MapPinIcon />,
    lines: ["Shop No. 6673, Khari Baoli Road, Fatehpuri,", "Chandni Chowk, New Delhi – 110006"],
    action: {
      label: "Get Directions",
      href: "https://www.google.com/maps/search/?api=1&query=Prince+Achar+Khari+Baoli+Delhi",
      external: true,
    },
  },
  {
    title: "Hours",
    icon: <ClockIcon />,
    lines: ["Mon–Sat: 9:00 AM – 6:00 PM", "Sunday: Closed"],
  },
  {
    title: "Phone",
    icon: <PhoneIcon />,
    lines: ["+91 98110 56593"],
    action: { label: "Call Now", href: "tel:+919811056593" },
  },
  {
    title: "Email",
    icon: <MailIcon />,
    lines: ["info@princeachar.com"],
    action: { label: "Email Us", href: "mailto:info@princeachar.com" },
  },
];

function HeritageDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-5">
      <span className="h-px w-20 md:w-24 bg-brand-black/15" />
      <svg className="w-2.5 h-2.5 text-red" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
      </svg>
      <span className="h-px w-20 md:w-24 bg-brand-black/15" />
    </div>
  );
}

const fieldClass =
  "w-full px-4 py-3 bg-white border border-brand-black/12 rounded-xl text-[14px] text-brand-black placeholder:text-gray/70 outline-none focus:border-red/50 focus:ring-2 focus:ring-red/15 transition-colors";

function Slideshow() {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const go = (dir: number) =>
    setIdx((i) => (i + dir + STORE_IMAGES.length) % STORE_IMAGES.length);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % STORE_IMAGES.length),
      5000
    );
    return () => clearInterval(t);
  }, [paused]);

  return (
    <div
      className="relative h-full min-h-[380px] lg:min-h-0 rounded-[16px] overflow-hidden bg-[#F3E9D6]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {STORE_IMAGES.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Prince Achar store in Khari Baoli, Delhi"
          fill
          sizes="(max-width: 1024px) 100vw, 58vw"
          className={`object-cover transition-opacity duration-700 ${
            i === idx ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="text-white text-[11px] font-semibold uppercase tracking-[2px] drop-shadow-sm">
          Khari Baoli, Delhi
        </span>
      </div>
      <div className="absolute bottom-4 right-4 flex items-center gap-3">
        <span className="text-white text-[12px] tracking-[0.2em] tabular-nums drop-shadow-sm">
          {String(idx + 1).padStart(2, "0")} /{" "}
          {String(STORE_IMAGES.length).padStart(2, "0")}
        </span>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="w-7 h-7 rounded-full border border-white/60 text-white flex items-center justify-center transition-colors hover:bg-white/15"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next photo"
            className="w-7 h-7 rounded-full border border-white/60 text-white flex items-center justify-center transition-colors hover:bg-white/15"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nSubject: ${form.subject}\n\n${form.message}`
    );
    window.location.href = `mailto:info@princeachar.com?subject=${encodeURIComponent(
      form.subject || "Contact Inquiry"
    )}&body=${body}`;
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section className="pt-[60px] md:pt-[70px] bg-white">
        <div className="max-w-[1150px] mx-auto px-6 pt-10 md:pt-12 pb-2 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3">
            Get in Touch
          </span>
          <h1 className="font-heading text-[36px] md:text-[42px] font-bold text-brand-black leading-tight">
            Contact Us
          </h1>
          <p className="text-[13px] md:text-[15px] text-gray max-w-[460px] mx-auto leading-relaxed mt-3">
            Distributors, retailers, or pickle lovers — we&apos;re here for you.
            Reach out and we&apos;ll get back to you shortly.
          </p>
          <HeritageDivider />
        </div>
      </section>

      {/* Slideshow + Form */}
      <section className="bg-white pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-7 lg:items-stretch">
            <Slideshow />

            <div className="bg-yellow rounded-[22px] border border-brand-black/10 shadow-[0_2px_18px_rgba(0,0,0,0.04)] p-6 md:p-8">
              {submitted ? (
                <div className="h-full min-h-[360px] flex flex-col items-center justify-center text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-red/10 flex items-center justify-center mb-4">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C21A33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-[20px] font-bold text-brand-black mb-2">
                    Message Sent
                  </h3>
                  <p className="text-[13px] text-gray max-w-[280px] leading-relaxed">
                    Your email client should open shortly — hit send to
                    complete your message. We&apos;ll get back to you within one
                    business day.
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col">
                  <div className="mb-6">
                    <span className="block text-[11px] font-semibold uppercase tracking-[2px] text-red mb-1.5">
                      Get in Touch
                    </span>
                    <h2 className="font-heading text-[22px] md:text-[26px] font-bold text-brand-black leading-snug">
                      We&apos;d love to hear from you.
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={update("name")}
                          placeholder="Your name"
                          className={fieldClass}
                        />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                          Phone
                        </label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={update("phone")}
                          placeholder="Your phone"
                          className={fieldClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={update("email")}
                        placeholder="you@example.com"
                        className={fieldClass}
                      />
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                        Subject
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={update("subject")}
                        className={`${fieldClass} appearance-none`}
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={update("message")}
                        placeholder="Tell us how we can help..."
                        className={`${fieldClass} min-h-[110px] resize-none`}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-red hover:bg-red-dark text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-xl py-3.5 transition-colors"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Reach Us strip */}
      <section className="bg-white pb-10 md:pb-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-yellow rounded-[14px] border border-brand-black/8 px-5 md:px-7 py-6 md:py-7">
            <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto_auto] divide-y divide-brand-black/10 md:divide-y-0 md:divide-x">
              {reachItems.map((item, i) => (
                <div key={i} className="flex gap-3 md:px-3 py-5 first:pt-0 last:pb-0 md:py-0">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red/10 text-red flex items-center justify-center mt-0.5">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[10px] font-semibold uppercase tracking-[1.5px] text-gray mb-1">
                      {item.title}
                    </h3>
                    {item.lines.map((l, li) => (
                      <p key={li} className="text-[13px] text-brand-black leading-snug">
                        {l}
                      </p>
                    ))}
                    {item.action && (
                      <a
                        href={item.action.href}
                        target={item.action.external ? "_blank" : undefined}
                        rel={item.action.external ? "noopener noreferrer" : undefined}
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
        </div>
      </section>

      <Footer />
    </>
  );
}
