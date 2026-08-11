import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";
import {
  getCustomer,
  createAddress,
  updateAddress,
  deleteAddress,
  type AddressInput,
} from "@/lib/shopify-customer";

function parseCookies(request: Request): Map<string, string> {
  const cookies = request.headers.get("cookie");
  const cookieMap = new Map<string, string>();
  if (cookies) {
    cookies.split(";").forEach((c) => {
      const [key, ...value] = c.trim().split("=");
      cookieMap.set(key, value.join("="));
    });
  }
  return cookieMap;
}

export async function GET(request: Request) {
  const cookieMap = parseCookies(request);
  const tokens = getSessionTokensFromCookies(cookieMap);
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const customer = await getCustomer(tokens.accessToken);
  if (!customer) {
    return NextResponse.json({ error: "Failed to fetch customer" }, { status: 401 });
  }

  const addresses = customer.addresses.edges.map((e) => e.node);
  return NextResponse.json({ addresses });
}

export async function POST(request: Request) {
  const cookieMap = parseCookies(request);
  const tokens = getSessionTokensFromCookies(cookieMap);
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const body: AddressInput = await request.json();
  const result = await createAddress(tokens.accessToken, body);

  if (result.errors.length > 0) {
    return NextResponse.json({ error: result.errors.join(", ") }, { status: 400 });
  }

  return NextResponse.json({ address: result.address });
}

export async function PUT(request: Request) {
  const cookieMap = parseCookies(request);
  const tokens = getSessionTokensFromCookies(cookieMap);
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
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
  const cookieMap = parseCookies(request);
  const tokens = getSessionTokensFromCookies(cookieMap);
  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
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
