/**
 * Single source of truth for who may use admin-only server endpoints.
 * Keep in sync with Firestore security rules (they must enforce the same
 * allowlist — client-side checks alone are bypassable).
 */
export const ADMIN_EMAILS = [
  "pannalaltavinderkumar@gmail.com",
  "hi@acaditya10.tech",
];
