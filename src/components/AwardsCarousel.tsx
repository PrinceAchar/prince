"use client";

import { useState } from "react";
import Image from "next/image";

const awards = [
  { year: "1983", awardedBy: "Shri Jagmohan", title: "Lieutenant Governor of Delhi", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/1983.png" },
  { year: "1985", awardedBy: "Ram Venkataraman", title: "Former Vice President of India", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/1985.png" },
  { year: "1986", awardedBy: "Mr. Kapoor", title: "Representative of the Lt. Governor of Delhi", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/1986.png" },
  { year: "1987", awardedBy: "Mrs. Hidayatullah", title: "Wife of Former Vice President of India", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/1987.png" },
  { year: "1988", awardedBy: "Shri S.K. Mishra", title: "Personal Secretary to the Prime Minister", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/1988.png" },
  { year: "1995", awardedBy: "Shri Madan Lal Khurana", title: "Chief Minister of Delhi — Mango Festival", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/1995.png" },
  { year: "2003", awardedBy: "Ms. Shailaja Chandra", title: "Chief Secretary, Government of Delhi", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/2003-1.png" },
  { year: "2003", awardedBy: "Hindustan Times", title: "Media Recognition", desc: "Featured for Legacy of Authentic Flavors", img: "/2003-2.png" },
  { year: "2003–2012", awardedBy: "Smt. Sheila Dikshit", title: "Chief Minister of Delhi — Continuously Recognized", desc: "First Prize — Excellence in Pickles & Murabbas", img: "/2003-12.png" },
];

const awardsLoop = [...awards, ...awards];

export default function AwardsCarousel() {
  const [selected, setSelected] = useState<typeof awards[number] | null>(null);

  return (
    <>
      <section id="awards" className="py-12 md:py-20 bg-yellow text-center overflow-hidden px-4 md:px-6">
        <span className="inline-block text-[10px] md:text-[11px] font-semibold uppercase tracking-[3px] text-red mb-3 md:mb-4">
          Awards &amp; Recognitions
        </span>
        <h2 className="font-heading text-[26px] md:text-[30px] lg:text-[34px] font-bold text-brand-black mb-3 md:mb-4">
          Celebrated for Excellence
        </h2>
        <p className="text-[13px] md:text-[14px] text-gray mb-8 md:mb-12 max-w-[600px] mx-auto">
          All awards featured are First Prize recognitions, celebrating our excellence in crafting authentic Pickles &amp; Murabbas.
        </p>
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-4 md:gap-6 w-max animate-[carousel-scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
            {awardsLoop.map((award, i) => (
              <button
                key={i}
                onClick={() => setSelected(award)}
                className="flex-none w-[220px] md:w-[260px] lg:w-[280px] bg-white rounded-lg overflow-hidden shadow-sm group text-left cursor-pointer"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <Image
                    src={award.img}
                    alt={award.awardedBy}
                    fill
                    sizes="280px"
                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  {award.year && (
                    <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-red text-white text-[10px] md:text-[11px] font-semibold px-2.5 py-0.5 md:px-3 md:py-1 rounded-full">
                      {award.year}
                    </span>
                  )}
                </div>
                <div className="p-3 md:p-5 text-center">
                  <h3 className="text-[13px] md:text-[14px] lg:text-[15px] font-semibold text-brand-black mb-1">{award.awardedBy}</h3>
                  <p className="text-[11px] md:text-[12px] text-gray mb-2 md:mb-3">{award.title}</p>
                  <div className="w-6 md:w-8 h-[2px] bg-red mx-auto mb-2 md:mb-3" />
                  <p className="text-[12px] md:text-[13px] text-gray leading-relaxed">{award.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-[400px] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <Image
                src={selected.img}
                alt={selected.awardedBy}
                fill
                sizes="400px"
                className="object-cover"
              />
              {selected.year && (
                <span className="absolute top-3 left-3 md:top-4 md:left-4 bg-red text-white text-[12px] md:text-[13px] font-semibold px-3 py-1 md:px-4 md:py-1.5 rounded-full">
                  {selected.year}
                </span>
              )}
            </div>
            <div className="p-4 md:p-6 text-center">
              <h3 className="text-[16px] md:text-[18px] font-semibold text-brand-black mb-1">{selected.awardedBy}</h3>
              <p className="text-[12px] md:text-[13px] text-gray mb-2 md:mb-3">{selected.title}</p>
              <div className="w-8 md:w-10 h-[2px] bg-red mx-auto mb-2 md:mb-3" />
              <p className="text-[13px] md:text-[14px] text-gray leading-relaxed">{selected.desc}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-8 h-8 md:w-9 md:h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
