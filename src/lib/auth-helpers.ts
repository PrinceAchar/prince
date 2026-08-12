const SESSION_COOKIE = "__customer_session";
const PKCE_COOKIE = "__pkce_state";

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
