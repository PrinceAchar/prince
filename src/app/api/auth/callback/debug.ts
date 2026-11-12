import { NextResponse } from "next/server";
import { exchangeCodeForAccessToken } from "@/lib/shopify-customer";
import { getPkceStateFromCookies } from "@/lib/auth-helpers";

const SESSION_COOKIE = "__customer_session";
const PKCE_COOKIE = "__pkce_state";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  console.log("Debug: Callback received", {
    code: code ? "Present" : "Missing",
    state: state ? "Present" : "Missing",
    error: error || "None"
  });

  if (error) {
    console.error("OAuth error:", error);
    return NextResponse.redirect(
      new URL(`/account/login?error=${error}`, url.origin)
    );
  }

  if (!code || !state) {
    console.error("Missing required parameters:", { code, state });
    return NextResponse.redirect(
      new URL("/account/login?error=missing_params", url.origin)
    );
  }

  const pkceState = getPkceStateFromCookies(request);
  console.log("PKCE state from cookies:", pkceState ? "Present" : "Missing");

  if (!pkceState || pkceState.state !== state) {
    console.error("PKCE state mismatch:", {
      received: state,
      expected: pkceState?.state
    });
    return NextResponse.redirect(
      new URL("/account/login?error=invalid_state", url.origin)
    );
  }

  try {
    console.log("Exchanging code for access token...");
    const redirectUri = `${url.origin}/api/auth/callback`;
    const tokens = await exchangeCodeForAccessToken(
      code,
      pkceState.codeVerifier,
      redirectUri
    );
    
    console.log("Token exchange successful:", {
      hasAccessToken: !!tokens.access_token,
      hasRefreshToken: !!tokens.refresh_token,
      hasIdToken: !!tokens.id_token
    });

    const sessionData = JSON.stringify({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
    });

    const response = NextResponse.redirect(new URL("/account", url.origin));
    response.cookies.set(SESSION_COOKIE, sessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    });
    response.cookies.set(PKCE_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 0,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.redirect(
      new URL("/account/login?error=token_exchange_failed", url.origin)
    );
  }
}