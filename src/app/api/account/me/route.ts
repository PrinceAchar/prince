import { NextResponse } from "next/server";
import { withSessionToken } from "@/lib/auth-helpers";
import { getCustomerOrThrow, updateCustomerName } from "@/lib/shopify-customer";

export async function GET(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const customer = await getCustomerOrThrow(accessToken);
    return NextResponse.json({ customer });
  });
}

export async function PATCH(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const body: { firstName?: string; lastName?: string } = await request.json().catch(() => ({}));
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First and last name are required" },
        { status: 400 }
      );
    }

    const result = await updateCustomerName(accessToken, firstName, lastName);

    if (result.errors.length > 0) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }

    return NextResponse.json({ customer: result.customer });
  });
}
