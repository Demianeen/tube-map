"use client";

import { Button } from "@/shared/ui/button";
import { cn } from "@/shared/lib/utils";
import { CookieIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { useCookieConsent } from "@/shared/providers/cookie-consent";

interface CookieConsentProps {
  variant?: "default" | "small" | "minimal";
  onAcceptCallback?: () => void;
  onDeclineCallback?: () => void;
  forceOpen?: boolean;
}

export const CookieConsent = ({
  variant = "default",
  onAcceptCallback,
  onDeclineCallback,
  forceOpen = false,
}: CookieConsentProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const { consent, acceptAll, declineAll } = useCookieConsent();
  const acceptButtonRef = useRef<HTMLButtonElement | null>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);

  const accept = () => {
    setIsOpen(false);
    acceptAll?.();
    setTimeout(() => {
      setHide(true);
      previousFocusedElementRef.current?.focus();
    }, 700);
    onAcceptCallback?.();
  };

  const decline = () => {
    setIsOpen(false);
    declineAll?.();
    setTimeout(() => {
      setHide(true);
      previousFocusedElementRef.current?.focus();
    }, 700);
    onDeclineCallback?.();
  };

  useEffect(() => {
    if (forceOpen) {
      setHide(false);
      setIsOpen(true);
      previousFocusedElementRef.current =
        (document.activeElement as HTMLElement) ?? null;
      const id = window.requestAnimationFrame(() => {
        acceptButtonRef.current?.focus();
      });
      return () => window.cancelAnimationFrame(id);
    }
    if (consent.decided) {
      setHide(true);
      return;
    }
    setIsOpen(true);
    previousFocusedElementRef.current =
      (document.activeElement as HTMLElement) ?? null;
    const id = window.requestAnimationFrame(() => {
      acceptButtonRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(id);
  }, [consent.decided, forceOpen]);

  return variant === "default" ? (
    <div
      className={cn(
        "fixed z-[1000] bottom-0 left-0 right-0 p-4 sm:p-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden",
      )}
      role="region"
      aria-live="polite"
      aria-labelledby="cookie-consent-title"
    >
      <div className="dark:bg-card bg-background rounded-lg sm:rounded-md border border-border shadow-lg">
        <div className="grid gap-2">
          <div className="border-b border-border h-12 sm:h-14 flex items-center justify-between p-3 sm:p-4">
            <h1
              id="cookie-consent-title"
              className="text-base sm:text-lg font-medium"
            >
              We use cookies
            </h1>
            <CookieIcon
              aria-hidden="true"
              className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem]"
            />
          </div>
          <div className="p-3 sm:p-4">
            <p className="text-xs sm:text-sm font-normal text-start text-muted-foreground">
              We use cookies to ensure you get the best experience on our
              website. For more information on how we use cookies, please see
              our cookie policy.
              <br />
              <br />
              <span className="text-xs">
                By clicking{" "}
                <span className="font-medium text-black dark:text-white">
                  Accept
                </span>
                , you agree to our use of cookies.
              </span>
              <br />
              <a href="/legal/cookies" className="text-xs underline">
                Learn more.
              </a>
            </p>
          </div>
          <div className="grid grid-cols-2 items-center gap-2 p-3 sm:p-4 sm:py-5 border-t border-border dark:bg-background/20">
            <Button
              ref={acceptButtonRef}
              onClick={accept}
              variant="default"
              className="w-full"
            >
              Accept
            </Button>
            <Button onClick={decline} variant="outline" className="w-full">
              Decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : variant === "small" ? (
    <div
      className={cn(
        "fixed z-[1000] bottom-0 left-0 right-0 p-4 sm:p-0 sm:left-4 sm:bottom-4 w-full sm:max-w-md duration-700",
        !isOpen
          ? "transition-[opacity,transform] translate-y-8 opacity-0"
          : "transition-[opacity,transform] translate-y-0 opacity-100",
        hide && "hidden",
      )}
      role="region"
      aria-live="polite"
      aria-labelledby="cookie-consent-title"
    >
      <div className="m-0 sm:m-3 dark:bg-card bg-background border border-border rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-3">
          <h1
            id="cookie-consent-title"
            className="text-base sm:text-lg font-medium"
          >
            We use cookies
          </h1>
          <CookieIcon
            aria-hidden="true"
            className="h-4 w-4 sm:h-[1.2rem] sm:w-[1.2rem]"
          />
        </div>
        <div className="p-3 -mt-2">
          <p className="text-xs sm:text-sm text-left text-muted-foreground">
            We use cookies to ensure you get the best experience on our website.
            For more information on how we use cookies, please see our{" "}
            <Link href="/legal/cookies" className="text-xs underline">
              cookie policy
            </Link>
            .
          </p>
        </div>
        <div className="grid grid-cols-2 items-center gap-2 p-3 mt-2 border-t">
          <Button ref={acceptButtonRef} onClick={accept} className="w-full">
            Accept
          </Button>
          <Button onClick={decline} className="w-full" variant="outline">
            Decline
          </Button>
        </div>
      </div>
    </div>
  ) : (
    variant === "minimal" && (
      <div
        className={cn(
          "fixed z-[1000] bottom-0 left-0 right-0 p-4 sm:p-0 sm:left-4 sm:bottom-4 w-full sm:max-w-[300px] duration-700",
          !isOpen
            ? "transition-[opacity,transform] translate-y-8 opacity-0"
            : "transition-[opacity,transform] translate-y-0 opacity-100",
          hide && "hidden",
        )}
        role="region"
        aria-live="polite"
        aria-labelledby="cookie-consent-title"
      >
        <div className="m-0 sm:m-3 dark:bg-card bg-background border border-border rounded-lg shadow-lg">
          <div className="p-3 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <CookieIcon
                aria-hidden="true"
                className="h-3 w-3 sm:h-4 sm:w-4"
              />
              <span
                id="cookie-consent-title"
                className="text-xs sm:text-sm font-medium"
              >
                Cookie Notice
              </span>
            </div>
          </div>
          <div className="p-3">
            <p className="text-[11px] sm:text-xs text-muted-foreground">
              We use cookies to enhance your browsing experience.
            </p>
            <div className="grid grid-cols-2 items-center gap-2 mt-3">
              <Button
                ref={acceptButtonRef}
                onClick={accept}
                variant="default"
                className="w-full"
              >
                Accept
              </Button>
              <Button onClick={decline} variant="ghost" className="w-full">
                Decline
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
