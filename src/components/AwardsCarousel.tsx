"use client";

import { useState } from "react";

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
      <section id="awards" className="py-20 bg-yellow text-center overflow-hidden">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
          Awards &amp; Recognitions
        </span>
        <h2 className="font-heading text-[34px] font-bold text-brand-black mb-4">
          Celebrated for Excellence
        </h2>
        <p className="text-[14px] text-gray mb-12 max-w-[600px] mx-auto">
          All awards featured are First Prize recognitions, celebrating our excellence in crafting authentic Pickles &amp; Murabbas.
        </p>
        <div className="w-full overflow-hidden relative">
          <div className="flex gap-6 w-max animate-[carousel-scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
            {awardsLoop.map((award, i) => (
              <button
                key={i}
                onClick={() => setSelected(award)}
                className="flex-none w-[280px] bg-white rounded-lg overflow-hidden shadow-sm group text-left cursor-pointer"
              >
                <div className="relative w-full aspect-square overflow-hidden">
                  <img
                    src={award.img}
                    alt={award.awardedBy}
                    className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-105"
                  />
                  {award.year && (
                    <span className="absolute top-3 left-3 bg-red text-white text-[11px] font-semibold px-3 py-1 rounded-full">
                      {award.year}
                    </span>
                  )}
                </div>
                <div className="p-5 text-center">
                  <h3 className="text-[15px] font-semibold text-brand-black mb-1">{award.awardedBy}</h3>
                  <p className="text-[12px] text-gray mb-3">{award.title}</p>
                  <div className="w-8 h-[2px] bg-red mx-auto mb-3" />
                  <p className="text-[13px] text-gray leading-relaxed">{award.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-[400px] max-w-[90vw] bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full aspect-square overflow-hidden">
              <img
                src={selected.img}
                alt={selected.awardedBy}
                className="w-full h-full object-cover"
              />
              {selected.year && (
                <span className="absolute top-4 left-4 bg-red text-white text-[13px] font-semibold px-4 py-1.5 rounded-full">
                  {selected.year}
                </span>
              )}
            </div>
            <div className="p-6 text-center">
              <h3 className="text-[18px] font-semibold text-brand-black mb-1">{selected.awardedBy}</h3>
              <p className="text-[13px] text-gray mb-3">{selected.title}</p>
              <div className="w-10 h-[2px] bg-red mx-auto mb-3" />
              <p className="text-[14px] text-gray leading-relaxed">{selected.desc}</p>
            </div>
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
