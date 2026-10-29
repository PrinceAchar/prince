"use client";

import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useContent } from "@/lib/content";

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

const fieldClass =
  "w-full px-4 py-3 bg-surface border border-brand-black/12 rounded-xl text-[14px] text-brand-black placeholder:text-gray/70 outline-none focus:border-red/50 focus:ring-2 focus:ring-red/15 transition-colors";

function ContactImage({ src }: { src?: string }) {
  if (!src) return null;

  return (
    <div className="relative w-full aspect-square lg:aspect-auto lg:h-full min-h-[380px] rounded-[16px] overflow-hidden bg-yellow">
      <Image
        src={src}
        alt="Prince Achar store in Khari Baoli, Delhi"
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />
      <div className="absolute bottom-4 left-4">
        <span className="text-white text-[11px] font-semibold uppercase tracking-[2px] drop-shadow-sm">
          Khari Baoli, Delhi
        </span>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const content = useContent();
  const c = content.contact;

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
    window.location.href = `mailto:${c.info.email.address}?subject=${encodeURIComponent(
      form.subject || "Contact Inquiry"
    )}&body=${body}`;
    setSubmitted(true);
  };

  const reachItems = [
    {
      title: c.info.store.title,
      icon: <MapPinIcon />,
      lines: [c.info.store.address],
      action: { label: c.info.store.ctaText, href: c.info.store.ctaLink, external: true },
    },
    {
      title: "Hours",
      icon: <ClockIcon />,
      lines: [c.info.hours.weekday, c.info.hours.sunday],
    },
    {
      title: "Phone",
      icon: <PhoneIcon />,
      lines: [c.info.phone.number],
      action: { label: c.info.phone.ctaText, href: c.info.phone.ctaLink },
    },
    {
      title: "Email",
      icon: <MailIcon />,
      lines: [c.info.email.address],
      action: { label: c.info.email.ctaText, href: c.info.email.ctaLink },
    },
  ];

  return (
    <>
      <Navbar />

      {/* Full-bleed red banner styled to match the collection banners
          (bg #CC0000, gold #FFEB99, filigree corners reused from
          achar-banner.png). Sits under the fixed navbar. */}
      <div className="pt-[60px] md:pt-[70px]">
        <div className="relative w-full overflow-hidden bg-[#CC0000]">
          <Image
            src="/banner-corner.png"
            alt=""
            aria-hidden="true"
            width={341}
            height={345}
            className="absolute top-0 left-0 w-[76px] md:w-[150px] h-auto pointer-events-none"
          />
          <Image
            src="/banner-corner.png"
            alt=""
            aria-hidden="true"
            width={341}
            height={345}
            className="absolute top-0 right-0 w-[76px] md:w-[150px] h-auto -scale-x-100 pointer-events-none"
          />
          <Image
            src="/banner-corner.png"
            alt=""
            aria-hidden="true"
            width={341}
            height={345}
            className="absolute bottom-0 left-0 w-[76px] md:w-[150px] h-auto -scale-y-100 pointer-events-none"
          />
          <Image
            src="/banner-corner.png"
            alt=""
            aria-hidden="true"
            width={341}
            height={345}
            className="absolute bottom-0 right-0 w-[76px] md:w-[150px] h-auto -scale-x-100 -scale-y-100 pointer-events-none"
          />
          <div className="relative flex items-center justify-center px-24 md:px-40 py-9 md:py-14">
            <h1 className="font-heading text-[34px] md:text-[58px] leading-none text-[#FFEB99]">
              Contact Us
            </h1>
          </div>
        </div>
      </div>

      <section className="bg-surface pt-8 md:pt-10 pb-8">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-6 md:gap-7 lg:items-stretch">
            <ContactImage src={c.images[0]} />

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
                      {c.form.label}
                    </span>
                    <h2 className="font-heading text-[22px] md:text-[26px] font-bold text-brand-black leading-snug">
                      {c.form.heading}
                    </h2>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[12px] font-medium text-brand-black mb-1.5">Name</label>
                        <input type="text" required value={form.name} onChange={update("name")} placeholder="Your name" className={fieldClass} />
                      </div>
                      <div>
                        <label className="block text-[12px] font-medium text-brand-black mb-1.5">Phone</label>
                        <input type="tel" required value={form.phone} onChange={update("phone")} placeholder="Your phone" className={fieldClass} />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-brand-black mb-1.5">Email</label>
                      <input type="email" required value={form.email} onChange={update("email")} placeholder="you@example.com" className={fieldClass} />
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-brand-black mb-1.5">Subject</label>
                      <select required value={form.subject} onChange={update("subject")} className={`${fieldClass} appearance-none`}>
                        <option value="" disabled>Select a subject</option>
                        {c.form.subjects.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[12px] font-medium text-brand-black mb-1.5">Message</label>
                      <textarea required value={form.message} onChange={update("message")} placeholder="Tell us how we can help..." className={`${fieldClass} min-h-[110px] resize-none`} />
                    </div>

                    <button type="submit" className="w-full bg-red hover:bg-red-dark text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-xl py-3.5 transition-colors">
                      Send Message
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface pb-10 md:pb-14">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="bg-yellow rounded-[14px] border border-brand-black/8 px-5 md:px-7 py-6 md:py-7">
            <div className="grid grid-cols-1 md:grid-cols-[auto_auto_auto_auto] divide-y divide-brand-black/10 md:divide-y-0 md:divide-x">
              {reachItems.map((item, i) => (
                <div key={i} className="flex gap-3 md:px-3 py-5 first:pt-0 last:pb-0 md:py-0">
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-red/10 text-red flex items-center justify-center mt-0.5">
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-[10px] font-semibold uppercase tracking-[1.5px] text-gray mb-1">{item.title}</h3>
                    {item.lines.map((l, li) => (
                      <p key={li} className="text-[13px] text-brand-black leading-snug">{l}</p>
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
