"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "@/context/language-context";

const CONSENT_KEY = "aaa-cookie-consent";
const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "").trim();
const FB_PIXEL_ID = (process.env.NEXT_PUBLIC_FB_PIXEL_ID || "").trim();

function loadAnalytics() {
  if (typeof window === "undefined") return;

  // --- Google Analytics ---
  if (GA_ID) {
    const existing = document.getElementById("ga-consent-script");
    if (!existing) {
      const script = document.createElement("script");
      script.id = "ga-consent-script";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
      document.head.appendChild(script);

      const w = window as unknown as { dataLayer: unknown[]; gtag?: (...args: unknown[]) => void };
      w.dataLayer = w.dataLayer || [];
      function gtag(...args: unknown[]) {
        w.dataLayer.push(args);
      }
      w.gtag = gtag;
      gtag("js", new Date());
      gtag("config", GA_ID);
    }
  }

  // --- Meta Pixel ---
  if (FB_PIXEL_ID) {
    const existingFb = document.getElementById("fb-pixel-script");
    if (!existingFb) {
      // Standard Facebook Pixel: queue first, script second, init after load
      /* eslint-disable */
      (function (w: Window & { fbq?: (...args: unknown[]) => void; _fbq?: unknown }, d: Document) {
        if (w.fbq) return;
        const n = function () {
          // eslint-disable-next-line prefer-rest-params
          (n as unknown as { q: unknown[] }).q = (n as unknown as { q: unknown[] }).q || [];
          (n as unknown as { q: unknown[] }).q.push(arguments);
        } as unknown as { q: unknown[] };
        w.fbq = n as unknown as (...args: unknown[]) => void;
        w._fbq = n;
        const t = d.createElement("script") as HTMLScriptElement;
        t.id = "fb-pixel-script";
        t.async = true;
        t.src = "https://connect.facebook.net/en_US/fbevents.js";
        t.onload = function () {
          // Script loaded — now safe to init
          w.fbq!("init", FB_PIXEL_ID);
          w.fbq!("track", "PageView");
        };
        const s = d.getElementsByTagName("script")[0];
        s?.parentNode?.insertBefore(t, s);
      })(window, document);
      /* eslint-enable */
    }
  }
}

function removeAnalytics() {
  // Remove GA
  const gaScript = document.getElementById("ga-consent-script");
  if (gaScript) gaScript.remove();
  const legacy = document.querySelector('script[src*="googletagmanager.com/gtag/js"]');
  if (legacy) legacy.remove();

  // Remove Meta Pixel
  const fbScript = document.getElementById("fb-pixel-script");
  if (fbScript) fbScript.remove();
}

export function ConsentBanner() {
  const { t, locale } = useTranslations();
  const [visible, setVisible] = useState(false);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === "accepted") {
      loadAnalytics();
      setDecided(true);
    } else if (stored === "declined") {
      setDecided(true);
    } else {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    loadAnalytics();
    setVisible(false);
    setDecided(true);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    removeAnalytics();
    setVisible(false);
    setDecided(true);
  };

  if (!visible) return null;

  const text =
    typeof t("cookieBanner.text") === "string"
      ? (t("cookieBanner.text") as string)
      : "Wir verwenden Cookies, um die Nutzung unserer Website zu analysieren. Ihre Zustimmung ist jederzeit widerrufbar.";
  const acceptLabel =
    typeof t("cookieBanner.accept") === "string" ? (t("cookieBanner.accept") as string) : "Akzeptieren";
  const declineLabel =
    typeof t("cookieBanner.decline") === "string" ? (t("cookieBanner.decline") as string) : "Ablehnen";
  const privacyLabel =
    typeof t("cookieBanner.privacy") === "string" ? (t("cookieBanner.privacy") as string) : "Datenschutz";

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 left-4 right-4 z-[100] mx-auto max-w-2xl rounded-2xl border border-primary/10 bg-white/95 p-5 shadow-2xl backdrop-blur-lg dark:bg-zinc-900/95 sm:left-auto"
    >
      <p className="text-sm leading-relaxed text-muted-foreground">{text}</p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={accept}
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          {acceptLabel}
        </button>
        <button
          onClick={decline}
          className="rounded-full border border-border px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted"
        >
          {declineLabel}
        </button>
        <Link
          href={`/${locale}/datenschutz`}
          className="ml-auto text-xs text-muted-foreground underline underline-offset-2 hover:text-foreground"
        >
          {privacyLabel}
        </Link>
      </div>
    </div>
  );
}
