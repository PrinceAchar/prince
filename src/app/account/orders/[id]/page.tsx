"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

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
  shippingAddress: {
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
  } | null;
  lineItems: {
    edges: {
      node: {
        id: string;
        title: string;
        quantity: number;
        price: { amount: string; currencyCode: string };
        image: { url: string; altText: string | null } | null;
      };
    }[];
  };
}

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/account/orders/${orderId}`);
      
      if (res.status === 401) {
        router.push("/account/login");
        return;
      }
      
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data?.message || data?.error || "Failed to load order");
        return;
      }
      
      const data = await res.json();
      setOrder(data.order);
    } catch (err) {
      setError("Failed to load order");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      case 'fulfilled':
        return 'text-blue';
      case 'partially_fulfilled':
        return 'text-blue';
      default:
        return 'text-gray';
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="min-h-screen bg-yellow pt-[70px] md:pt-[80px] flex items-center justify-center">
          <p className="text-[14px] text-brand-black/50">Loading order...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <Navbar />
        <main id="main-content" className="min-h-screen bg-yellow pt-[70px] md:pt-[80px] flex items-center justify-center">
          <div className="text-center">
            <p className="text-[14px] text-red mb-4">{error || "Order not found"}</p>
            <Link
              href="/account/orders"
              className="text-[13px] text-red underline underline-offset-4"
            >
              Back to Orders
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main id="main-content" className="min-h-screen bg-yellow pt-[70px] md:pt-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <Link
                  href="/account/orders"
                  className="text-[14px] text-red hover:opacity-70 transition-opacity inline-flex items-center gap-1"
                >
                  ÔåÉ Back to Orders
                </Link>
                <h1 className="font-heading text-[28px] md:text-[36px] font-bold text-brand-black mt-2">
                  Order #{order.number}
                </h1>
                <p className="text-[14px] text-brand-black/60 mt-1">
                  Placed on {formatDate(order.processedAt)}
                </p>
              </div>
              <div className="text-right">
                <span className={`text-[16px] font-bold ${getStatusColor(order.financialStatus)}`}>
                  {order.financialStatus}
                </span>
                {order.fulfillmentStatus && (
                  <div className="text-[14px] text-gray mt-1">
                    {order.fulfillmentStatus.replace('_', ' ').toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6">
                <h2 className="font-heading text-[20px] font-bold text-brand-black mb-6">
                  Order Items
                </h2>
                
                <div className="space-y-4">
                  {order.lineItems.edges.map((item) => (
                    <div key={item.node.id} className="flex items-center gap-4 pb-4 border-b border-brand-black/10 last:border-0 last:pb-0">
                      <div className="w-20 h-20 rounded-lg overflow-hidden bg-brand-black/5 flex-shrink-0">
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
                        <h3 className="text-[16px] font-medium text-brand-black">
                          {item.node.title}
                        </h3>
                        <p className="text-[14px] text-gray">
                          Quantity: {item.node.quantity}
                        </p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-[16px] font-semibold text-brand-black">
                          Ôé╣{parseInt(item.node.price.amount).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6 sticky top-24">
                <h2 className="font-heading text-[20px] font-bold text-brand-black mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray">Subtotal</span>
                    <span className="font-medium text-brand-black">
                      Ôé╣{order.subtotal ? parseInt(order.subtotal.amount).toFixed(0) : '0'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray">Shipping</span>
                    <span className="font-medium text-brand-black">
                      Ôé╣{parseInt(order.totalShipping.amount).toFixed(0)}
                    </span>
                  </div>
                  
                  {order.totalTax && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray">Tax</span>
                      <span className="font-medium text-brand-black">
                        Ôé╣{parseInt(order.totalTax.amount).toFixed(0)}
                      </span>
                    </div>
                  )}
                  
                  <div className="border-t border-brand-black/10 pt-4">
                    <div className="flex justify-between">
                      <span className="font-medium text-brand-black">Total</span>
                      <span className="text-xl font-bold text-brand-black">
                        Ôé╣{parseInt(order.totalPrice.amount).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>

                {order.statusPageUrl && (
                  <div className="mt-6">
                    <a
                      href={order.statusPageUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full py-3 bg-red text-white text-[14px] font-semibold uppercase tracking-[1px] text-center rounded-lg hover:bg-red-90 transition-colors"
                    >
                      Track Order
                    </a>
                  </div>
                )}

                {order.financialStatus.toLowerCase() === 'paid' && order.fulfillmentStatus?.toLowerCase() !== 'fulfilled' && (
                  <div className="mt-4 p-3 bg-yellow/10 border border-yellow/20 rounded-lg">
                    <p className="text-[13px] text-yellow">
                      Your order is confirmed and will be processed soon. You'll receive a confirmation email with tracking details once it ships.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.shippingAddress && (
            <div className="mt-8 bg-surface rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.06)] p-6">
              <h2 className="font-heading text-[20px] font-bold text-brand-black mb-4">
                Shipping Address
              </h2>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-red/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-brand-black">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p className="text-gray whitespace-pre-line">
                    {order.shippingAddress.address1}
                    {order.shippingAddress.address2 && `\n${order.shippingAddress.address2}`}
                    <br />
                    {order.shippingAddress.city} {order.shippingAddress.zoneCode} {order.shippingAddress.zip}
                    <br />
                    {order.shippingAddress.phoneNumber && `­ƒô× ${order.shippingAddress.phoneNumber}`}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
