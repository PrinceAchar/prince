"use client";

import type { HistorySnapshot } from "@/lib/content-history";

/* ─── Reset confirmation ─────────────────────────────────────────────── */

interface ResetConfirmProps {
  open: boolean;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ResetConfirmDialog({ open, busy, onCancel, onConfirm }: ResetConfirmProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={busy ? undefined : onCancel} />
      <div className="relative w-full max-w-[420px] bg-surface rounded-2xl border border-brand-black/10 shadow-xl p-6">
        <h2 className="font-heading text-[20px] font-bold text-brand-black mb-2">
          Reset everything to defaults?
        </h2>
        <p className="text-[13px] text-gray leading-relaxed mb-4">
          This replaces <strong>all site content</strong> — homepage, banners, FAQ, contact
          details, footer — with the factory defaults, including any unsaved edits.
        </p>
        <p className="text-[12px] text-green mb-5">
          ✓ The current live content is saved to History first, so this can be undone.
        </p>
        <div className="flex gap-2 justify-end">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="px-4 py-2.5 border border-brand-black/15 text-brand-black text-[12px] font-medium rounded-xl hover:bg-brand-black/5 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="px-4 py-2.5 bg-red hover:bg-red-dark text-white text-[12px] font-semibold rounded-xl transition-colors disabled:opacity-50"
          >
            {busy ? "Resetting..." : "Yes, reset everything"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Version history ────────────────────────────────────────────────── */

interface HistoryProps {
  open: boolean;
  snapshots: HistorySnapshot[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
  onRestore: (snapshot: HistorySnapshot) => void;
}

export function HistoryDialog({ open, snapshots, loading, error, onClose, onRestore }: HistoryProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-[480px] max-h-[80vh] bg-surface rounded-2xl border border-brand-black/10 shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-brand-black/10">
          <div>
            <h2 className="font-heading text-[18px] font-bold text-brand-black">Version History</h2>
            <p className="text-[12px] text-gray">Restore a previous version, then press Save to publish it.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray hover:text-brand-black transition-colors"
            aria-label="Close history"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto p-4 space-y-2">
          {loading && (
            <div className="py-8 flex justify-center">
              <div className="w-6 h-6 border-2 border-red border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {error && (
            <div className="p-3 bg-red/10 border border-red/20 rounded-lg">
              <p className="text-[12px] text-red leading-relaxed">{error}</p>
            </div>
          )}

          {!loading && !error && snapshots.length === 0 && (
            <p className="text-[13px] text-gray text-center py-6">
              No history yet — snapshots are created every time you save or reset.
            </p>
          )}

          {snapshots.map((snap) => (
            <div
              key={snap.id}
              className="flex items-center justify-between gap-3 p-3 bg-yellow/50 border border-brand-black/10 rounded-xl"
            >
              <div className="min-w-0">
                <p className="text-[13px] font-medium text-brand-black">
                  {new Date(snap.savedAt).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
                <p className="text-[11px] text-gray truncate">by {snap.savedBy}</p>
              </div>
              <button
                type="button"
                onClick={() => onRestore(snap)}
                className="flex-shrink-0 px-3 py-1.5 border border-brand-black/15 text-brand-black text-[11px] font-semibold rounded-lg hover:bg-brand-black/5 transition-colors"
              >
                Restore
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
