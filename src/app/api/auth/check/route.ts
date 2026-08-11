import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";

export async function GET(request: Request) {
  const cookies = request.headers.get("cookie");
  const cookieMap = new Map<string, string>();
  
  if (cookies) {
    cookies.split(";").forEach((c) => {
      const [key, ...value] = c.trim().split("=");
      cookieMap.set(key, value.join("="));
    });
  }

  const tokens = getSessionTokensFromCookies(cookieMap);
  if (tokens) {
    return NextResponse.json({ loggedIn: true });
  }
  return NextResponse.json({ loggedIn: false }, { status: 401 });
}
