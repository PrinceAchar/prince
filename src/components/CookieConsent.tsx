"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CONSENT_SETTINGS_EVENT,
  getConsentChoice,
  saveConsentChoice,
  type ConsentChoice,
} from "@/lib/consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Deferred so the client's first render matches the server's (no banner
    // in the SSR HTML) and so no state update happens synchronously here.
    queueMicrotask(() => {
      if (!getConsentChoice()) setIsVisible(true);
    });
    const reopen = () => setIsVisible(true);
    window.addEventListener(CONSENT_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_SETTINGS_EVENT, reopen);
  }, []);

  const decide = (choice: ConsentChoice) => {
    saveConsentChoice(choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-0 z-[1200] border-t border-brand-black/10 bg-white px-6 py-4 shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
    >
      <div className="mx-auto flex max-w-[1150px] flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="text-[13px] leading-relaxed text-brand-black">
          <p className="font-semibold">Your privacy matters.</p>
          <p className="text-gray">
            We use optional cookies for analytics and advertising. You can accept
            them or keep only the essentials. Read our{" "}
            <Link href="/privacy" className="text-red underline underline-offset-2">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="flex-1 rounded-full border border-brand-black/20 px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-brand-black transition-colors hover:bg-brand-black/5 md:flex-none"
          >
            Reject optional
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="flex-1 rounded-full bg-red px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-dark md:flex-none"
          >
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
