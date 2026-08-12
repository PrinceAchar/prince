import Image from "next/image";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-yellow text-brand-black pt-10 md:pt-[50px]">
      <div className="max-w-[1200px] mx-auto pb-8 md:pb-10 border-b border-brand-black/10 px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
          {/* Logo + Description */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-3">
              <Image src="/logo.jpeg" alt="Prince Achar" width={80} height={80} className="h-16 md:h-[70px] w-auto object-contain rounded-full" />
            </div>
            <p className="text-[13px] text-brand-black/60 leading-relaxed max-w-[220px]">
              Authentic Delhi flavors, handcrafted with love since 1980.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-3 md:mb-4 text-red">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Home</Link>
              <Link href="/achar" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Achar</Link>
              <Link href="/murabba" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Murabba</Link>
              <Link href="/store-locator" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Store Locator</Link>
              <Link href="/contact" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Contact</Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-3 md:mb-4 text-red">
              Support
            </h4>
            <div className="flex flex-col gap-2">
              <Link href="/faq" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">FAQ</Link>
              <Link href="/shipping" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Shipping</Link>
              <Link href="/returns" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Returns</Link>
              <Link href="/privacy" className="block text-[13px] text-brand-black/60 hover:text-brand-black transition-colors">Privacy Policy</Link>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-[11px] md:text-[12px] font-semibold uppercase tracking-[1.5px] mb-3 md:mb-4 text-red">
              Follow Us
            </h4>
            <div className="flex gap-3">
              <a
                href="https://www.instagram.com/princeacharindia/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Prince Achar on Instagram"
                className="text-brand-black/60 hover:text-red transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto py-4 md:py-5 text-center px-6">
        <p className="text-[11px] md:text-[12px] text-brand-black/40">&copy; 2025 Prince Achar. All rights reserved.</p>
      </div>
    </footer>
  );
}
