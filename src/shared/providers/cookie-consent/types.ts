export interface CookieConsentValue {
  necessary: true;
  analytics: boolean;
  // true once the user has explicitly accepted or declined
  decided: boolean;
}

export const defaultCookieConsent: CookieConsentValue = {
  necessary: true,
  analytics: false,
  decided: false,
};
