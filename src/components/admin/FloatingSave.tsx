"use client";

import { useState } from "react";

interface FloatingSaveProps {
  onSave: () => Promise<void>;
  onReset?: () => Promise<void>;
}

export default function FloatingSave({ onSave, onReset }: FloatingSaveProps) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  const handleSave = async () => {
    setState("saving");
    try {
      await onSave();
      setState("saved");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      setState("error");
      setTimeout(() => setState("idle"), 3000);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <div className="max-w-[600px] mx-auto flex gap-2 pointer-events-auto">
        {onReset && (
          <button
            onClick={onReset}
            className="px-4 py-3 bg-white border border-brand-black/15 text-brand-black text-[12px] font-medium rounded-xl hover:bg-brand-black/5 transition-colors shadow-lg"
          >
            Reset to Defaults
          </button>
        )}
        <button
          onClick={handleSave}
          disabled={state === "saving"}
          className={`flex-1 py-3 rounded-xl text-[13px] font-semibold uppercase tracking-[1px] transition-all shadow-lg ${
            state === "saved"
              ? "bg-green-600 text-white"
              : state === "error"
              ? "bg-red text-white"
              : state === "saving"
              ? "bg-brand-black/70 text-white"
              : "bg-red hover:bg-red-dark text-white"
          }`}
        >
          {state === "saving" && (
            <span className="inline-flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </span>
          )}
          {state === "saved" && "Saved ✓"}
          {state === "error" && "Error — try again"}
          {state === "idle" && "Save All Changes"}
        </button>
      </div>
    </div>
  );
}
