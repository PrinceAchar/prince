import Navbar from "@/components/Navbar";
import HeroDialog from "@/components/HeroDialog";
import VideoPlayer from "@/components/VideoPlayer";
import AwardsCarousel from "@/components/AwardsCarousel";

export default function Home() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section id="home" className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="relative w-full aspect-[16/9] overflow-hidden">
          <img
            src="/hero.png"
            alt="Prince Achar Hero"
            className="w-full h-full object-cover"
          />
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
      <section id="story" className="py-12 md:py-16 px-6 md:px-16 lg:px-[120px] bg-white">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] max-w-[1200px] mx-auto items-stretch">
          <div className="flex-1">
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
          <div className="flex-none w-full md:w-[450px] lg:w-[550px]">
            <img
              src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&h=1067&fit=crop"
              alt="Our Story"
              className="w-full aspect-[3/4] object-cover"
            />
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <AwardsCarousel />

      {/* VIDEO */}
      <section id="video" className="py-12 md:py-[100px] px-6 md:px-16 lg:px-[60px] bg-white">
        <div className="flex flex-col md:flex-row gap-8 md:gap-[60px] max-w-[1200px] mx-auto items-center">
          <div className="w-full max-w-[300px] md:max-w-none md:w-[320px] rounded-lg overflow-hidden">
            <VideoPlayer />
          </div>
          <div className="flex-1 text-center md:text-left">
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
              className="inline-block px-6 md:px-8 py-2.5 md:py-3 border-2 border-red text-red text-[12px] md:text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red hover:text-white transition-colors"
            >
              Shop Now
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-yellow text-brand-black pt-10 md:pt-[60px]">
        <div className="flex flex-col md:flex-row flex-wrap md:justify-between gap-8 md:gap-10 max-w-[1200px] mx-auto pb-10 md:pb-12 border-b border-brand-black/10 px-6">
          <div className="max-w-[280px]">
            <div className="mb-3">
              <img src="/logo.jpeg" alt="Prince Achar" className="h-16 md:h-20 w-auto object-contain rounded-full" />
            </div>
            <p className="text-[13px] md:text-[14px] text-brand-black/60 leading-relaxed">
              Authentic Delhi flavors, handcrafted with love since 1980.
            </p>
          </div>
          <div>
            <h4 className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[1.5px] mb-4 md:mb-5 text-red">
              Quick Links
            </h4>
            <a href="#home" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">Home</a>
            <a href="#achar" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">Achar</a>
            <a href="#murabba" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">Murabba</a>
            <a href="#contact" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">Contact</a>
          </div>
          <div>
            <h4 className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[1.5px] mb-4 md:mb-5 text-red">
              Support
            </h4>
            <a href="#faq" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">FAQ</a>
            <a href="#shipping" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">Shipping</a>
            <a href="#returns" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">Returns</a>
            <a href="#privacy" className="block text-[13px] md:text-[14px] text-brand-black/60 mb-2 md:mb-[10px] hover:text-brand-black transition-colors">Privacy Policy</a>
          </div>
          <div>
            <h4 className="text-[12px] md:text-[13px] font-semibold uppercase tracking-[1.5px] mb-4 md:mb-5 text-red">
              Follow Us
            </h4>
            <div className="flex gap-4">
              <a href="#" className="text-brand-black/60 hover:text-red transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-brand-black/60 hover:text-red transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="text-brand-black/60 hover:text-red transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="text-brand-black/60 hover:text-red transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto py-5 md:py-6 text-center px-6">
          <p className="text-[11px] md:text-[12px] text-brand-black/40">&copy; 2025 Prince Achar. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
