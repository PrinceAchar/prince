const SESSION_COOKIE = "__customer_session";

interface SessionTokens {
  accessToken: string;
  refreshToken: string;
  idToken: string;
}

export function getSessionTokensFromCookies(
  cookies: Map<string, string>
): SessionTokens | null {
  const raw = cookies.get(SESSION_COOKIE);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionTokens;
  } catch {
    return null;
  }
}
