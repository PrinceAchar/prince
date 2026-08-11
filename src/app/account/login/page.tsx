"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    auth_init_failed: "Failed to start login. Please try again.",
    missing_params: "Invalid login response. Please try again.",
    invalid_state: "Login session expired. Please try again.",
    token_exchange_failed: "Login failed. Please try again.",
    login_required: "Please log in to continue.",
  };

  return (
    <div className="min-h-screen bg-[#FAF5E4] flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-[32px] md:text-[40px] font-bold text-[#1A1A1A]">
            Prince Achar
          </h1>
          <p className="text-[14px] text-[#1A1A1A]/60 mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-red-700">
              {errorMessages[error] || "Something went wrong. Please try again."}
            </div>
          )}

          <p className="text-[14px] text-[#1A1A1A]/70 mb-6 leading-relaxed">
            We&apos;ll send you a one-time code to your email address. No password needed.
          </p>

          <a
            href="/api/auth/login"
            className="block w-full py-3.5 bg-[#C21A33] text-white text-[14px] font-semibold uppercase tracking-[1px] text-center rounded-lg hover:bg-[#C21A33]/90 transition-colors"
          >
            Continue with Email
          </a>
        </div>

        {/* Footer */}
        <p className="text-center text-[12px] text-[#1A1A1A]/40 mt-6">
          By signing in, you agree to our terms and privacy policy.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAF5E4] flex items-center justify-center">
          <div className="text-[14px] text-[#1A1A1A]/50">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
