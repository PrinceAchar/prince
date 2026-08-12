import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";
import { getCustomerOrThrow } from "@/lib/shopify-customer";

export async function GET(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json(
      { error: "not_authenticated", message: "No active session" },
      { status: 401 }
    );
  }

  try {
    const customer = await getCustomerOrThrow(tokens.accessToken);
    const orders = customer.orders.edges.map((e) => e.node);
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("getCustomer failed:", err);
    return NextResponse.json(
      {
        error: "customer_fetch_failed",
        message: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}
