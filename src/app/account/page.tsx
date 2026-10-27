"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountNav from "@/components/AccountNav";

interface Customer {
  firstName: string;
  lastName: string;
  emailAddress: { emailAddress: string };
  phoneNumber: { phoneNumber: string } | null;
  orders: { edges: { node: unknown }[] };
  addresses: { edges: { node: unknown }[] };
}

export default function AccountPage() {
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingName, setEditingName] = useState(false);
  const [nameForm, setNameForm] = useState({ firstName: "", lastName: "" });
  const [savingName, setSavingName] = useState(false);
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    fetch("/api/account/me")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          router.push("/account/login");
          return;
        }
        if (!res.ok) {
          setError(data?.message || data?.error || "Failed to load account");
          return;
        }
        if (data?.customer) {
          setCustomer(data.customer);
        } else {
          setError("Failed to load account");
        }
      })
      .catch(() => setError("Failed to load account"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleNameSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingName(true);
    setNameError("");

    try {
      const res = await fetch("/api/account/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nameForm),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setNameError(data?.error || data?.message || "Failed to update name");
        return;
      }

      if (data?.customer) {
        setCustomer({ ...customer!, ...data.customer });
      }
      setEditingName(false);
    } catch {
      setNameError("Failed to update name");
    } finally {
      setSavingName(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-yellow pt-[70px] md:pt-[80px] flex items-center justify-center">
          <p className="text-[14px] text-brand-black/50">Loading...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !customer) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-yellow pt-[70px] md:pt-[80px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[14px] text-red mb-4">{error || "Failed to load account"}</p>
            <a
              href="/account/login"
              className="text-[13px] text-red underline underline-offset-4"
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

      <main className="min-h-screen bg-yellow pt-[70px] md:pt-[80px]">
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="mb-10">
            <h1 className="font-heading text-[28px] md:text-[36px] font-bold text-brand-black">
              My Account
            </h1>
            <p className="text-[14px] text-brand-black/60 mt-2">
              Welcome back, {customer.firstName || "there"}
            </p>
          </div>

          <AccountNav />

          {/* Profile Card */}
          <div className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 md:p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading text-[20px] font-bold text-brand-black">
                Profile
              </h2>
              {!editingName && (
                <button
                  onClick={() => {
                    setNameForm({
                      firstName: customer.firstName,
                      lastName: customer.lastName,
                    });
                    setNameError("");
                    setEditingName(true);
                  }}
                  className="text-[12px] text-red underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Edit
                </button>
              )}
            </div>
            {editingName ? (
              <form onSubmit={handleNameSave} className="space-y-3">
                {nameError && (
                  <div className="p-3 bg-red/10 border border-red/20 rounded-lg text-[13px] text-red">
                    {nameError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={nameForm.firstName}
                    onChange={(e) =>
                      setNameForm({ ...nameForm, firstName: e.target.value })
                    }
                    placeholder="First name"
                    className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                    required
                  />
                  <input
                    type="text"
                    value={nameForm.lastName}
                    onChange={(e) =>
                      setNameForm({ ...nameForm, lastName: e.target.value })
                    }
                    placeholder="Last name"
                    className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={savingName}
                    className="px-6 py-2 bg-red text-white text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red/90 transition-colors disabled:opacity-50"
                  >
                    {savingName ? "Saving..." : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingName(false)}
                    className="px-6 py-2 border border-brand-black/15 text-brand-black text-[12px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-brand-black/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-3 text-[14px]">
                <div className="flex justify-between">
                  <span className="text-brand-black/50">Name</span>
                  <span className="text-brand-black">
                    {customer.firstName} {customer.lastName}
                  </span>
                </div>
              <div className="flex justify-between">
                <span className="text-brand-black/50">Email</span>
                <span className="text-brand-black">
                  {customer.emailAddress.emailAddress}
                </span>
              </div>
              {customer.phoneNumber?.phoneNumber && (
                <div className="flex justify-between">
                  <span className="text-brand-black/50">Phone</span>
                  <span className="text-brand-black">{customer.phoneNumber.phoneNumber}</span>
                </div>
              )}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              href="/account/orders"
              className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-[18px] font-bold text-brand-black">
                    Orders
                  </h3>
                  <p className="text-[13px] text-brand-black/50 mt-1">
                    {ordersCount} {ordersCount === 1 ? "order" : "orders"}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-red"
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
              className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 hover:shadow-[0_4px_30px_rgba(0,0,0,0.1)] transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-[18px] font-bold text-brand-black">
                    Addresses
                  </h3>
                  <p className="text-[13px] text-brand-black/50 mt-1">
                    {addressesCount}{" "}
                    {addressesCount === 1 ? "address" : "addresses"}
                  </p>
                </div>
                <svg
                  className="w-5 h-5 text-red"
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
              className="text-[13px] text-red underline underline-offset-4 hover:opacity-70 transition-opacity"
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
