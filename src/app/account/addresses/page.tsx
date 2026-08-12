"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Address {
  id: string;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string | null;
  city: string;
  zoneCode: string | null;
  zip: string | null;
  territoryCode: string | null;
  phoneNumber: string | null;
}

interface AddressForm {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  country: string;
  phone: string;
}

const emptyForm: AddressForm = {
  firstName: "",
  lastName: "",
  address1: "",
  address2: "",
  city: "",
  province: "",
  zip: "",
  country: "IN",
  phone: "",
};

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AddressForm>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchAddresses = useCallback(async () => {
    try {
      const res = await fetch("/api/account/addresses");
      if (res.status === 401) {
        router.push("/account/login");
        return;
      }
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.message || data?.error || "Failed to load addresses");
        return;
      }
      setAddresses(data.addresses || []);
    } catch {
      setError("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const url = editingId
        ? `/api/account/addresses?id=${encodeURIComponent(editingId)}`
        : "/api/account/addresses";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          address1: form.address1,
          address2: form.address2,
          city: form.city,
          zoneCode: form.province,
          zip: form.zip,
          territoryCode: form.country,
          phoneNumber: form.phone,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save address");
        return;
      }

      setShowForm(false);
      setEditingId(null);
      setForm(emptyForm);
      await fetchAddresses();
    } catch {
      setError("Failed to save address");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this address?")) return;

    try {
      const res = await fetch(`/api/account/addresses?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setError("Failed to delete address");
        return;
      }

      await fetchAddresses();
    } catch {
      setError("Failed to delete address");
    }
  };

  const handleEdit = (addr: Address) => {
    setForm({
      firstName: addr.firstName,
      lastName: addr.lastName,
      address1: addr.address1,
      address2: addr.address2 || "",
      city: addr.city,
      province: addr.zoneCode || "",
      zip: addr.zip || "",
      country: addr.territoryCode || "IN",
      phone: addr.phoneNumber || "",
    });
    setEditingId(addr.id);
    setShowForm(true);
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-[#FAF5E4] border border-[#1A1A1A]/10 rounded-lg text-[14px] text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 focus:outline-none focus:border-[#C21A33] transition-colors";

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px]">
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="text-[#C21A33] hover:opacity-70 transition-opacity"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5L8.25 12l7.5-7.5"
                  />
                </svg>
              </Link>
              <h1 className="font-heading text-[28px] md:text-[32px] font-bold text-[#1A1A1A]">
                Addresses
              </h1>
            </div>
            {!showForm && (
              <button
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="px-4 py-2 bg-[#C21A33] text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-[#C21A33]/90 transition-colors"
              >
                Add New
              </button>
            )}
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-[13px] text-red-700">
              {error}
            </div>
          )}

          {/* Address Form */}
          {showForm && (
            <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 md:p-8 mb-6">
              <h2 className="font-heading text-[18px] font-bold text-[#1A1A1A] mb-4">
                {editingId ? "Edit Address" : "New Address"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className={inputClass}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Address line 1"
                  value={form.address1}
                  onChange={(e) => setForm({ ...form, address1: e.target.value })}
                  className={inputClass}
                  required
                />
                <input
                  type="text"
                  placeholder="Address line 2 (optional)"
                  value={form.address2}
                  onChange={(e) => setForm({ ...form, address2: e.target.value })}
                  className={inputClass}
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className={inputClass}
                    required
                  />
                  <input
                    type="text"
                    placeholder="State / Province"
                    value={form.province}
                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="PIN / Zip code"
                    value={form.zip}
                    onChange={(e) => setForm({ ...form, zip: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 bg-[#C21A33] text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-[#C21A33]/90 transition-colors disabled:opacity-50"
                  >
                    {saving ? "Saving..." : editingId ? "Update" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                    className="px-6 py-2.5 border border-[#1A1A1A]/15 text-[#1A1A1A] text-[13px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-[#1A1A1A]/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Address List */}
          {loading ? (
            <div className="text-center py-8 text-[14px] text-[#1A1A1A]/50">
              Loading...
            </div>
          ) : addresses.length === 0 && !showForm ? (
            <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 text-center">
              <p className="text-[14px] text-[#1A1A1A]/50">
                No saved addresses yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6"
                >
                  <div className="flex items-start justify-between">
                    <div className="text-[14px] text-[#1A1A1A] leading-relaxed">
                      <p className="font-medium">
                        {addr.firstName} {addr.lastName}
                      </p>
                      <p>{addr.address1}</p>
                      {addr.address2 && <p>{addr.address2}</p>}
                      <p>
                        {addr.city}
                        {addr.zoneCode ? `, ${addr.zoneCode}` : ""}
                        {addr.zip ? ` - ${addr.zip}` : ""}
                      </p>
                      <p>{addr.territoryCode}</p>
                      {addr.phoneNumber && <p className="mt-1">{addr.phoneNumber}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(addr)}
                        className="text-[12px] text-[#C21A33] underline underline-offset-2 hover:opacity-70 transition-opacity"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(addr.id)}
                        className="text-[12px] text-[#1A1A1A]/40 underline underline-offset-2 hover:text-red-600 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
