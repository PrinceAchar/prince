import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "@/lib/auth-helpers";

// Always responds 200 so the browser console and access logs aren't filled
// with 401s on every page view for signed-out visitors.
export async function GET(request: Request) {
  const tokens = getSessionTokensFromCookies(request);
  return NextResponse.json(
    { loggedIn: !!tokens },
    { headers: { "Cache-Control": "no-store" } }
  );
}
