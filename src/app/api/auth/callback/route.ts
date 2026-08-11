import { NextResponse } from "next/server";
import { exchangeCodeForAccessToken } from "@/lib/shopify-customer";
import { getAndClearPkceState, setSessionTokens } from "@/lib/auth";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const error = url.searchParams.get("error");

  if (error) {
    return NextResponse.redirect(
      new URL(`/account/login?error=${error}`, url.origin)
    );
  }

  if (!code || !state) {
    return NextResponse.redirect(
      new URL("/account/login?error=missing_params", url.origin)
    );
  }

  const pkceState = await getAndClearPkceState();

  if (!pkceState || pkceState.state !== state) {
    return NextResponse.redirect(
      new URL("/account/login?error=invalid_state", url.origin)
    );
  }

  try {
    const redirectUri = `${url.origin}/api/auth/callback`;
    const tokens = await exchangeCodeForAccessToken(
      code,
      pkceState.codeVerifier,
      redirectUri
    );

    await setSessionTokens({
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      idToken: tokens.id_token,
    });

    return NextResponse.redirect(new URL("/account", url.origin));
  } catch (error) {
    console.error("Token exchange error:", error);
    return NextResponse.redirect(
      new URL("/account/login?error=token_exchange_failed", url.origin)
    );
  }
}
