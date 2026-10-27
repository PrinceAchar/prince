/**
 * Server-side Firebase Admin SDK (never imported by client code).
 *
 * Used to verify that requests to admin API routes really come from an
 * allowlisted admin account. Requires these SERVER-only env vars:
 *   FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   (in Vercel: keep "Newline" formatting OFF; we handle \n escapes here).
 */
import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth, type Auth } from "firebase-admin/auth";
import { ADMIN_EMAILS } from "./admin-emails";

let adminApp: App | null = null;
let adminAuth: Auth | null = null;

function getAdminAuth(): Auth | null {
  if (adminAuth) return adminAuth;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    // Misconfigured server — callers get a clear error instead of a crash.
    return null;
  }

  if (getApps().length === 0) {
    adminApp = initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        // Vercel/other hosts may store real newlines or escaped \n sequences.
        privateKey: privateKey.replace(/\\n/g, "\n"),
      }),
    });
  } else {
    adminApp = getApps()[0];
  }

  adminAuth = getAuth(adminApp);
  return adminAuth;
}

/**
 * Verifies a Firebase ID token and checks the email against ADMIN_EMAILS.
 * Returns the admin's email on success, null otherwise (never throws).
 */
export async function verifyAdminIdToken(idToken: string): Promise<string | null> {
  try {
    const auth = getAdminAuth();
    if (!auth) return null;
    const decoded = await auth.verifyIdToken(idToken);
    const email = decoded.email?.toLowerCase() ?? "";
    return ADMIN_EMAILS.includes(email) ? email : null;
  } catch {
    return null;
  }
}
