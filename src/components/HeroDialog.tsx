"use client";

import { useEffect, useState } from "react";

export default function HeroDialog() {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setFadeOut(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] sm:w-[340px] sm:h-[340px] md:w-[450px] md:h-[450px] flex items-center justify-center bg-yellow border-2 border-red transition-opacity duration-1000 ${
        fadeOut ? "hero-dialog-fade-out" : "opacity-100"
      }`}
    >
      <div className="text-center p-3 sm:p-8 md:p-10">
        <h2 className="font-heading text-[16px] sm:text-[24px] md:text-[28px] font-bold text-red mb-2 sm:mb-3 md:mb-4">
          Handcrafted with Love
        </h2>
        <p className="text-[11px] sm:text-[14px] md:text-[15px] text-gray leading-relaxed mb-3 sm:mb-4 md:mb-6">
          Experience the authentic flavors of Delhi, passed down through generations.
        </p>
        <a
          href="/achar"
          className="inline-block px-4 sm:px-6 md:px-7 py-1.5 sm:py-2 md:py-[10px] bg-red text-white text-[10px] sm:text-[12px] md:text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red-dark transition-colors"
        >
          Explore Now
        </a>
      </div>
    </div>
  );
}
