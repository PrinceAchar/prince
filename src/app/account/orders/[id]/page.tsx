"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AccountNav from "@/components/AccountNav";

interface OrderLineItem {
  title: string;
  quantity: number;
  price: { amount: string; currencyCode: string };
  image: { url: string; altText: string | null } | null;
}

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

interface Order {
  id: string;
  name: string;
  number: number;
  processedAt: string;
  financialStatus: string;
  fulfillmentStatus: string;
  statusPageUrl: string;
  subtotal: { amount: string; currencyCode: string } | null;
  totalShipping: { amount: string; currencyCode: string };
  totalTax: { amount: string; currencyCode: string } | null;
  totalPrice: { amount: string; currencyCode: string };
  shippingAddress: Address | null;
  lineItems: { edges: { node: OrderLineItem }[] };
}

function getStatusColor(status: string): string {
  switch (status) {
    case "PAID":
    case "FULFILLED":
      return "text-green-700 bg-green-50";
    case "PENDING":
    case "PARTIALLY_FULFILLED":
      return "text-amber-700 bg-amber-50";
    case "REFUNDED":
    case "PARTIALLY_REFUNDED":
    case "CANCELLED":
      return "text-red-700 bg-red-50";
    default:
      return "text-[#1A1A1A]/60 bg-[#1A1A1A]/5";
  }
}

export default function OrderDetailPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/account/orders/${encodeURIComponent(id)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          router.push("/account/login");
          return;
        }
        if (!res.ok) {
          setError(data?.error || data?.message || "Failed to load order");
          return;
        }
        if (data?.order) {
          setOrder(data.order);
        } else {
          setError("Order not found");
        }
      })
      .catch(() => setError("Failed to load order"))
      .finally(() => setLoading(false));
  }, [id, router]);

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

  if (error || !order) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[14px] text-red-600 mb-4">{error || "Order not found"}</p>
            <Link href="/account/orders" className="text-[13px] text-[#C21A33] underline underline-offset-4">
              Back to orders
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const currencyCode = order.totalPrice.currencyCode;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px]">
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
            <div>
              <h1 className="font-heading text-[28px] md:text-[32px] font-bold text-[#1A1A1A]">
                Order #{order.number}
              </h1>
              <p className="text-[14px] text-[#1A1A1A]/60 mt-1">
                Placed on{" "}
                {new Date(order.processedAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${getStatusColor(
                  order.financialStatus
                )}`}
              >
                {order.financialStatus}
              </span>
              <span
                className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${getStatusColor(
                  order.fulfillmentStatus
                )}`}
              >
                {order.fulfillmentStatus}
              </span>
            </div>
          </div>

          <AccountNav />

          {/* Items */}
          <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 md:p-8 mb-6">
            <h2 className="font-heading text-[18px] font-bold text-[#1A1A1A] mb-4">
              Items
            </h2>
            <div className="space-y-3">
              {order.lineItems.edges.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  {item.node.image && (
                    <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#FAF5E4] flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.node.image.url}
                        alt={item.node.image.altText || item.node.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] text-[#1A1A1A]">{item.node.title}</p>
                    <p className="text-[12px] text-[#1A1A1A]/50">
                      Qty: {item.node.quantity}
                    </p>
                  </div>
                  <p className="text-[14px] text-[#1A1A1A] font-medium">
                    {formatPrice(item.node.price.amount, item.node.price.currencyCode)}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1A1A1A]/5 mt-5 pt-5 space-y-2 text-[14px]">
              <div className="flex justify-between text-[#1A1A1A]/60">
                <span>Subtotal</span>
                <span>
                  {order.subtotal
                    ? formatPrice(order.subtotal.amount, order.subtotal.currencyCode)
                    : "--"}
                </span>
              </div>
              <div className="flex justify-between text-[#1A1A1A]/60">
                <span>Shipping</span>
                <span>
                  {formatPrice(order.totalShipping.amount, order.totalShipping.currencyCode)}
                </span>
              </div>
              {order.totalTax && (
                <div className="flex justify-between text-[#1A1A1A]/60">
                  <span>Tax</span>
                  <span>
                    {formatPrice(order.totalTax.amount, order.totalTax.currencyCode)}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-[#1A1A1A] pt-2">
                <span>Total</span>
                <span>{formatPrice(order.totalPrice.amount, currencyCode)}</span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 md:p-8 mb-6">
              <h2 className="font-heading text-[18px] font-bold text-[#1A1A1A] mb-3">
                Shipping Address
              </h2>
              <p className="text-[14px] text-[#1A1A1A] leading-relaxed">
                {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                <br />
                {order.shippingAddress.address1}
                {order.shippingAddress.address2 && (
                  <>
                    <br />
                    {order.shippingAddress.address2}
                  </>
                )}
                <br />
                {order.shippingAddress.city}
                {order.shippingAddress.zoneCode ? `, ${order.shippingAddress.zoneCode}` : ""}
                {order.shippingAddress.zip ? ` - ${order.shippingAddress.zip}` : ""}
                <br />
                {order.shippingAddress.territoryCode}
              </p>
            </div>
          )}

          {/* Track / Actions */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={order.statusPageUrl}
              className="px-6 py-2.5 bg-[#C21A33] text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-[#C21A33]/90 transition-colors"
            >
              Track Order
            </Link>
            <Link
              href="/account/orders"
              className="px-6 py-2.5 border border-[#1A1A1A]/15 text-[#1A1A1A] text-[13px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-[#1A1A1A]/5 transition-colors"
            >
              All Orders
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
