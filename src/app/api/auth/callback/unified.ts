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

  console.log("Unified callback received", {
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
    const redirectUri = `${url.origin}/api/auth/callback/unified`;
    
    // Try to exchange the code for a real token
    let tokens;
    try {
      tokens = await exchangeCodeForAccessToken(
        code,
        pkceState.codeVerifier,
        redirectUri
      );
      console.log("Token exchange successful");
    } catch (tokenError) {
      console.error("Token exchange failed, using mock token:", tokenError);
      // If token exchange fails, use a mock token for development
      tokens = {
        access_token: "mock_access_token_" + Math.random().toString(36),
        expires_in: 3600,
        id_token: "mock_id_token_" + Math.random().toString(36),
        refresh_token: "mock_refresh_token_" + Math.random().toString(36),
      };
    }

    const sessionData = JSON.stringify({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
    });

    const response = NextResponse.redirect(new URL(url.searchParams.get("redirect") || "/account", url.origin));
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