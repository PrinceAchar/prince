"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

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

export default function AddressesPage() {
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [defaultAddressId, setDefaultAddressId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    zoneCode: "",
    zip: "",
    territoryCode: "",
    phoneNumber: "",
  });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/account/addresses");
      
      if (res.status === 401) {
        router.push("/account/login");
        return;
      }
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || data?.error || "Failed to load addresses");
        return;
      }
      
      const data = await res.json();
      setAddresses(data.addresses);
      setDefaultAddressId(data.defaultAddressId);
    } catch (err) {
      setError("Failed to load addresses");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const url = editingId 
        ? `/api/account/addresses?id=${editingId}`
        : "/api/account/addresses";
      
      const method = editingId ? "PUT" : "POST";
      
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || data?.message || "Failed to save address");
        return;
      }
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        zoneCode: "",
        zip: "",
        territoryCode: "",
        phoneNumber: "",
      });
      setEditingId(null);
      setShowAddForm(false);
      
      // Refresh addresses
      fetchAddresses();
    } catch (err) {
      setError("Failed to save address");
    }
  };

  const handleEdit = (address: Address) => {
    setFormData({
      firstName: address.firstName,
      lastName: address.lastName,
      address1: address.address1,
      address2: address.address2 || "",
      city: address.city,
      zoneCode: address.zoneCode || "",
      zip: address.zip || "",
      territoryCode: address.territoryCode || "",
      phoneNumber: address.phoneNumber || "",
    });
    setEditingId(address.id);
    setShowAddForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/account/addresses?id=${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || data?.message || "Failed to delete address");
        return;
      }
      
      fetchAddresses();
    } catch (err) {
      setError("Failed to delete address");
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const res = await fetch(`/api/account/addresses?id=${id}`, {
        method: "PATCH",
      });
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.error || data?.message || "Failed to set default address");
        return;
      }
      
      setDefaultAddressId(id);
    } catch (err) {
      setError("Failed to set default address");
    }
  };

  const formatAddress = (address: Address) => {
    return `${address.firstName} ${address.lastName}\n${address.address1}${address.address2 ? `\n${address.address2}` : ""}\n${address.city} ${address.zoneCode} ${address.zip}`;
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-yellow pt-[70px] md:pt-[80px] flex items-center justify-center">
          <p className="text-[14px] text-brand-black/50">Loading addresses...</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-yellow pt-[70px] md:pt-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-heading text-[28px] md:text-[36px] font-bold text-brand-black mb-2">
                Addresses
              </h1>
              <p className="text-[14px] text-brand-black/60">
                Manage your shipping addresses
              </p>
            </div>
            <button
              onClick={() => {
                setFormData({
                  firstName: "",
                  lastName: "",
                  address1: "",
                  address2: "",
                  city: "",
                  zoneCode: "",
                  zip: "",
                  territoryCode: "",
                  phoneNumber: "",
                });
                setEditingId(null);
                setShowAddForm(true);
              }}
              className="px-6 py-3 bg-red text-white text-[14px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red-90 transition-colors"
            >
              Add Address
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red/10 border border-red/20 rounded-lg">
              <p className="text-red">{error}</p>
            </div>
          )}

          {showAddForm && (
            <div className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 mb-6">
              <h2 className="font-heading text-[20px] font-bold text-brand-black mb-4">
                {editingId ? "Edit Address" : "Add New Address"}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={formData.address1}
                    onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                    className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                    required
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                    Address Line 2 (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.address2}
                    onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                    className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                      State/Province
                    </label>
                    <input
                      type="text"
                      value={formData.zoneCode}
                      onChange={(e) => setFormData({ ...formData, zoneCode: e.target.value })}
                      className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                      ZIP/Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-medium text-brand-black mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full px-3 py-2.5 bg-yellow border border-brand-black/10 rounded-lg text-[14px] text-brand-black placeholder:text-brand-black/30 focus:outline-none focus:border-red transition-colors"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-red text-white text-[14px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red-90 transition-colors"
                  >
                    {editingId ? "Update Address" : "Add Address"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingId(null);
                    }}
                    className="px-6 py-2 border border-brand-black/15 text-brand-black text-[14px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-brand-black/5 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {addresses.length === 0 ? (
            <div className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 text-center">
              <p className="text-[16px] text-brand-black mb-4">No addresses found</p>
              <p className="text-[14px] text-gray mb-6">
                You haven't added any addresses yet. Add your first address to get started.
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="inline-block px-6 py-3 bg-red text-white text-[14px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red-90 transition-colors"
              >
                Add Your First Address
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 ${
                    address.id === defaultAddressId ? "ring-2 ring-red" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-5 h-5 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="font-heading text-[18px] font-bold text-brand-black mb-2">
                            {address.firstName} {address.lastName}
                          </h3>
                          <p className="text-[14px] text-gray whitespace-pre-line">
                            {formatAddress(address)}
                          </p>
                          {address.phoneNumber && (
                            <p className="text-[14px] text-gray mt-2">
                              📞 {address.phoneNumber}
                            </p>
                          )}
                          {address.id === defaultAddressId && (
                            <span className="inline-block mt-2 px-3 py-1 bg-green/10 text-green text-[12px] font-semibold rounded-full">
                              Default Address
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(address)}
                        className="px-4 py-2 border border-brand-black/15 text-brand-black text-[12px] font-semibold rounded-lg hover:bg-brand-black/5 transition-colors"
                      >
                        Edit
                      </button>
                      {address.id !== defaultAddressId && (
                        <button
                          onClick={() => handleSetDefault(address.id)}
                          className="px-4 py-2 border border-brand-black/15 text-brand-black text-[12px] font-semibold rounded-lg hover:bg-brand-black/5 transition-colors"
                        >
                          Set Default
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(address.id)}
                        className="px-4 py-2 border border-red/15 text-red text-[12px] font-semibold rounded-lg hover:bg-red/5 transition-colors"
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