import { NextResponse } from "next/server";

const SESSION_COOKIE = "__customer_session";

export async function GET() {
  const response = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"));
  
  // Clear the session cookie
  response.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  
  return response;
}