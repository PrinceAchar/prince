"use client";

import { useState } from "react";
import { getClientAuth } from "@/lib/firebase";
import { sendSignInLinkToEmail, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

  const handleEmailLogin = async (e: React.FormEvent) => {
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

  const handleGoogleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const auth = getClientAuth();
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });
      await signInWithPopup(auth, provider);
    } catch (err) {
      if (err instanceof Error && !err.message.includes("popup-closed")) {
        setError(err.message || "Google sign-in failed");
      }
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
          <>
            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 bg-white border border-brand-black/15 text-brand-black text-[13px] font-medium rounded-xl py-3.5 transition-colors hover:bg-[#FAF5E4]/50 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4 my-5">
              <span className="flex-1 h-px bg-brand-black/10" />
              <span className="text-[11px] text-gray uppercase tracking-wider">or</span>
              <span className="flex-1 h-px bg-brand-black/10" />
            </div>

            {/* Email Login */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
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
            </form>
          </>
        )}

        {!sent && (
          <p className="text-[11px] text-gray text-center mt-5">
            Email login: you&apos;ll receive a one-time link — no password needed.
          </p>
        )}
      </div>
    </div>
  );
}
