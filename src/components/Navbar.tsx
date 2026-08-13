"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "./CartProvider";
import AccountMenu from "./AccountMenu";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const lastScroll = useRef(0);
  const router = useRouter();
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const current = window.pageYOffset;
      if (current <= 0) {
        setHidden(false);
        return;
      }
      setHidden(current > lastScroll.current);
      lastScroll.current = current;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full h-[60px] md:h-[70px] bg-yellow flex items-center justify-between px-4 md:px-10 z-[1000] transition-transform duration-[350ms] ease-in-out ${
          hidden ? "navbar-hidden" : "animate-slide-in-down"
        }`}
      >
        {/* Left: Hamburger (mobile) / Nav links (desktop) */}
        <div className="flex items-center flex-1">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-red"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
          <div className="hidden md:flex gap-7">
            <Link href="/" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
              Home
            </Link>
            <Link href="/achar" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
              Achar
            </Link>
            <Link href="/murabba" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
              Murabba
            </Link>
            <Link href="/contact" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
              Contact
            </Link>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="absolute left-1/2 -translate-x-1/2">
          <Link href="/" className="flex items-center justify-center">
            <Image src="/logo.jpeg" alt="Prince Achar" width={50} height={50} className="h-[45px] md:h-[60px] w-auto object-contain" />
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 md:gap-5 flex-1 justify-end">
          <AccountMenu />

          {/* Search */}
          <div className="relative flex items-center">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-red hover:opacity-70 transition-opacity"
              aria-label="Search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            {searchOpen && (
              <form
                onSubmit={handleSearchSubmit}
                className="absolute right-0 top-[calc(100%+10px)] w-[260px] md:w-[320px] bg-white border border-brand-black/10 rounded-xl shadow-lg p-2 z-[1001]"
              >
                <div className="flex items-center gap-2">
                  <input
                    ref={searchInputRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="flex-1 px-3 py-2 bg-yellow/40 border border-brand-black/10 rounded-lg text-[13px] text-brand-black placeholder:text-gray/60 focus:outline-none focus:border-red transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red text-white text-[11px] font-semibold uppercase tracking-wider rounded-lg hover:bg-red-dark transition-colors"
                  >
                    Go
                  </button>
                </div>
              </form>
            )}
          </div>

          <button onClick={openCart} className="relative text-red hover:opacity-70 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-red text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="fixed top-[60px] left-0 w-full bg-yellow border-t border-brand-black/10 z-[999] md:hidden">
          <div className="flex flex-col px-6 py-4 gap-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-red uppercase tracking-[0.5px]">Home</Link>
            <Link href="/achar" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-red uppercase tracking-[0.5px]">Achar</Link>
            <Link href="/murabba" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-red uppercase tracking-[0.5px]">Murabba</Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-[14px] font-medium text-red uppercase tracking-[0.5px]">Contact</Link>
          </div>
        </div>
      )}
    </>
  );
}
