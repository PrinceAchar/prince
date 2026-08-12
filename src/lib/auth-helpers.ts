import { NextResponse } from "next/server";
import { refreshAccessToken } from "@/lib/shopify-customer";

const SESSION_COOKIE = "__customer_session";
const PKCE_COOKIE = "__pkce_state";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

interface PkceState {
  state: string;
  codeVerifier: string;
}

function parseCookieHeader(header: string | null): Map<string, string> {
  const map = new Map<string, string>();
  if (header) {
    header.split(";").forEach((c) => {
      const [key, ...value] = c.trim().split("=");
      map.set(key, decodeURIComponent(value.join("=")));
    });
  }
  return map;
}

export function getSessionTokensFromCookies(
  request: Request
): SessionTokens | null {
  const cookies = parseCookieHeader(request.headers.get("cookie"));
  const raw = cookies.get(SESSION_COOKIE);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionTokens;
  } catch {
    return null;
  }
}

export function getPkceStateFromCookies(request: Request): PkceState | null {
  const cookies = parseCookieHeader(request.headers.get("cookie"));
  const raw = cookies.get(PKCE_COOKIE);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as PkceState;
  } catch {
    return null;
  }
}

function isAuthExpiryError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /401|unauthoriz|expired|token/i.test(msg);
}

/**
 * Runs an account API handler with the session's access token.
 *
 * If the access token has expired, it transparently refreshes it once,
 * retries the handler with the new token, and rewrites the session cookie
 * on the response. Returns 401 when no session exists or refresh fails.
 */
export async function withSessionToken(
  request: Request,
  handler: (accessToken: string) => Promise<NextResponse>
): Promise<NextResponse> {
  const tokens = getSessionTokensFromCookies(request);
  if (!tokens) {
    return NextResponse.json(
      { error: "not_authenticated", message: "No active session" },
      { status: 401 }
    );
  }

  try {
    return await handler(tokens.accessToken);
  } catch (err) {
    console.error("Account request failed:", err);
    if (!isAuthExpiryError(err)) {
      return NextResponse.json(
        { error: err instanceof Error ? err.message : String(err) },
        { status: 400 }
      );
    }

    try {
      const refreshed = await refreshAccessToken(tokens.refreshToken);
      const newTokens: SessionTokens = {
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token,
        idToken: tokens.idToken,
      };
      const response = await handler(newTokens.accessToken);
      response.cookies.set(SESSION_COOKIE, JSON.stringify(newTokens), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: SESSION_MAX_AGE,
        path: "/",
      });
      return response;
    } catch (refreshErr) {
      console.error("Session refresh failed:", refreshErr);
      return NextResponse.json(
        {
          error: "session_expired",
          message: "Your session has expired. Please log in again.",
        },
        { status: 401 }
      );
    }
  }
}
