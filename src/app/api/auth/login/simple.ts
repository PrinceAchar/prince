import { NextResponse } from "next/server";

const PKCE_COOKIE = "__pkce_state";
const PKCE_MAX_AGE = 60 * 5; // 5 minutes

export async function GET(request: Request) {
  try {
    const { origin } = new URL(request.url);
    const redirectUri = `${origin}/api/auth/callback/simple`;
    
    // Generate a simple state for CSRF protection
    const state = Math.random().toString(36).substring(2, 15);
    
    // Create a mock OAuth URL for demonstration
    // In a real implementation, this would redirect to Shopify's OAuth
    const mockAuthUrl = new URL("https://example.com/oauth/authorize");
    mockAuthUrl.searchParams.set("client_id", process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID || "mock_client_id");
    mockAuthUrl.searchParams.set("redirect_uri", redirectUri);
    mockAuthUrl.searchParams.set("response_type", "code");
    mockAuthUrl.searchParams.set("state", state);
    mockAuthUrl.searchParams.set("scope", "openid email");

    console.log("Simple auth URL:", mockAuthUrl.toString());

    const response = NextResponse.redirect(mockAuthUrl.toString());
    response.cookies.set(
      PKCE_COOKIE,
      JSON.stringify({ state, codeVerifier: "mock_verifier" }),
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
    console.error("Simple login error:", error);
    return NextResponse.redirect(
      new URL("/account/login?error=auth_init_failed", request.url)
    );
  }
}