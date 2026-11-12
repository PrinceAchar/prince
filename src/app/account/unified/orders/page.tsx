"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";

interface Order {
  id: string;
  number: number;
  processedAt: string;
  financialStatus: string;
  fulfillments: {
    nodes: {
      status: string;
    }[];
  };
  totalPrice: {
    amount: string;
    currencyCode: string;
  };
  lineItems: {
    edges: {
      node: {
        title: string;
        quantity: number;
        price: {
          amount: string;
          currencyCode: string;
        };
        image: {
          url: string;
          altText: string | null;
        } | null;
      };
    }[];
  };
}

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [pageInfo, setPageInfo] = useState({ hasNextPage: false, endCursor: null as string | null });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async (cursor?: string | null) => {
    setLoading(true);
    try {
      const url = cursor ? `/api/account/orders?cursor=${cursor}` : "/api/account/orders";
      const res = await fetch(url);
      
      if (res.status === 401) {
        router.push("/account/login/unified");
        return;
      }
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || data?.error || "Failed to load orders");
        return;
      }
      
      const data = await res.json();
      setOrders(prev => cursor ? [...prev, ...data.orders] : data.orders);
      setPageInfo(data.pageInfo);
    } catch (err) {
      setError("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'text-green';
      case 'pending':
        return 'text-yellow';
      case 'refunded':
        return 'text-red';
      default:
        return 'text-gray';
    }
  };

  if (loading && orders.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-yellow pt-[70px] md:pt-[80px] flex items-center justify-center">
          <p className="text-[14px] text-brand-black/50">Loading orders...</p>
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
          <div className="mb-8">
            <h1 className="font-heading text-[28px] md:text-[36px] font-bold text-brand-black mb-2">
              My Orders
            </h1>
            <p className="text-[14px] text-brand-black/60">
              View your order history and track current orders
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red/10 border border-red/20 rounded-lg">
              <p className="text-red">{error}</p>
            </div>
          )}

          {orders.length === 0 ? (
            <div className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-8 text-center">
              <p className="text-[16px] text-brand-black mb-4">No orders found</p>
              <p className="text-[14px] text-gray mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-red text-white text-[14px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red-90 transition-colors"
              >
                Start Shopping
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div key={order.id} className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="font-heading text-[18px] font-bold text-brand-black">
                        Order #{order.number}
                      </h3>
                      <p className="text-[14px] text-gray">
                        Placed on {formatDate(order.processedAt)}
                      </p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <span className={`text-[14px] font-semibold ${getStatusColor(order.financialStatus)}`}>
                        {order.financialStatus}
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-brand-black/10 pt-4">
                    <h4 className="text-[14px] font-semibold text-brand-black mb-3">Items</h4>
                    <div className="space-y-3">
                      {order.lineItems.edges.map((item) => (
                        <div key={item.node.id} className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-lg overflow-hidden bg-brand-black/5 flex-shrink-0">
                            {item.node.image ? (
                              <img
                                src={item.node.image.url}
                                alt={item.node.image.altText || item.node.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                No Image
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-[14px] font-medium text-brand-black">
                              {item.node.title}
                            </p>
                            <p className="text-[12px] text-gray">
                              Qty: {item.node.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[14px] font-semibold text-brand-black">
                              ₹{parseInt(item.node.price.amount).toFixed(0)}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-brand-black/10 pt-4 mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[14px] font-medium text-brand-black">
                        Total
                      </span>
                      <span className="text-[18px] font-bold text-brand-black">
                        ₹{parseInt(order.totalPrice.amount).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {pageInfo.hasNextPage && (
                <div className="text-center">
                  <button
                    onClick={() => fetchOrders(pageInfo.endCursor)}
                    disabled={loading}
                    className="px-6 py-3 bg-red text-white text-[14px] font-semibold uppercase tracking-[1px] rounded-lg hover:bg-red-90 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Load More Orders"}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}