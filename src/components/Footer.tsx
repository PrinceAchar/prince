"use client";

import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/lib/content";

export default function Footer() {
  const year = new Date().getFullYear();
  const content = useContent();
  const footer = content.footer;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Achar", href: "/achar" },
    { label: "Murabba & Chutney", href: "/murabba" },
    { label: "Contact", href: "/contact" },
  ];

  const supportLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Returns & Refunds", href: "/returns" },
    { label: "Shipping", href: "/shipping" },
    { label: "FAQ", href: "/faq" },
  ];

  return (
    <footer className="bg-[#FAF5E4] text-brand-black relative overflow-hidden pt-6 md:pt-10">
      <div className="max-w-[1150px] mx-auto px-6 pb-6 md:pb-10 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 md:divide-x md:divide-brand-black/10 text-center md:text-left">
          <div className="col-span-1 sm:col-span-2 md:col-span-1 md:px-6 flex flex-col items-center md:items-start">
            <Image
              src={content.settings.logoUrl || "/logo.jpeg"}
              alt={content.settings.siteName}
              width={200}
              height={75}
              className="h-12 md:h-16 w-auto mb-2 md:mb-3"
            />
            <p className="text-[12px] md:text-[13px] text-gray leading-relaxed max-w-[240px]">
              {footer.tagline}
            </p>
          </div>

          <div className="md:px-6">
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-2 md:mb-4 text-red">
              Quick Links
            </h4>
            <div className="flex flex-col gap-1.5 md:gap-2 items-center md:items-start">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:px-6">
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-2 md:mb-4 text-red">
              Support
            </h4>
            <div className="flex flex-col gap-1.5 md:gap-2 items-center md:items-start">
              {supportLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:px-6">
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-2 md:mb-4 text-red">
              Follow Us
            </h4>
            <div className="flex gap-4 justify-center md:justify-start">
              {footer.socialLinks.instagram && (
                <a
                  href={footer.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Prince Achar on Instagram"
                  className="text-brand-black/60 hover:text-red transition-colors"
                >
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {footer.socialLinks.facebook && (
                <a
                  href={footer.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Prince Achar on Facebook"
                  className="text-brand-black/60 hover:text-red transition-colors"
                >
                  <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-red">
        <div className="max-w-[1150px] mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-1 md:gap-0">
          <p className="text-[11px] text-white/90 text-center md:text-left">
            &copy; {year} {content.settings.siteName}. All rights reserved.
          </p>
          <span className="text-[11px] text-white/80 hidden md:block">
            Handcrafted in Delhi since 1980
          </span>
        </div>
      </div>
    </footer>
  );
}
