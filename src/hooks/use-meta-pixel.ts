"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

declare global {
  interface Window {
    fbq?: (action: string, eventName: string, parameters?: Record<string, unknown>) => void;
  }
}

interface PageViewEvent {
  content_name: string;
  content_category: string;
}

// Page names for Meta Pixel tracking
const PAGE_NAMES: Record<string, Record<string, string>> = {
  "/": {
    en: "Home",
    de: "Startseite",
    ru: "Главная"
  },
  "/contact": {
    en: "Contact",
    de: "Kontakt",
    ru: "Контакты"
  },
  "/energyconsume": {
    en: "Energy Community",
    de: "Energiegemeinschaft",
    ru: "Энергосообщество"
  },
  "/vet": {
    en: "VetCall",
    de: "VetCall",
    ru: "VetCall"
  },
  "/vet/contact": {
    en: "VetCall Contact",
    de: "VetCall Kontakt",
    ru: "VetCall Контакты"
  }
};

const PAGE_CATEGORIES: Record<string, string> = {
  "/": "Home Page",
  "/contact": "Contact Page",
  "/energyconsume": "Landing Page",
  "/vet": "Product Page",
  "/vet/contact": "Contact Page"
};

export function trackMetaEvent(
  eventName: string,
  parameters?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, parameters);
  }
}

export function trackCustomEvent(
  eventName: string,
  parameters?: Record<string, unknown>
) {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", eventName, parameters);
  }
}

export function trackLead(source: string, value = 1.0, currency = "EUR") {
  trackMetaEvent("Lead", {
    content_name: source,
    content_category: "Lead Generation",
    value,
    currency
  });
}

export function trackContact(method: string) {
  trackMetaEvent("Contact", {
    content_name: method,
    content_category: "Contact Interaction"
  });
}

export function useMetaPixelPageView(locale: string) {
  const pathname = usePathname();

  useEffect(() => {
    // Remove locale from pathname for matching
    const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/";

    // Get page name for current locale
    const pageNames = PAGE_NAMES[pathWithoutLocale];
    const pageName = pageNames?.[locale] || pathWithoutLocale;
    const pageCategory = PAGE_CATEGORIES[pathWithoutLocale] || "Page View";

    // Track page view with details
    trackMetaEvent("PageView", {
      content_name: pageName,
      content_category: pageCategory
    });
  }, [pathname, locale]);
}

// Hook for tracking specific events on component mount
export function useMetaPixelEvent(
  eventName: string,
  parameters: Record<string, unknown>,
  dependencies: unknown[] = []
) {
  useEffect(() => {
    trackMetaEvent(eventName, parameters);
  }, dependencies);
}
