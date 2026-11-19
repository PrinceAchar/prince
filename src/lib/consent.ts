/**
 * Cookie consent state, shared by the banner and the GTM loader.
 *
 * GTM is loaded with Consent Mode v2 defaults of "denied" in GoogleTagManager.
 * Only this module flips them to "granted", after the visitor explicitly
 * accepts. The choice is persisted so the banner doesn't reappear on every
 * page load.
 */

export type ConsentChoice = "granted" | "denied";

export const CONSENT_STORAGE_KEY = "pa-cookie-consent";
export const CONSENT_SETTINGS_EVENT = "pa:open-cookie-settings";

function consentState(choice: ConsentChoice): Record<string, string | number> {
  const granted = choice === "granted";
  return {
    analytics_storage: granted ? "granted" : "denied",
    ad_storage: granted ? "granted" : "denied",
    ad_user_data: granted ? "granted" : "denied",
    ad_personalization: granted ? "granted" : "denied",
  };
}

export function getConsentChoice(): ConsentChoice | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
}

export function saveConsentChoice(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
  } catch {
    // Private mode / storage disabled — the choice still applies this session.
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(["consent", "update", consentState(choice)]);
}

/** Lets the footer reopen the banner so a visitor can change their mind. */
export function openConsentSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(CONSENT_SETTINGS_EVENT));
}
