"use client";

import { useContext, useMemo } from "react";

import { CookieConsentContext } from "./provider";
import { defaultCookieConsent } from "./types";

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  return useMemo(
    () => ({
      consent: ctx?.consent ?? defaultCookieConsent,
      setConsent: ctx?.setConsent,
      acceptAll: ctx?.acceptAll,
      declineAll: ctx?.declineAll,
      openSettings: ctx?.openSettings,
      isSettingsOpen: ctx?.isSettingsOpen ?? false,
    }),
    [ctx],
  );
}
