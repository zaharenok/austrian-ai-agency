"use client";

import { createContext, useContext, useMemo, useState } from 'react';

type Locale = 'en' | 'de' | 'ru';
type TranslationValue = string | string[] | Record<string, unknown>;
type TranslationsRecord = Record<string, TranslationValue | Record<string, TranslationValue>>;

interface TranslationsContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string | string[];
  translations: TranslationsRecord;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export function TranslationsProvider({
  children,
  locale: initialLocale,
  translations
}: {
  children: React.ReactNode;
  locale: Locale;
  translations: TranslationsRecord;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  
  const t = useMemo(() => {
    return (key: string) => {
      const keys = key.split('.');
      let value: unknown = translations;
      
      for (const k of keys) {
        if (typeof value !== 'object' || value === null || !(k in value)) return key;
        value = (value as Record<string, unknown>)[k];
      }
      
      return value as string | string[];
    };
  }, [translations]);

  return (
    <TranslationsContext.Provider value={{ locale, setLocale, t, translations }}>
      {children}
    </TranslationsContext.Provider>
  );
}

export function useTranslations() {
  const context = useContext(TranslationsContext);
  
  if (context === undefined) {
    throw new Error('useTranslations must be used within a TranslationsProvider');
  }
  
  return context;
}