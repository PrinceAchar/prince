import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";
import { getOrder } from "@/lib/shopify-customer";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json(
      { error: "not_authenticated", message: "No active session" },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    const order = await getOrder(tokens.accessToken, id);
    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    return NextResponse.json({ order });
  } catch (err) {
    console.error("getOrder failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 }
    );
  }
}
