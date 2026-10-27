"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getClientAuth } from "@/lib/firebase";
import { onAuthStateChanged, type User } from "firebase/auth";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Homepage", href: "/admin#homepage" },
  { label: "Collections", href: "/admin#collections" },
  { label: "Contact & FAQ", href: "/admin#contact" },
  { label: "Footer", href: "/admin#footer" },
  { label: "Products", href: "/admin#products" },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const isDev = process.env.NODE_ENV === "development";
  const needsAuth = pathname !== "/admin/login" && !isDev;

  useEffect(() => {
    if (!needsAuth) return;

    const auth = getClientAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthResolved(true);
      if (!u) {
        router.push("/admin/login");
      }
    });
    return unsub;
  }, [needsAuth, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const loading = needsAuth && !authResolved;

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-red border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user && !isDev) return null;

  return (
    <div className="min-h-screen bg-yellow">
      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 h-14 bg-surface border-b border-brand-black/10 flex items-center justify-between px-4 md:px-6 z-50">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-brand-black"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <Link href="/admin" className="font-heading text-[18px] font-bold text-brand-black">
            Prince Achar <span className="text-[12px] font-normal text-gray">Admin</span>
          </Link>
        </div>
        <div className="flex items-center gap-3">
          {user?.displayName && (
            <span className="text-[12px] text-gray hidden sm:inline">{user.displayName}</span>
          )}
          <Link
            href="/"
            target="_blank"
            className="text-[12px] text-gray hover:text-brand-black transition-colors"
          >
            View Site
          </Link>
          {user?.photoURL && (
            <img
              src={user.photoURL}
              alt=""
              className="w-7 h-7 rounded-full border border-brand-black/10"
              referrerPolicy="no-referrer"
            />
          )}
          <button
            onClick={() => getClientAuth().signOut()}
            className="text-[12px] text-red hover:text-red-dark transition-colors font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Sidebar (mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setSidebarOpen(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <nav
            className="absolute left-0 top-14 bottom-0 w-64 bg-surface border-r border-brand-black/10 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="block px-3 py-2.5 text-[13px] text-brand-black/70 hover:text-brand-black hover:bg-yellow/50 rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main content */}
      <main className="pt-14 pb-20 md:pb-8">
        {children}
      </main>
    </div>
  );
}
