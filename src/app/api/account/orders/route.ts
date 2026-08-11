import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";
import { getCustomer } from "@/lib/shopify-customer";

export async function GET(request: Request) {
  const cookies = request.headers.get("cookie");
  const cookieMap = new Map<string, string>();
  
  if (cookies) {
    cookies.split(";").forEach((c) => {
      const [key, ...value] = c.trim().split("=");
      cookieMap.set(key, value.join("="));
    });
  }

  const tokens = getSessionTokensFromCookies(cookieMap);
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const customer = await getCustomer(tokens.accessToken);
  if (!customer) {
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 401 });
  }

  const orders = customer.orders.edges.map((e) => e.node);
  return NextResponse.json({ orders });
}
