import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { ServiceWorkerRegistration } from "@/shared/ui/service-worker-registration";
import { Footer } from "@/widgets/footer";
import {
  COOKIE_CONSENT_KEY,
  type CookieConsent,
  readConsentServer,
  CookieConsentProvider,
} from "@/shared/providers/cookie-consent";
import { PostHogProvider } from "@/shared/providers/posthog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "London Tube Map",
  description: "London Tube Map with some quality of life features",
  appleWebApp: {
    title: "London Tube Map",
    capable: true,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const rawConsent = cookieStore.get(COOKIE_CONSENT_KEY)?.value;
  const initialConsent: CookieConsent | null = readConsentServer(rawConsent);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <CookieConsentProvider initialConsent={initialConsent}>
          <PostHogProvider>
            <main className="flex-1">{children}</main>
            <ServiceWorkerRegistration />
          </PostHogProvider>
        </CookieConsentProvider>
      </body>
    </html>
  );
}
