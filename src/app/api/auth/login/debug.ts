import { NextResponse } from "next/server";
import { discoverAuthEndpoints } from "@/lib/shopify-customer";
import {
  generateCodeVerifier,
  generateCodeChallenge,
  generateState,
} from "@/lib/auth";

const CLIENT_ID = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID!;

const PKCE_COOKIE = "__pkce_state";
const PKCE_MAX_AGE = 60 * 5; // 5 minutes

export async function GET(request: Request) {
  try {
    console.log("Debug: Starting login process");
    console.log("CLIENT_ID:", CLIENT_ID ? "Set" : "Missing");
    
    if (!CLIENT_ID) {
      console.error("CLIENT_ID is not configured");
      return NextResponse.redirect(
        new URL("/account/login?error=client_id_missing", request.url)
      );
    }
    
    console.log("Discovering auth endpoints...");
    const config = await discoverAuthEndpoints();
    console.log("Auth endpoints discovered:", config);
    
    const { origin } = new URL(request.url);
    const redirectUri = `${origin}/api/auth/callback`;

    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    const state = generateState();

    console.log("Generated PKCE values:", {
      codeVerifier: codeVerifier.substring(0, 20) + "...",
      codeChallenge: codeChallenge.substring(0, 20) + "...",
      state: state.substring(0, 20) + "..."
    });

    const authUrl = new URL(config.authorization_endpoint);
    authUrl.searchParams.set("scope", "openid email customer-account-api:full");
    authUrl.searchParams.set("client_id", CLIENT_ID);
    authUrl.searchParams.set("response_type", "code");
    authUrl.searchParams.set("redirect_uri", redirectUri);
    authUrl.searchParams.set("state", state);
    authUrl.searchParams.set("code_challenge", codeChallenge);
    authUrl.searchParams.set("code_challenge_method", "S256");

    console.log("Auth URL:", authUrl.toString());

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
    console.error("Debug: Login initiation error:", error);
    return NextResponse.redirect(
      new URL("/account/login?error=auth_init_failed", request.url)
    );
  }
}