"use client";

import Image from "next/image";
import { useContent } from "@/lib/content";

type Section = "achar" | "murabba" | "murabba-chutney";

export default function CollectionHero({ section }: { section: Section }) {
  const content = useContent();

  const data = section === "achar"
    ? content.achar.hero
    : section === "murabba"
    ? content.murabba.hero
    : content.murabba.chutney;

  const isChutney = section === "murabba-chutney";
  const headingTag = isChutney ? "h2" : "h1";

  return (
    <div
      className="relative w-full bg-yellow bg-cover bg-center aspect-[6/1] min-h-[200px] md:min-h-[280px]"
      style={{ backgroundImage: `url(${data.bannerUrl})` }}
    >
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 py-10">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-white/90 mb-3 md:mb-4">
          {data.label}
        </span>
        {headingTag === "h1" ? (
          <h1 className="font-heading text-[34px] md:text-[48px] lg:text-[56px] font-bold text-white mb-3 md:mb-5 leading-tight">
            {data.title}
          </h1>
        ) : (
          <h2 className="font-heading text-[28px] md:text-[38px] lg:text-[46px] font-bold text-white mb-3 md:mb-3 leading-tight">
            {data.title}
          </h2>
        )}
        <p className="text-[13px] md:text-[15px] lg:text-[16px] text-white/90 leading-[1.8] max-w-[600px] mx-auto">
          {data.description}
        </p>
      </div>
    </div>
  );
}
