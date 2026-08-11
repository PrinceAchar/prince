import { NextResponse } from "next/server";
import { getSessionTokens } from "@/lib/auth";

export async function GET() {
  const tokens = await getSessionTokens();
  if (tokens) {
    return NextResponse.json({ loggedIn: true });
  }
  return NextResponse.json({ loggedIn: false }, { status: 401 });
}
