import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/shopify-customer";
import { getSessionTokens, updateAccessToken } from "@/lib/auth";

export async function POST() {
  const tokens = await getSessionTokens();

  if (!tokens) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const refreshed = await refreshAccessToken(tokens.refreshToken);
    await updateAccessToken(refreshed.access_token);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json({ error: "Refresh failed" }, { status: 401 });
  }
}
