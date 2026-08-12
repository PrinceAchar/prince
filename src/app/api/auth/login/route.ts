import { NextResponse } from "next/server";
import { discoverAuthEndpoints } from "@/lib/shopify-customer";
import {
  generateCodeVerifier,
  generateCodeChallenge,
  generateState,
} from "@/lib/auth";

const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID!;
const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;

const PKCE_COOKIE = "__pkce_state";
const PKCE_MAX_AGE = 60 * 5; // 5 minutes

export async function GET(request: Request) {
  try {
    const config = await discoverAuthEndpoints();
    const { origin } = new URL(request.url);
    const redirectUri = `${origin}/api/auth/callback`;

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateState();

    const authUrl = new URL(config.authorization_endpoint);
    authUrl.searchParams.set("scope", "openid email customer-account-api:full");
    authUrl.searchParams.set("client_id", CLIENT_ID);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");

    const response = NextResponse.redirect(authUrl.toString());
    response.cookies.set(
      PKCE_COOKIE,
      JSON.stringify({ state, codeVerifier }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: PKCE_MAX_AGE,
        path: "/",
      }
    );

    return response;
  } catch (error) {
    console.error("Login initiation error:", error);
    return NextResponse.redirect(
      new URL("/account/login?error=auth_init_failed", request.url)
    );
  }
}
