import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";
import { getCustomer } from "@/lib/shopify-customer";

export async function GET(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const customer = await getCustomer(tokens.accessToken);
  if (!customer) {
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 401 });
  }

  return NextResponse.json({ customer });
}
