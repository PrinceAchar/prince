import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";
import {
  getCustomerOrThrow,
  createAddress,
  updateAddress,
  deleteAddress,
  type AddressInput,
} from "@/lib/shopify-customer";

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
    const addresses = customer.addresses.edges.map((e) => e.node);
    return NextResponse.json({ addresses });
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

export async function POST(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json(
      { error: "not_authenticated", message: "No active session" },
      { status: 401 }
    );
  }

  const body: AddressInput = await request.json();
  const result = await createAddress(tokens.accessToken, body);

  if (result.errors.length > 0) {
    return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
  }

  return NextResponse.json({ address: result.address });
}

export async function PUT(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json(
      { error: "not_authenticated", message: "No active session" },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing address ID" }, { status: 400 });
  }

  const body: AddressInput = await request.json();
  const result = await updateAddress(tokens.accessToken, id, body);

  if (result.errors.length > 0) {
    return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
  }

  return NextResponse.json({ address: result.address });
}

export async function DELETE(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json(
      { error: "not_authenticated", message: "No active session" },
      { status: 401 }
    );
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Missing address ID" }, { status: 400 });
  }

  const result = await deleteAddress(tokens.accessToken, id);

  if (result.errors.length > 0) {
    return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
