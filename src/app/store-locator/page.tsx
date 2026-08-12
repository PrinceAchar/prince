import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Store Locator | Prince Achar",
  description: "Visit the legendary Prince Achar store in Khari Baoli, Chandni Chowk, New Delhi.",
};

export default function StoreLocatorPage() {
  return (
    <main className="min-h-screen bg-[#FAF5E4] pt-[60px] md:pt-[70px]">
      <Navbar />

      <section className="relative w-full h-[30vh] md:h-[40vh] bg-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0 opacity-50">
          <Image
            src="/storefront.png"
            alt="Prince Achar Storefront in Old Delhi"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 shadow-sm">
            Our Heritage Store
          </h1>
          <p className="text-white/90 text-sm md:text-base max-w-lg mx-auto">
            Experience the vibrant colors and authentic aromas of traditional Indian pickles at our historic Khari Baoli location.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 px-6">
        <div className="max-w-[1000px] mx-auto bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="text-red font-semibold uppercase tracking-wider text-[11px] mb-2">Visit Us</span>
            <h2 className="font-heading text-3xl font-bold text-brand-black mb-6">
              Prince Achar & Murabba
            </h2>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <svg className="w-6 h-6 text-yellow flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-brand-black mb-1">Address</h3>
                  <p className="text-gray text-sm leading-relaxed">
                    Shop No. 6673, Khari Baoli Road, Fatehpuri<br />
                    Chandni Chowk<br />
                    New Delhi - 110006
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <svg className="w-6 h-6 text-yellow flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                <div>
                  <h3 className="font-semibold text-brand-black mb-1">Hours</h3>
                  <p className="text-gray text-sm leading-relaxed">
                    Monday - Saturday: 10:00 AM - 8:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href="https://www.google.com/maps/search/?api=1&query=Prince+Achar+Khari+Baoli+Chandni+Chowk+Delhi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red text-white text-[12px] font-semibold uppercase tracking-wider rounded-full hover:bg-red-dark transition-colors"
              >
                <span>Get Directions</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 relative min-h-[300px] md:min-h-full">
            <Image
              src="/storefront.png"
              alt="Prince Achar Store Details"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
