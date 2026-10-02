"use client";

import Script from "next/script";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_KEY, readConsent, type ConsentValue } from "@/lib/analytics";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CONSENT_EVENT = "ample-consent-change";

function subscribe(callback: () => void) {
  window.addEventListener(CONSENT_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CONSENT_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function useConsent() {
  return useSyncExternalStore(subscribe, readConsent, () => "unknown" as const);
}

export function setConsent(value: ConsentValue) {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable: choice applies to this page view only */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Loads GA4 only when a measurement ID is configured and the visitor has consented. */
export function Analytics() {
  const consent = useConsent();
  if (!GA_ID || consent !== "granted") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
      </Script>
    </>
  );
}

/** Cookie banner shown until the visitor chooses. Only rendered when analytics is configured. */
export function ConsentBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener("ample-open-consent", reopen);
    return () => window.removeEventListener("ample-open-consent", reopen);
  }, []);

  const choose = useCallback((value: ConsentValue) => {
    setConsent(value);
    setReopened(false);
  }, []);

  if (!GA_ID) return null;
  if (consent === "unknown") return null;
  if (consent !== null && !reopened) return null;

  return (
    <section
      aria-label="Cookie preferences"
      className="on-dark fixed inset-x-3 bottom-3 z-50 mx-auto max-w-2xl rounded-2xl bg-navy-900 p-5 text-ivory shadow-dossier sm:inset-x-6 sm:bottom-6 sm:p-6"
    >
      <p className="text-[0.9375rem] leading-relaxed text-slate-200">
        We would like to use analytics cookies to understand which pages are useful. They are only set if you accept.{" "}
        <a href="/cookie-policy/" className="text-brand-200 underline underline-offset-2">
          Cookie Policy
        </a>
      </p>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="min-h-11 rounded-2xl bg-brand-400 px-5 font-semibold text-navy-900 hover:bg-brand-200"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="min-h-11 rounded-2xl border border-ivory/40 px-5 font-semibold text-ivory hover:bg-ivory/10"
        >
          Decline
        </button>
      </div>
    </section>
  );
}

export function CookieSettingsButton() {
  if (!GA_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("ample-open-consent"))}
      className="min-h-11 text-left text-sm text-slate-300 underline-offset-4 hover:text-ivory hover:underline"
    >
      Cookie settings
    </button>
  );
}
