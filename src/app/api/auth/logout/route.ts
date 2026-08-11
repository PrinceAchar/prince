import { NextResponse } from "next/server";
import { clearSessionTokens } from "@/lib/auth";

export async function POST() {
  await clearSessionTokens();
  return NextResponse.json({ success: true });
}

export async function GET(request: Request) {
  await clearSessionTokens();
  const { origin } = new URL(request.url);
  return NextResponse.redirect(new URL("/", origin));
}
