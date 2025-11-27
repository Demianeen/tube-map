import { defaultCache } from "@serwist/next/worker";
import { Serwist } from "serwist";
import { BackgroundSyncPlugin, NetworkOnly } from "serwist";
import type { PrecacheEntry, SerwistGlobalConfig } from "serwist";

declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
});

// Configure Background Sync for PostHog offline event capture
const posthogSyncPlugin = new BackgroundSyncPlugin("posthog-events");

// Register route for PostHog API requests (event capture endpoint)
// This intercepts POST requests to /relay-Fc5u/e/ and queues them if they fail
serwist.registerCapture(
  ({ url }) => {
    console.log("CAPTURING POSTHOG EVENT", url);
    // Match PostHog event API endpoint, but exclude static assets
    return (
      url.pathname.startsWith("/relay-Fc5u/e/") &&
      !url.pathname.startsWith("/relay-Fc5u/static/")
    );
  },
  new NetworkOnly({
    plugins: [posthogSyncPlugin],
  }),
  "POST",
);

serwist.addEventListeners();
