import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";
import { getCustomerOrThrow, updateCustomerName } from "@/lib/shopify-customer";

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
    return NextResponse.json({ customer });
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

export async function PATCH(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json(
      { error: "not_authenticated", message: "No active session" },
      { status: 401 }
    );
  }

  const body: { firstName?: string; lastName?: string } = await request.json().catch(() => ({}));
  const firstName = body.firstName?.trim();
  const lastName = body.lastName?.trim();

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: "First and last name are required" },
      { status: 400 }
    );
  }

  try {
    const result = await updateCustomerName(tokens.accessToken, firstName, lastName);

    if (result.errors.length > 0) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }

    return NextResponse.json({ customer: result.customer });
  } catch (err) {
    console.error("updateCustomerName failed:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 400 }
    );
  }
}
