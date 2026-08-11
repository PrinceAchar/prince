import { NextResponse } from "next/server";
import { getSessionTokens } from "@/lib/auth";
import { getCustomer } from "@/lib/shopify-customer";

export async function GET() {
  const tokens = await getSessionTokens();
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const customer = await getCustomer(tokens.accessToken);
  if (!customer) {
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 401 });
  }

  return NextResponse.json({ customer });
}
