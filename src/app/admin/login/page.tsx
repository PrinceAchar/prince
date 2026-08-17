"use client";

import { useState } from "react";
import { getClientAuth } from "@/lib/firebase";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const auth = getClientAuth();
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("invalid-credential") || err.message.includes("wrong-password")) {
          setError("Invalid email or password");
        } else if (err.message.includes("user-not-found")) {
          setError("No account found with this email");
        } else {
          setError(err.message);
        }
      } else {
        setError("Login failed");
      }
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

        {/* Email/Password Login */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="block text-[12px] font-medium text-brand-black mb-1.5">
              Email
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

          <div>
            <label className="block text-[12px] font-medium text-brand-black mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
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
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
