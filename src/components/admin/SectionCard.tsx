"use client";

import { useState, type ReactNode } from "react";

interface SectionCardProps {
  id: string;
  title: string;
  defaultOpen?: boolean;
  preview?: ReactNode;
  children: ReactNode;
}

export default function SectionCard({ id, title, defaultOpen = false, preview, children }: SectionCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div id={id} className="bg-white border border-brand-black/10 rounded-2xl overflow-hidden scroll-mt-20">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-yellow/30 transition-colors"
      >
        <h3 className="text-[14px] font-semibold text-brand-black">{title}</h3>
        <svg
          className={`w-5 h-5 text-gray transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {open && (
        <div className="px-5 pb-5 border-t border-brand-black/5">
          {preview && (
            <div className="mt-4 mb-4">
              <p className="text-[11px] font-medium text-gray uppercase tracking-wider mb-2">Preview</p>
              <div className="border border-brand-black/10 rounded-xl overflow-hidden bg-[#FAF5E4]">
                {preview}
              </div>
            </div>
          )}
          <div className="space-y-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

export function FieldGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-[12px] font-medium text-brand-black mb-1.5">{label}</label>
      {children}
    </div>
  );
}

export function TextInput({ value, onChange, placeholder, multiline }: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  const cls = "w-full px-3 py-2.5 bg-[#FAF5E4]/50 border border-brand-black/12 rounded-xl text-[13px] text-brand-black placeholder:text-gray/60 outline-none focus:border-red/50 focus:ring-2 focus:ring-red/15 transition-colors";
  if (multiline) {
    return <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={`${cls} min-h-[80px] resize-y`} />;
  }
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />;
}

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <div
        onClick={() => onChange(!checked)}
        className={`relative w-10 h-6 rounded-full transition-colors ${checked ? "bg-red" : "bg-brand-black/15"}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? "left-5" : "left-1"}`} />
      </div>
      <span className="text-[13px] text-brand-black">{label}</span>
    </label>
  );
}

export function ListEditor({ items, onChange, placeholder }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            type="text"
            value={item}
            onChange={(e) => {
              const next = [...items];
              next[i] = e.target.value;
              onChange(next);
            }}
            placeholder={placeholder}
            className="flex-1 px-3 py-2 bg-[#FAF5E4]/50 border border-brand-black/12 rounded-xl text-[13px] text-brand-black placeholder:text-gray/60 outline-none focus:border-red/50 transition-colors"
          />
          <button
            type="button"
            onClick={() => onChange(items.filter((_, j) => j !== i))}
            className="text-gray/40 hover:text-red transition-colors p-1"
            aria-label="Remove"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, ""])}
        className="text-[12px] font-medium text-red hover:text-red-dark transition-colors"
      >
        + Add Item
      </button>
    </div>
  );
}

export function FaqEditor({ items, onChange }: { items: { question: string; answer: string }[]; onChange: (v: { question: string; answer: string }[]) => void }) {
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="p-3 bg-[#FAF5E4]/50 border border-brand-black/10 rounded-xl space-y-2">
          <div className="flex items-start gap-2">
            <input
              type="text"
              value={item.question}
              onChange={(e) => {
                const next = [...items];
                next[i] = { ...next[i], question: e.target.value };
                onChange(next);
              }}
              placeholder="Question"
              className="flex-1 px-3 py-2 bg-white border border-brand-black/12 rounded-lg text-[13px] text-brand-black placeholder:text-gray/60 outline-none focus:border-red/50 transition-colors"
            />
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="text-gray/40 hover:text-red transition-colors p-1 mt-1"
              aria-label="Remove FAQ"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <textarea
            value={item.answer}
            onChange={(e) => {
              const next = [...items];
              next[i] = { ...next[i], answer: e.target.value };
              onChange(next);
            }}
            placeholder="Answer"
            className="w-full px-3 py-2 bg-white border border-brand-black/12 rounded-lg text-[13px] text-brand-black placeholder:text-gray/60 outline-none focus:border-red/50 transition-colors min-h-[60px] resize-y"
          />
        </div>
      ))}
      <button
        type="button"
        onClick={() => onChange([...items, { question: "", answer: "" }])}
        className="text-[12px] font-medium text-red hover:text-red-dark transition-colors"
      >
        + Add FAQ
      </button>
    </div>
  );
}
