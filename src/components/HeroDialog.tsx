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
      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-yellow/92 backdrop-blur-sm flex items-center justify-center border-2 border-red transition-opacity duration-1000 ${
        fadeOut ? "hero-dialog-fade-out" : "opacity-100"
      }`}
    >
      <div className="text-center p-10">
        <h2 className="font-heading text-[28px] font-bold text-red mb-4">
          Handcrafted with Love
        </h2>
        <p className="text-[15px] text-gray leading-relaxed mb-6">
          Experience the authentic flavors of Delhi, passed down through generations.
        </p>
        <a
          href="#achar"
          className="inline-block px-7 py-[10px] bg-red text-white text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red-dark transition-colors"
        >
          Explore Now
        </a>
      </div>
    </div>
  );
}
