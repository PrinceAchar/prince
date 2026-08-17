"use client";

import Image from "next/image";
import { useContent } from "@/lib/content";
import type { ShopifyProduct } from "@/lib/shopify";
import HeroDialog from "./HeroDialog";
import VideoPlayer from "./VideoPlayer";
import AwardsCarousel from "./AwardsCarousel";
import BestsellersSection from "./BestsellersSection";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export default function HomepageContent({ bestsellers }: { bestsellers: ShopifyProduct[] }) {
  const content = useContent();
  const h = content.homepage;
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((i) => (i + 1) % h.hero.slides.length);
  }, [h.hero.slides.length]);

  useEffect(() => {
    if (h.hero.slides.length <= 1) return;
    const timer = setInterval(nextSlide, h.hero.autoPlayInterval);
    return () => clearInterval(timer);
  }, [nextSlide, h.hero.slides.length, h.hero.autoPlayInterval]);

  const slide = h.hero.slides[currentSlide] ?? h.hero.slides[0];

  return (
    <>
      {/* HERO */}
      <section id="home" className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="relative w-full aspect-[16/9] overflow-hidden animate-fade-in-up">
          {h.hero.slides.map((s, i) => (
            <div key={s.id} className={`absolute inset-0 transition-opacity duration-700 ${i === currentSlide ? "opacity-100" : "opacity-0"}`}>
              {s.link ? (
                <Link href={s.link} className="block w-full h-full">
                  <Image
                    src={s.imageUrl || "/hero.webp"}
                    alt={s.title || content.settings.siteName}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className="object-cover animate-hero-enter"
                  />
                </Link>
              ) : (
                <Image
                  src={s.imageUrl || "/hero.webp"}
                  alt={s.title || content.settings.siteName}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover animate-hero-enter"
                />
              )}
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />

          {/* Slide title/subtitle overlay */}
          {(slide?.title || slide?.subtitle) && (
            <div className="absolute inset-0 flex items-center justify-center text-center px-6">
              <div>
                {slide?.title && (
                  <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[64px] font-bold text-white mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                )}
                {slide?.subtitle && (
                  <p className="text-[14px] md:text-[18px] text-white/90 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Slide indicators */}
          {h.hero.slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {h.hero.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${i === currentSlide ? "bg-white" : "bg-white/40"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}

          <HeroDialog />
        </div>

        {/* Marquee */}
        <div className="bg-red py-3 md:py-[14px] overflow-hidden">
          <div className="flex w-max animate-[marquee-scroll_20s_linear_infinite]">
            {[...h.marquee.items, ...h.marquee.items].map((text, i) => (
              <span key={i} className="text-[11px] md:text-[13px] font-semibold text-white uppercase tracking-[2px] whitespace-nowrap px-8 md:px-[60px]">
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED BESTSELLERS */}
      <BestsellersSection products={bestsellers} />

      {/* OUR STORY */}
      <section id="story" className="bg-white animate-fade-in-up">
        <div className="flex flex-col md:flex-row">
          <div className="md:hidden px-6 pt-12 pb-2">
            <Image
              src={h.story.imageUrl || "/about-us.webp"}
              alt="Our Story"
              width={800}
              height={800}
              className="w-[75%] mx-auto max-w-[300px] aspect-square object-cover rounded-lg animate-fade-in-up"
            />
          </div>

          <div className="flex-1 py-12 md:py-16 px-6 md:px-16 lg:pl-[120px] lg:pr-12 text-center md:text-left">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
              {h.story.label}
            </span>
            <h2 className="font-heading text-[28px] md:text-[34px] lg:text-[38px] font-bold text-brand-black mb-5 md:mb-7 leading-tight">
              {h.story.heading}
            </h2>
            {h.story.paragraphs.map((p, i) => (
              <p key={i} className="text-[14px] md:text-[15px] text-gray leading-[1.8] mb-4 md:mb-5">
                {p}
              </p>
            ))}
            <p className="text-[14px] md:text-[15px] text-red font-semibold mt-4 md:mt-5 italic">
              {h.story.closingLine}
            </p>
          </div>

          <div className="hidden md:block relative w-[35%] animate-fade-in-up">
            <Image
              src={h.story.imageUrl || "/about-us.webp"}
              alt="Our Story"
              fill
              sizes="35vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <AwardsCarousel />

      {/* VIDEO */}
      <section id="video" className="py-12 md:py-[100px] px-6 md:px-16 lg:px-[60px] bg-white animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] max-w-[1200px] mx-auto items-center">
          <div className="w-full max-w-[300px] md:max-w-none md:w-[320px] rounded-lg overflow-hidden animate-fade-in-up">
            <VideoPlayer />
          </div>
          <div className="flex-1 text-center md:text-left animate-fade-in-up">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
              {h.video.label}
            </span>
            <h2 className="font-heading text-[28px] md:text-[32px] lg:text-[36px] font-bold text-brand-black mb-4 md:mb-5 leading-tight">
              {h.video.heading}
            </h2>
            <p className="text-[14px] md:text-[15px] text-gray leading-[1.8] mb-6 md:mb-7">
              {h.video.description}
            </p>
            <a
              href={h.video.ctaLink}
              className="inline-block px-6 md:px-8 py-2.5 md:py-3 border-2 border-red text-red text-[12px] md:text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red hover:text-white transition-colors hover:scale-105 animate-fade-in-scale"
            >
              {h.video.ctaText}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
