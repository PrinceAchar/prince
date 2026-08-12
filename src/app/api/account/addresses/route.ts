import { NextResponse } from "next/server";
import { withSessionToken } from "@/lib/auth-helpers";
import {
  getCustomerOrThrow,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
  type AddressInput,
} from "@/lib/shopify-customer";

export async function GET(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const customer = await getCustomerOrThrow(accessToken);
    const addresses = customer.addresses.edges.map((e) => e.node);
    return NextResponse.json({ addresses, defaultAddressId: customer.defaultAddress?.id ?? null });
  });
}

export async function POST(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const body: AddressInput = await request.json();
    const result = await createAddress(accessToken, body);

    if (result.errors.length > 0) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }

    return NextResponse.json({ address: result.address });
  });
}

export async function PUT(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing address ID" }, { status: 400 });
    }

    const body: AddressInput = await request.json();
    const result = await updateAddress(accessToken, id, body);

    if (result.errors.length > 0) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }

    return NextResponse.json({ address: result.address });
  });
}

export async function PATCH(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing address ID" }, { status: 400 });
    }

    const result = await setDefaultAddress(accessToken, id);

    if (result.errors.length > 0) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  });
}

export async function DELETE(request: Request) {
  return withSessionToken(request, async (accessToken) => {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Missing address ID" }, { status: 400 });
    }

    const result = await deleteAddress(accessToken, id);

    if (result.errors.length > 0) {
      return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  });
}
