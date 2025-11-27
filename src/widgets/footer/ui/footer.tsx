"use client";

import Link from "next/link";
import { useCookieConsent } from "@/shared/providers/cookie-consent";

export function Footer() {
  const { openSettings } = useCookieConsent();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/legal/privacy"
            className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          <span aria-hidden="true">•</span>
          <Link
            href="/legal/cookies"
            className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            Cookie Policy
          </Link>
          <span aria-hidden="true">•</span>
          <button
            type="button"
            onClick={() => openSettings?.()}
            className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
          >
            Cookie settings
          </button>
        </nav>
      </div>
    </footer>
  );
}
