"use client";

import { useState } from "react";
import { getClientAuth } from "@/lib/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

const actionCodeSettings = {
  get url() {
    return typeof window !== "undefined" ? `${window.location.origin}/admin` : "/admin";
  },
  handleCodeInApp: true,
};

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const auth = getClientAuth();
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("adminEmail", email);
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send login email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF5E4] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl border border-brand-black/10 shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="font-heading text-[28px] font-bold text-brand-black mb-2">
            Prince Achar
          </h1>
          <p className="text-[13px] text-gray">Admin Panel</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <h2 className="font-heading text-[20px] font-bold text-brand-black mb-2">
              Check your email
            </h2>
            <p className="text-[13px] text-gray leading-relaxed">
              We sent a login link to <strong>{email}</strong>. Click the link in the email to access the admin panel.
            </p>
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-[#FAF5E4]/50 border border-brand-black/12 rounded-xl text-[14px] text-brand-black placeholder:text-gray/70 outline-none focus:border-red/50 focus:ring-2 focus:ring-red/15 transition-colors"
              />
            </div>

            {error && (
              <p className="text-[12px] text-red">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red hover:bg-red-dark text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-xl py-3.5 transition-colors disabled:opacity-50"
            >
              {loading ? "Sending..." : "Continue with Email"}
            </button>

            <p className="text-[11px] text-gray text-center">
              You&apos;ll receive a one-time login link. No password needed.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
