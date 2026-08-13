import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroDialog from "@/components/HeroDialog";
import VideoPlayer from "@/components/VideoPlayer";
import AwardsCarousel from "@/components/AwardsCarousel";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar className="animate-slide-in-down" />

      {/* HERO */}
      <section id="home" className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="relative w-full aspect-[16/9] overflow-hidden animate-fade-in-up">
          <Image
            src="/hero.png"
            alt="Prince Achar Hero"
            fill
            priority
            sizes="100vw"
            className="object-cover animate-hero-image"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-transparent" />
          <HeroDialog />
        </div>

        {/* Marquee */}
        <div className="bg-red py-3 md:py-[14px] overflow-hidden">
          <div className="flex w-max animate-[marquee-scroll_20s_linear_infinite]">
            {["FREE DELIVERY ON ORDERS ABOVE \u20B9500", "HANDMADE IN DELHI SINCE 1980", "100% NATURAL INGREDIENTS"].map((text, i) => (
              <span key={i} className="text-[11px] md:text-[13px] font-semibold text-white uppercase tracking-[2px] whitespace-nowrap px-8 md:px-[60px]">
                {text}
              </span>
            ))}
            {["FREE DELIVERY ON ORDERS ABOVE \u20B9500", "HANDMADE IN DELHI SINCE 1980", "100% NATURAL INGREDIENTS"].map((text, i) => (
              <span key={`dup-${i}`} className="text-[11px] md:text-[13px] font-semibold text-white uppercase tracking-[2px] whitespace-nowrap px-8 md:px-[60px]">
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section id="story" className="bg-white animate-fade-in-up">
        <div className="flex flex-col md:flex-row">
          {/* Mobile: image first */}
          <div className="md:hidden px-6 pt-12 pb-2">
            <Image
              src="/about-us.jpg"
              alt="Our Story"
              width={800}
              height={800}
              className="w-[75%] mx-auto max-w-[300px] aspect-square object-cover rounded-lg animate-fade-in-up"
            />
          </div>

          {/* Text */}
          <div className="flex-1 py-12 md:py-16 px-6 md:px-16 lg:pl-[120px] lg:pr-12 text-center md:text-left">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
              About Us
            </span>
            <h2 className="font-heading text-[28px] md:text-[34px] lg:text-[38px] font-bold text-brand-black mb-5 md:mb-7 leading-tight">
              A Legacy of Taste. A Tradition of Excellence.
            </h2>
            <p className="text-[14px] md:text-[15px] text-gray leading-[1.8] mb-4 md:mb-5">
              Since 1980, Prince Achar has been dedicated to preserving the rich heritage of Indian
              flavors through products crafted with authenticity, care, and uncompromising
              quality. What began as a passion for traditional recipes has evolved into a trusted
              brand, loved for its exceptional taste and consistency across generations.
            </p>
            <p className="text-[14px] md:text-[15px] text-gray leading-[1.8] mb-4 md:mb-5">
              Our portfolio features a thoughtfully curated range of premium pickles, murabbas,
              fruit candies, and ingredients for plum cakes. Each product is prepared using carefully
              selected ingredients, ensuring the perfect balance of tradition, flavor, and quality.
            </p>
            <p className="text-[14px] md:text-[15px] text-gray leading-[1.8] mb-4 md:mb-5">
              At Prince Achar, we believe that great taste is timeless. By blending traditional
              craftsmanship with modern production standards, we deliver products that meet the
              expectations of today&apos;s consumers while retaining the authenticity that defines our
              legacy.
            </p>
            <p className="text-[14px] md:text-[15px] text-gray leading-[1.8]">
              As we continue to grow, we remain committed to building strong and lasting
              partnerships with distributors, retailers, and food businesses, bringing the finest
              flavors of India to every table.
            </p>
            <p className="text-[14px] md:text-[15px] text-red font-semibold mt-4 md:mt-5 italic">
              A Promise of Quality. Prince Achar — Celebrating Authentic Flavors Since 1980.
            </p>
          </div>

          {/* Desktop: image right, edge-to-edge */}
          <div className="hidden md:block relative w-[35%] animate-fade-in-up">
            <Image
              src="/about-us.jpg"
              alt="Our Story"
              fill
              sizes="35vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <AwardsCarousel className="animate-fade-in-up" />

      {/* VIDEO */}
      <section id="video" className="py-12 md:py-[100px] px-6 md:px-16 lg:px-[60px] bg-white animate-fade-in-up">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] max-w-[1200px] mx-auto items-center">
          <div className="w-full max-w-[300px] md:max-w-none md:w-[320px] rounded-lg overflow-hidden animate-fade-in-up">
            <VideoPlayer />
          </div>
          <div className="flex-1 text-center md:text-left animate-fade-in-up">
            <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
              Watch Our Story
            </span>
            <h2 className="font-heading text-[28px] md:text-[32px] lg:text-[36px] font-bold text-brand-black mb-4 md:mb-5 leading-tight">
              Crafting Tradition,<br className="hidden md:block" /> One Jar at a Time
            </h2>
            <p className="text-[14px] md:text-[15px] text-gray leading-[1.8] mb-6 md:mb-7">
              Go behind the scenes and see how Prince Achar brings the rich heritage of Delhi&apos;s
              pickle-making tradition to your table. From sourcing the finest mangoes to the final
              seal of every jar, witness the passion and dedication that goes into every batch.
            </p>
            <a
              href="#shop"
              className="inline-block px-6 md:px-8 py-2.5 md:py-3 border-2 border-red text-red text-[12px] md:text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red hover:text-white transition-colors hover:scale-105 animate-fade-in-scale"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}