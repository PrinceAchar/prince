import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const products = [
  {
    name: "Amla Murabba",
    desc: "Whole Indian gooseberries slow-cooked in sugar syrup with cardamom and saffron. A traditional tonic for immunity and taste.",
    origin: "Classic",
  },
  {
    name: "Apple Murabba",
    desc: "Tender apple halves simmered in saffron-infused syrup. Soft, fragrant, and indulgent.",
    origin: "Premium",
  },
  {
    name: "Guava Murabba",
    desc: "Ripe guava pieces cooked with sugar, cinnamon, and cloves. A sweet-tart delight.",
    origin: "Classic",
  },
  {
    name: "Carrot Murabba (Gajar ka Murabba)",
    desc: "Long carrot strands slow-cooked in cardamom syrup. A winter favorite across North India.",
    origin: "Classic",
  },
  {
    name: "Petha Murabba",
    desc: "Ash gourd cubes soaked in rose-water syrup. Light, refreshing, and subtly floral.",
    origin: "Specialty",
  },
  {
    name: "Mango Murabba",
    desc: "Raw mango slices cooked in jaggery and fennel syrup — a tangy-sweet masterpiece.",
    origin: "Seasonal",
  },
];

const originColors: Record<string, string> = {
  Classic: "bg-brand-black/10 text-brand-black",
  Premium: "bg-yellow text-red",
  Specialty: "bg-red/10 text-red",
  Seasonal: "bg-green-100 text-green-700",
};

export default function MurabbaPage() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <section className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[1200px] mx-auto px-6 py-16 md:py-24 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
            Sweet Preserves
          </span>
          <h1 className="font-heading text-[36px] md:text-[48px] lg:text-[56px] font-bold text-brand-black mb-5 leading-tight">
            Murabbas
          </h1>
          <p className="text-[14px] md:text-[16px] text-gray leading-[1.8] max-w-[600px] mx-auto">
            Slow-cooked fruit preserves made with time-honored recipes. Each murabba is a
            labor of love — simmered to perfection and sealed with tradition.
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
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${originColors[product.origin]}`}>
                      {product.origin}
                    </span>
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
          Looking for something sweet and traditional?
        </h2>
        <p className="text-[14px] text-gray mb-6 max-w-[500px] mx-auto">
          Our murabbas make perfect gifts and festive treats. Reach out for bulk orders and custom assortments.
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
