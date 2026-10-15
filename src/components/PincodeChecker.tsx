"use client";

import { useState } from "react";
import { useContent } from "@/lib/content";
import { defaultContent } from "@/lib/content-defaults";

// Pincode prefixes treated as the faster metro lane:
// 1 = Delhi NCR, 4 = Mumbai, 5 = Bangalore/Hyderabad, 6 = Chennai, 70/71 = Kolkata
const METRO_PREFIXES = ["1", "4", "5", "6", "70", "71"];

function deliveryByDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" });
}

export default function PincodeChecker() {
  const content = useContent();
  const cfg = content.products.pincode ?? defaultContent.products.pincode;

  const [pincode, setPincode] = useState("");
  const [checked, setChecked] = useState<{ days: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!cfg.enabled) return null;

  const handleCheck = () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      setChecked(null);
      return;
    }
    setError(null);
    const days = METRO_PREFIXES.some((p) => pincode.startsWith(p))
      ? cfg.metroDays
      : cfg.standardDays;
    setChecked({ days });
  };

  return (
    <div className="mb-6 rounded-2xl border border-brand-black/10 p-4">
      <span className="mb-3 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[2px] text-red">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
        {cfg.title}
      </span>

      <div className="flex items-center gap-2">
        <input
          type="text"
          inputMode="numeric"
          maxLength={6}
          placeholder="Enter 6-digit pincode"
          value={pincode}
          onChange={(e) => {
            setPincode(e.target.value.replace(/\D/g, "").slice(0, 6));
            setError(null);
          }}
          className="min-w-0 flex-1 rounded-full border border-brand-black/15 px-4 py-2.5 text-[13px] text-brand-black outline-none transition-colors placeholder:text-gray/60 focus:border-red/50 focus:ring-2 focus:ring-red/15"
        />
        <button
          type="button"
          onClick={handleCheck}
          className="rounded-full bg-red px-5 py-2.5 text-[12px] font-semibold uppercase tracking-wider text-white transition-colors hover:bg-red-dark"
        >
          Check
        </button>
      </div>

      {error && <p className="mt-2.5 text-[12px] text-red">{error}</p>}

      {checked && (
        <div className="mt-3.5 space-y-1.5 border-t border-brand-black/10 pt-3.5">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-brand-black">
            <svg className="w-4 h-4 shrink-0 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Delivery by {deliveryByDate(checked.days + 2)}
          </p>
          <p className="text-[12px] text-gray">
            Estimated delivery in {checked.days}&ndash;{checked.days + 2} business days to pincode {pincode}
          </p>
          {cfg.codAvailable && <p className="text-[12px] text-gray">{cfg.codMessage}</p>}
          {cfg.note.trim() && <p className="text-[12px] text-gray">{cfg.note}</p>}
        </div>
      )}
    </div>
  );
}
