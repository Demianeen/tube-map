import { type CookieConsentValue } from "./types";

export const COOKIE_CONSENT_KEY = "cookie-consent";

function canUseDocument(): boolean {
  return typeof document !== "undefined";
}

function canUseWindow(): boolean {
  return typeof window !== "undefined";
}

export function areCookiesEnabled(): boolean {
  if (!canUseDocument()) return false;
  try {
    // ck_test is a session cookie (no max-age or expires means it expires when browser closes)
    // This matches the Cookie Policy which states it's a "Session" cookie
    document.cookie = "ck_test=1; samesite=lax; path=/";
    return document.cookie.includes("ck_test=");
  } catch {
    return false;
  }
}

export function readConsentClient(): CookieConsentValue | null {
  if (!canUseDocument()) return null;
  // cookie first
  try {
    const match = new RegExp(`${COOKIE_CONSENT_KEY}=([^;]+)`).exec(
      document.cookie,
    );
    if (match)
      return JSON.parse(decodeURIComponent(match[1])) as CookieConsentValue;
  } catch {}
  // fallback to localStorage
  try {
    if (!canUseWindow()) return null;
    const localStorageValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    return localStorageValue
      ? (JSON.parse(localStorageValue) as CookieConsentValue)
      : null;
  } catch {}
  return null;
}

export function writeConsentClient(consent: CookieConsentValue) {
  if (!canUseWindow()) return;
  const value = encodeURIComponent(JSON.stringify(consent));
  try {
    if (areCookiesEnabled()) {
      // Cookie consent stored for 90 days as stated in Cookie Policy
      document.cookie = `${COOKIE_CONSENT_KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 90}; samesite=lax`;
      return;
    }
  } catch {}
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // ignore: no persistence available
  }
}

// Server-side cookie read helper (Next.js app router)
export function readConsentServer(
  rawCookieValue: string | undefined,
): CookieConsentValue | null {
  try {
    if (!rawCookieValue) return null;
    return JSON.parse(decodeURIComponent(rawCookieValue)) as CookieConsentValue;
  } catch {
    return null;
  }
}
