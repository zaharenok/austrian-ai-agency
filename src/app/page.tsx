"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const supportedLocales = ['en', 'de', 'ru'] as const;
const defaultLocale = 'en';

function getCookieLocale(): string | null {
  const cookieValue = document.cookie
    .split(';')
    .map((item) => item.trim())
    .find((part) => part.startsWith('NEXT_LOCALE='));

  if (!cookieValue) return null;

  const value = cookieValue.split('=')[1];
  return supportedLocales.includes(value as typeof supportedLocales[number]) ? value : null;
}

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

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    const cookieLocale = getCookieLocale();
    const browserLocale = getBrowserLocale();
    const locale = cookieLocale ?? browserLocale;

    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <span className="text-sm text-muted-foreground">Loading…</span>
    </div>
  );
}
