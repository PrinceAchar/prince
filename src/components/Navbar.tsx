"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const lastScroll = useRef(0);

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
    <nav
      className={`fixed top-0 left-0 w-full h-[60px] md:h-[70px] bg-yellow flex items-center justify-between px-4 md:px-10 z-[1000] transition-transform duration-[350ms] ease-in-out ${
        hidden ? "navbar-hidden" : ""
      }`}
    >
      <div className="hidden md:flex gap-7 flex-1">
        <a href="#home" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
          Home
        </a>
        <a href="#achar" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
          Achar
        </a>
        <a href="#murabba" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
          Murabba
        </a>
        <a href="#contact" className="text-[14px] font-medium text-red uppercase tracking-[0.5px] hover:opacity-70 transition-opacity">
          Contact
        </a>
      </div>

      <div className="flex-1 md:flex-none text-center">
        <a href="#home" className="flex items-center justify-center h-full">
          <Image src="/logo.jpeg" alt="Prince Achar" width={50} height={50} className="h-[45px] md:h-[60px] w-auto object-contain" />
        </a>
      </div>

      <div className="flex items-center gap-4 md:gap-5 flex-1 justify-end">
        <a href="#login" className="text-red hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
          </svg>
        </a>
        <a href="#cart" className="text-red hover:opacity-70 transition-opacity">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </a>
      </div>
    </nav>
  );
}
