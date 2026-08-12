import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Achar", href: "/achar" },
  { label: "Murabba", href: "/murabba" },
  { label: "Store Locator", href: "/store-locator" },
  { label: "Contact", href: "/contact" },
];

const supportLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Returns & Refunds", href: "/returns" },
  { label: "Shipping", href: "/shipping" },
  { label: "FAQ", href: "/faq" },
];

function FooterDivider() {
  return (
    <div className="flex items-center justify-center gap-3 py-8">
      <span className="h-px w-24 bg-brand-black/15" />
      <svg className="w-2.5 h-2.5 text-red" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
      </svg>
      <span className="h-px w-24 bg-brand-black/15" />
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#EFE3CC] text-brand-black relative overflow-hidden">
      <FooterDivider />

      <div className="max-w-[1150px] mx-auto px-6 pb-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 md:divide-x md:divide-brand-black/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 md:px-6">
            <Image
              src="/logo.jpeg"
              alt="Prince Achar"
              width={150}
              height={56}
              className="h-12 w-auto"
            />
          </div>

          {/* Quick Links */}
          <div className="md:px-6">
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-3 md:mb-4 text-red">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
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

          {/* Support */}
          <div className="md:px-6">
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-3 md:mb-4 text-red">
              Support
            </h4>
            <div className="flex flex-col gap-2">
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

          {/* Follow Us */}
          <div className="md:px-6">
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-3 md:mb-4 text-red">
              Follow Us
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="https://www.instagram.com/princeacharindia/"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Corner heritage line-art */}
        <svg
          className="absolute bottom-1 left-1 w-16 h-16 text-brand-black/[0.08] pointer-events-none"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <rect x="18" y="14" width="28" height="40" rx="6" />
          <rect x="21" y="8" width="22" height="8" rx="2" />
          <line x1="18" y1="26" x2="46" y2="26" />
        </svg>
        <svg
          className="absolute bottom-1 right-1 w-16 h-16 text-brand-black/[0.08] pointer-events-none"
          viewBox="0 0 64 64"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M14 44C14 30 26 18 42 16c4 6 2 18-8 26-6 4-16 6-20 2Z" />
          <path d="M42 16c4-4 8-4 10-2" />
        </svg>
      </div>

      {/* Copyright strip */}
      <div className="bg-red">
        <div className="max-w-[1150px] mx-auto px-6 py-3 flex items-center justify-between">
          <p className="text-[11px] text-white/90">
            &copy; {year} Prince Achar. All rights reserved.
          </p>
          <span className="text-[11px] text-white/80 hidden sm:block">
            Handcrafted in Delhi since 1980
          </span>
        </div>
      </div>
    </footer>
  );
}
