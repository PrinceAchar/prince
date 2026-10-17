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
      <div
        role="img"
        aria-label={data.title}
        className="w-full bg-yellow bg-cover bg-center aspect-[6/1] min-h-[200px] md:min-h-[280px]"
        style={{ backgroundImage: `url("${data.bannerUrl}")` }}
      />
    </>
  );
}
