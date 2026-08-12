import { NextResponse } from "next/server";
import { withSessionToken } from "@/lib/auth-helpers";
import { getCustomerOrdersPage } from "@/lib/shopify-customer";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor");

  return withSessionToken(request, async (accessToken) => {
    const page = await getCustomerOrdersPage(accessToken, cursor);
    return NextResponse.json(page);
  });
}
