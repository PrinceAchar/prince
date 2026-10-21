"use client";

import { useContent } from "@/lib/content";

type Section = "achar" | "murabba" | "murabba-chutney";

export default function CollectionHero({ section }: { section: Section }) {
  const content = useContent();

  const data = section === "achar"
    ? content.achar.hero
    : section === "murabba"
    ? content.murabba.hero
    : content.murabba.chutney;

  const Heading = section === "murabba-chutney" ? "h2" : "h1";

  return (
    <>
      <Heading className="sr-only">{data.title}</Heading>
      <div className="w-full bg-yellow">
        <img
          src={data.bannerUrl}
          alt={data.title}
          className="block w-full h-auto"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </>
  );
}
