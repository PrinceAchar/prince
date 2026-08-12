import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";

export async function GET(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  if (tokens) {
    return NextResponse.json({ loggedIn: true });
  }
  return NextResponse.json({ loggedIn: false }, { status: 401 });
}
