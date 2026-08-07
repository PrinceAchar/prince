import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    name: "Mango Pickle (Aam ka Achar)",
    desc: "Raw mango pieces marinated in mustard oil, red chili, and fenugreek — the quintessential Delhi-style pickle.",
    spice: "Medium",
    weight: "500g / 1kg",
  },
  {
    name: "Lemon Pickle (Nimbu ka Achar)",
    desc: "Tangy lemon rinds cured with salt, mustard seeds, and turmeric. A burst of citrus in every bite.",
    spice: "Mild",
    weight: "500g / 1kg",
  },
  {
    name: "Mixed Pickle (Mix Achar)",
    desc: "A medley of mango, lemon, carrot, and green chili — all pickled together in a rich blend of spices.",
    spice: "Medium",
    weight: "500g / 1kg",
  },
  {
    name: "Green Chili Pickle (Hari Mirch ka Achar)",
    desc: "Slit green chilies stuffed with mustard and lemon spice mix. Bold, fiery, and full of character.",
    spice: "Hot",
    weight: "500g / 1kg",
  },
  {
    name: "Carrot Pickle (Gajar ka Achar)",
    desc: "Crunchy carrot batons pickled with vinegar, mustard oil, and a hint of asafoetida.",
    spice: "Mild",
    weight: "500g / 1kg",
  },
  {
    name: "Garlic Pickle (Lehsun ka Achar)",
    desc: "Whole garlic cloves slow-cooked in spiced mustard oil with fenugreek and fennel seeds.",
    spice: "Medium",
    weight: "500g / 1kg",
  },
];

const spiceColors: Record<string, string> = {
  Mild: "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Hot: "bg-red-100 text-red-700",
};

export default function AcharPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
            Our Collection
          </span>
          <h1 className="font-heading text-[36px] md:text-[48px] lg:text-[56px] font-bold text-brand-black mb-5 leading-tight">
            Authentic Pickles
          </h1>
          <p className="text-[14px] md:text-[16px] text-gray leading-[1.8] max-w-[600px] mx-auto">
            Handcrafted in small batches using traditional Delhi recipes passed down since 1980.
            Every jar is a promise of purity, flavor, and heritage.
          </p>
        </div>
      </section>

      {/* PRODUCTS GRID */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className="group bg-yellow/50 rounded-xl overflow-hidden border border-brand-black/5 hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square bg-brand-black/5 flex items-center justify-center">
                  <Image
                    src="/logo.jpeg"
                    alt={product.name}
                    width={120}
                    height={120}
                    className="w-[100px] h-[100px] object-contain opacity-30 group-hover:opacity-50 transition-opacity"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${spiceColors[product.spice]}`}>
                      {product.spice}
                    </span>
                    <span className="text-[11px] text-gray">{product.weight}</span>
                  </div>
                  <h3 className="font-heading text-[17px] md:text-[18px] font-semibold text-brand-black mb-2">
                    {product.name}
                  </h3>
                  <p className="text-[13px] md:text-[14px] text-gray leading-relaxed">
                    {product.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-yellow py-12 md:py-16 text-center px-6">
        <h2 className="font-heading text-[26px] md:text-[30px] font-bold text-brand-black mb-4">
          Can&apos;t decide? Try our Mixed Pickle.
        </h2>
        <p className="text-[14px] text-gray mb-6 max-w-[500px] mx-auto">
          A curated blend of our finest pickles in one jar — the perfect way to experience the full range of Prince Achar.
        </p>
        <a
          href="#contact"
          className="inline-block px-8 py-3 border-2 border-red text-red text-[13px] font-semibold uppercase tracking-[1px] hover:bg-red hover:text-white transition-colors"
        >
          Get in Touch
        </a>
      </section>

      <Footer />
    </>
  );
}
