import { redirect } from "next/navigation";
import Link from "next/link";
import { getSessionTokens } from "@/lib/auth";
import { getCustomer } from "@/lib/shopify-customer";
import { formatPrice } from "@/lib/shopify";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "My Orders | Prince Achar",
};

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

export default async function OrdersPage() {
  const tokens = await getSessionTokens();
  if (!tokens) redirect("/account/login");

  const customer = await getCustomer(tokens.accessToken);
  if (!customer) redirect("/account/login");

  const orders = customer.orders.edges.map((e) => e.node);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAF5E4] pt-[70px] md:pt-[80px]">
        <div className="max-w-[800px] mx-auto px-4 py-12 md:py-16">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
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
              My Orders
            </h1>
          </div>

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
                      <p className="text-[13px] text-[#1A1A1A]/50">
                        Order #{order.orderNumber}
                      </p>
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
                      {order.fulfillmentStatus && (
                        <span
                          className={`text-[11px] font-semibold uppercase tracking-wide px-2.5 py-1 rounded-full ${getStatusColor(
                            order.fulfillmentStatus
                          )}`}
                        >
                          {order.fulfillmentStatus}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="border-t border-[#1A1A1A]/5 pt-4 space-y-3">
                    {order.lineItems.edges.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        {item.node.variant?.image && (
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#FAF5E4] flex-shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={item.node.variant.image.url}
                              alt={item.node.variant.image.altText || item.node.title}
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
                  <div className="border-t border-[#1A1A1A]/5 pt-4 mt-4 flex justify-end">
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
