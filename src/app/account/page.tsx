"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Customer {
  firstName: string;
  lastName: string;
  emailAddress: { emailAddress: string };
  phone: string | null;
  orders: { edges: { node: unknown }[] };
  addresses: { edges: { node: unknown }[] };
}

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/account/me")
      .then((res) => {
        if (!res.ok) {
          router.push("/account/login");
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (data?.customer) {
          setCustomer(data.customer);
        } else {
          setError(data?.error || "Failed to load account");
        }
      })
      .catch(() => setError("Failed to load account"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px] flex items-center justify-center">
          <p className="text-[14px] text-[#1A1A1A]/50">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !customer) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[14px] text-red-600 mb-4">{error || "Failed to load account"}</p>
            <a
              href="/account/login"
              className="text-[13px] text-[#C21A33] underline underline-offset-4"
            >
              Try logging in again
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const ordersCount = customer.orders.edges.length;
  const addressesCount = customer.addresses.edges.length;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px]">
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-[28px] md:text-[36px] font-bold text-[#1A1A1A]">
              My Account
            </h1>
            <p className="text-[14px] text-[#1A1A1A]/60 mt-2">
              Welcome back, {customer.firstName || "there"}
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 md:p-8 mb-6">
            <h2 className="font-heading text-[20px] font-bold text-[#1A1A1A] mb-4">
              Profile
            </h2>
            <div className="space-y-3 text-[14px]">
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]/50">Name</span>
                <span className="text-[#1A1A1A]">
                  {customer.firstName} {customer.lastName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1A1A1A]/50">Email</span>
                <span className="text-[#1A1A1A]">
                  {customer.emailAddress.emailAddress}
                </span>
              </div>
              {customer.phone && (
                <div className="flex justify-between">
                  <span className="text-[#1A1A1A]/50">Phone</span>
                  <span className="text-[#1A1A1A]">{customer.phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/account/orders"
              className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-[18px] font-bold text-[#1A1A1A]">
                    Orders
                  </h3>
                  <p className="text-[13px] text-[#1A1A1A]/50 mt-1">
                    {ordersCount} {ordersCount === 1 ? "order" : "orders"}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-[#C21A33]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </Link>

            <Link
              href="/account/addresses"
              className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-[18px] font-bold text-[#1A1A1A]">
                    Addresses
                  </h3>
                  <p className="text-[13px] text-[#1A1A1A]/50 mt-1">
                    {addressesCount}{" "}
                    {addressesCount === 1 ? "address" : "addresses"}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-[#C21A33]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Logout */}
          <div className="mt-8 text-center">
            <a
              href="/api/auth/logout"
              className="text-[13px] text-[#C21A33] underline underline-offset-4 hover:opacity-70 transition-opacity"
            >
              Sign out
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
