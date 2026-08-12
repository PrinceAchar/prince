"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

interface Order {
  id: string;
  number: number;
  processedAt: string;
  financialStatus: string;
  fulfillments: { nodes: { status: string }[] };
  totalPrice: { amount: string; currencyCode: string };
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
      return "text-red-700 bg-red-50";
    default:
      return "text-[#1A1A1A]/60 bg-[#1A1A1A]/5";
  }
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/account/orders")
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          router.push("/account/login");
          return;
        }
        if (!res.ok) {
          setError(data?.message || data?.error || "Failed to load orders");
          return;
        }
        if (data?.orders) {
          setOrders(data.orders);
        } else {
          setError("Failed to load orders");
        }
      })
      .catch(() => setError("Failed to load orders"))
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

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[14px] text-red-600 mb-4">{error}</p>
            <a href="/account/login" className="text-[13px] text-[#C21A33] underline underline-offset-4">
              Try logging in again
            </a>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px]">
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-[28px] md:text-[32px] font-bold text-[#1A1A1A]">
              My Orders
            </h1>
          </div>

          <AccountNav />

          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 text-center">
              <p className="text-[14px] text-[#1A1A1A]/50 mb-4">
                You haven&apos;t placed any orders yet.
              </p>
              <Link
                href="/achar"
                className="inline-block px-6 py-2.5 bg-[#C21A33] text-white text-[13px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-[#C21A33]/90 transition-colors"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6"
                >
                  {/* Order Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <Link
                        href={`/account/orders/${encodeURIComponent(order.id)}`}
                        className="text-[13px] text-[#C21A33] font-medium hover:opacity-70 transition-opacity"
                      >
                        Order #{order.number}
                      </Link>
                      <p className="text-[13px] text-[#1A1A1A]/50">
                        {new Date(order.processedAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${getStatusColor(
                          order.financialStatus
                        )}`}
                      >
                        {order.financialStatus}
                      </span>
                      {order.fulfillments.nodes[0]?.status && (
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${getStatusColor(
                            order.fulfillments.nodes[0].status
                          )}`}
                        >
                          {order.fulfillments.nodes[0].status}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-[#1A1A1A]/5 pt-4 space-y-3">
                    {order.lineItems.edges.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {item.node.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF5E4] flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.node.image.url}
                              alt={item.node.image.altText || item.node.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-[#1A1A1A] truncate">
                            {item.node.title}
                          </p>
                          <p className="text-[12px] text-[#1A1A1A]/50">
                            Qty: {item.node.quantity}
                          </p>
                        </div>
                        <p className="text-[13px] text-[#1A1A1A] font-medium">
                          {formatPrice(
                            item.node.price.amount,
                            item.node.price.currencyCode
                          )}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order Total */}
                  <div className="border-t border-[#1A1A1A]/5 pt-4 mt-4 flex justify-between items-center">
                    <Link
                      href={`/account/orders/${encodeURIComponent(order.id)}`}
                      className="text-[12px] text-[#C21A33] underline underline-offset-2 hover:opacity-70 transition-opacity"
                    >
                      View details
                    </Link>
                    <p className="text-[14px] font-semibold text-[#1A1A1A]">
                      Total:{" "}
                      {formatPrice(
                        order.totalPrice.amount,
                        order.totalPrice.currencyCode
                      )}
                    </p>
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
