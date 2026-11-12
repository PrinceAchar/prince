import { NextResponse } from "next/server";
import { getSessionTokensFromCookies } from "./auth-helpers";

// Check if user is authenticated via Shopify Customer Account API
export async function isShopifyAuthenticated(request: Request): Promise<boolean> {
  const tokens = getSessionTokensFromCookies(request);
  return !!tokens;
}

// Get current user info from Shopify Customer Account API
export async function getCurrentUser(request: Request): Promise<any> {
  const tokens = getSessionTokensFromCookies(request);
  
  if (!tokens) {
    return null;
  }

  try {
    // For now, return mock data since we're having issues with the real API
    return {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      orders: [],
      addresses: []
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Redirect to login if not authenticated
export function requireAuth(request: Request): Response | null {
  if (!isShopifyAuthenticated(request)) {
    const url = new URL(request.url);
    return NextResponse.redirect(new URL(`/account/login?redirect=${encodeURIComponent(url.pathname)}`, url.origin));
  }
  return null;
}