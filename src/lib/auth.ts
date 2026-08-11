import { cookies } from "next/headers";

const SESSION_COOKIE = "__customer_session";
const PKCE_COOKIE = "__pkce_state";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const PKCE_MAX_AGE = 60 * 5; // 5 minutes

// --- PKCE Helpers ---

export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(digest));
}

export function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

function base64UrlEncode(buffer: Uint8Array): string {
  let binary = "";
  for (const byte of buffer) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

// --- PKCE State Cookie (short-lived) ---

interface PkceState {
  state: string;
  codeVerifier: string;
}

export async function storePkceState(state: string, codeVerifier: string): Promise<string> {
  const cookieStore = await cookies();
  const data: PkceState = { state, codeVerifier };
  cookieStore.set(PKCE_COOKIE, JSON.stringify(data), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: PKCE_MAX_AGE,
    path: "/",
  });
  return PKCE_COOKIE;
}

export async function getAndClearPkceState(): Promise<PkceState | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(PKCE_COOKIE)?.value;
  if (!raw) return null;

  cookieStore.delete(PKCE_COOKIE);

  try {
    return JSON.parse(raw) as PkceState;
  } catch {
    return null;
  }
}

// --- Session Cookies (long-lived, HTTP-only) ---

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export async function setSessionTokens(tokens: SessionTokens): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, JSON.stringify(tokens), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function getSessionTokens(): Promise<SessionTokens | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionTokens;
  } catch {
    return null;
  }
}

export async function updateAccessToken(accessToken: string): Promise<void> {
  const existing = await getSessionTokens();
  if (!existing) return;

  const cookieStore = await cookies();
  cookieStore.set(
    SESSION_COOKIE,
    JSON.stringify({ ...existing, accessToken }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MAX_AGE,
      path: "/",
    }
  );
}

export async function clearSessionTokens(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function isLoggedIn(): Promise<boolean> {
  const tokens = await getSessionTokens();
  return tokens !== null;
}
