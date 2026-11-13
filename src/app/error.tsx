"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surfaces in the browser console and Vercel runtime logs.
    console.error("[princeachar] route error:", error);
  }, [error]);

  return (
    <main id="main-content" className="min-h-screen bg-yellow flex items-center justify-center px-6 py-24">
      <div className="max-w-[560px] text-center">
        <span className="inline-block text-[11px] font-semibold uppercase tracking-[3px] text-red mb-4">
          Something went wrong
        </span>
        <h1 className="font-heading text-[32px] md:text-[44px] font-bold text-brand-black leading-tight mb-4">
          We couldn&apos;t load this page
        </h1>
        <p className="text-[14px] md:text-[15px] text-gray leading-relaxed mb-8">
          This is usually temporary. Try again, or head back to the shop while we
          sort it out.
        </p>

        {error.digest && (
          <p className="text-[11px] text-gray/70 mb-6 font-mono">
            Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="px-6 py-2.5 bg-red text-white text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red-dark transition-colors"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 border border-brand-black/15 text-brand-black text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-brand-black/5 transition-colors"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 border border-brand-black/15 text-brand-black text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-brand-black/5 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
