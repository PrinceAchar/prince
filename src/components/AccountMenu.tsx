"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/check", { method: "GET" })
      .then((res) => setIsLoggedIn(res.ok))
      .catch(() => setIsLoggedIn(false));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    setIsLoggedIn(false);
    setOpen(false);
    router.push("/");
    router.refresh();
  };

  if (isLoggedIn === null) {
    return (
      <span className="w-5 h-5 flex items-center justify-center">
        <svg className="animate-spin h-4 w-4 text-[#C21A33]" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </span>
    );
  }

  if (!isLoggedIn) {
    return (
      <a href="/account/login" className="text-[#C21A33] hover:opacity-70 transition-opacity">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </a>
    );
  }

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-[#C21A33] hover:opacity-70 transition-opacity"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.12)] py-2 z-[1001]">
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              router.push("/account");
            }}
            className="block w-full text-left px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#FAF5E4] transition-colors"
          >
            My Account
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              router.push("/account/orders");
            }}
            className="block w-full text-left px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#FAF5E4] transition-colors"
          >
            My Orders
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(false);
              router.push("/account/addresses");
            }}
            className="block w-full text-left px-4 py-2.5 text-[13px] text-[#1A1A1A] hover:bg-[#FAF5E4] transition-colors"
          >
            Addresses
          </button>
          <hr className="my-1 border-[#1A1A1A]/5" />
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full text-left px-4 py-2.5 text-[13px] text-[#C21A33] hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {loading ? "Signing out..." : "Sign out"}
          </button>
        </div>
      )}
    </div>
  );
}
