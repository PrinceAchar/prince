"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function UnifiedLoginForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const errorMessages: Record<string, string> = {
    auth_init_failed: "Failed to start login. Please try again.",
    missing_params: "Invalid login response. Please try again.",
    invalid_state: "Login session expired. Please try again.",
    token_exchange_failed: "Login failed. Please try again.",
    login_required: "Please log in to continue.",
    client_id_missing: "Shopify client ID is not configured. Please check your environment variables.",
  };

  return (
    <div className="min-h-screen bg-yellow flex items-center justify-center px-4">
      <div className="w-full max-w-[400px]">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-heading text-[32px] md:text-[40px] font-bold text-brand-black">
            Prince Achar
          </h1>
          <p className="text-[14px] text-brand-black/60 mt-2">
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8">
          {error && (
            <div className="mb-6 p-3 bg-red/10 border border-red/20 rounded-lg text-[13px] text-red">
              {errorMessages[error] || "Something went wrong. Please try again."}
            </div>
          )}

          <p className="text-[14px] text-brand-black/70 mb-6 leading-relaxed">
            Sign in to access your account, view orders, and manage your information.
          </p>

          <a
            href="/api/auth/login/unified"
            className="block w-full py-3.5 bg-red text-white text-[14px] font-semibold uppercase tracking-[1px] text-center rounded-lg hover:bg-red-90 transition-colors"
          >
            Sign In with Shopify
          </a>
          
          <div className="mt-6 text-center">
            <p className="text-[12px] text-gray">
              By signing in, you agree to our terms and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function UnifiedLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-yellow flex items-center justify-center">
          <div className="text-[14px] text-brand-black/50">Loading...</div>
        </div>
      }
    >
      <UnifiedLoginForm />
    </Suspense>
  );
}