/**
 * Analytics events. Only meaningful business events are tracked.
 * Events are sent to GA4 only after the visitor has accepted analytics cookies.
 */
export type AnalyticsEvent = "project_view" | "sector_view";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const CONSENT_KEY = "ample-consent-v1";
export type ConsentValue = "granted" | "denied";

export function readConsent(): ConsentValue | null {
  try {
    const v = window.localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}
