"use client";

import { useState } from "react";

interface FloatingSaveProps {
  onSave: () => Promise<void>;
  onReset?: () => void | Promise<void>;
  onHistory?: () => void;
  /** True when there are edits that haven't been published yet. */
  dirty?: boolean;
}

export default function FloatingSave({ onSave, onReset, onHistory, dirty = true }: FloatingSaveProps) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const clean = !dirty && state === "idle";

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
      <div className="max-w-[600px] mx-auto pointer-events-auto space-y-2">
        {dirty && (
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 bg-black/70 text-white text-[11px] font-medium px-3 py-1 rounded-full shadow-lg">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623]" />
              Unsaved changes
            </span>
          </div>
        )}
        <div className="flex gap-2">
          {onHistory && (
            <button
              onClick={onHistory}
              className="px-4 py-3 bg-surface border border-brand-black/15 text-brand-black text-[12px] font-medium rounded-xl hover:bg-brand-black/5 transition-colors shadow-lg"
            >
              History
            </button>
          )}
          {onReset && (
            <button
              onClick={onReset}
              className="px-4 py-3 bg-surface border border-brand-black/15 text-brand-black text-[12px] font-medium rounded-xl hover:bg-brand-black/5 transition-colors shadow-lg"
            >
              Reset
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={state === "saving" || clean}
            className={`flex-1 py-3 rounded-xl text-[13px] font-semibold uppercase tracking-[1px] transition-all shadow-lg ${
              state === "saved"
                ? "bg-green-600 text-white"
                : state === "error"
                ? "bg-red text-white"
                : state === "saving"
                ? "bg-black/70 text-white"
                : clean
                ? "bg-brand-black/10 text-gray cursor-default"
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
            {state === "idle" && (clean ? "All changes saved" : "Save All Changes")}
          </button>
        </div>
      </div>
    </div>
  );
}
