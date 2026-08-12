import { NextResponse } from "next/server";
import { withSessionToken } from "@/lib/auth-helpers";
import { getOrder } from "@/lib/shopify-customer";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  return withSessionToken(request, async (accessToken) => {
    const order = await getOrder(accessToken, id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  });
}
