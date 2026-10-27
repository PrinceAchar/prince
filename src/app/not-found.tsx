import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <main className="pt-[60px] md:pt-[70px] bg-yellow">
        <div className="max-w-[600px] mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
            Page Not Found
          </span>
          <h1 className="font-heading text-[40px] md:text-[56px] font-bold text-brand-black leading-tight mb-4">
            404
          </h1>
          <p className="text-[14px] md:text-[15px] text-gray max-w-[420px] mx-auto leading-relaxed mb-8">
            The page you are looking for has moved or no longer exists. Try one
            of these instead:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 bg-red text-white text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red-dark transition-colors"
            >
              Home
            </Link>
            <Link
              href="/achar"
              className="px-6 py-2.5 border border-brand-black/15 text-brand-black text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-brand-black/5 transition-colors"
            >
              Pickles
            </Link>
            <Link
              href="/murabba"
              className="px-6 py-2.5 border border-brand-black/15 text-brand-black text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-brand-black/5 transition-colors"
            >
              Murabba &amp; Chutney
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
