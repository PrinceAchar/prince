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


export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF5E4] text-brand-black relative overflow-hidden pt-10">
      <div className="max-w-[1150px] mx-auto px-6 pb-10 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6 md:divide-x md:divide-brand-black/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 md:px-6">
            <Image
              src="/logo.jpeg"
              alt="Prince Achar"
              width={150}
              height={56}
              className="h-12 w-auto mb-3"
            />
            <p className="text-[13px] text-gray leading-relaxed max-w-[240px]">
              Authentic Delhi flavors, handcrafted with love since 1980.
            </p>
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
