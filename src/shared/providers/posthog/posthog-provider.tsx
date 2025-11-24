"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

import { useCookieConsent } from "@/shared/providers/cookie-consent";

export const PostHogProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { consent } = useCookieConsent();

  // Initialize analytics only if consent is granted. If consent is withdrawn, opt out.
  useEffect(() => {
    if (consent.analytics) {
      posthog.opt_in_capturing();
    } else {
      posthog.opt_out_capturing();
    }
  }, [consent.analytics]);

  return <>{children}</>;
};
