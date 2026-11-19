"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CONSENT_SETTINGS_EVENT,
  getConsentChoice,
  saveConsentChoice,
  type ConsentChoice,
} from "@/lib/consent";

/** The banner is a short-lived hint: ignoring it leaves consent denied. */
const AUTO_DISMISS_MS = 10_000;

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  useEffect(() => {
    if (!isVisible) return;
    dismissTimer.current = setTimeout(() => setIsVisible(false), AUTO_DISMISS_MS);
    return () => {
      if (dismissTimer.current) clearTimeout(dismissTimer.current);
    };
  }, [isVisible]);

  const decide = (choice: ConsentChoice) => {
    if (dismissTimer.current) clearTimeout(dismissTimer.current);
    saveConsentChoice(choice);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie preferences"
      className="fixed bottom-3 left-1/2 z-[1200] w-[calc(100%-1.5rem)] max-w-[640px] -translate-x-1/2 rounded-xl border border-brand-black/10 bg-white/95 px-4 py-2 text-[11px] leading-tight shadow-[0_6px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
        <p className="text-gray">
          We use optional cookies for analytics.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-brand-black">
            Privacy
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={() => decide("denied")}
            className="uppercase tracking-wide text-brand-black/70 transition-colors hover:text-brand-black"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => decide("granted")}
            className="rounded-full bg-brand-black/5 px-3 py-1 uppercase tracking-wide text-brand-black transition-colors hover:bg-brand-black/10"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
