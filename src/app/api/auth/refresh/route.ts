import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/shopify-customer";
import { getSessionTokens } from "@/lib/auth";

const SESSION_COOKIE = "__customer_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function POST() {
  const tokens = await getSessionTokens();

  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const refreshed = await refreshAccessToken(tokens.refreshToken);

    const sessionData = JSON.stringify({
      accessToken: refreshed.access_token,
      refreshToken: refreshed.refresh_token,
      idToken: tokens.idToken,
    });

    const response = NextResponse.json({ success: true });
    response.cookies.set(SESSION_COOKIE, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}
