"use client";

import { useEffect } from "react";

const supportedLocales = ["de", "en", "ru"] as const;
const defaultLocale = "de";

function getBrowserLocale(): string {
  const languages = navigator.languages ?? [navigator.language];

  for (const language of languages) {
    const normalized = language?.toLowerCase();
    if (!normalized) continue;

    const match = supportedLocales.find((locale) => normalized.startsWith(locale));
    if (match) return match;
  }

  return defaultLocale;
}

export default function KiVerordnungRedirectPage() {
  useEffect(() => {
    const locale = getBrowserLocale();
    window.location.replace(`/${locale}/ki-verordnung/`);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-sm text-muted-foreground">Loading…</p>
      </div>
    </div>
  );
}
