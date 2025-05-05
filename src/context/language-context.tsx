"use client";

import { createContext, useContext, useMemo, useState } from 'react';

type Locale = 'en' | 'de' | 'ru';

interface TranslationsContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  translations: Record<string, any>;
}

const TranslationsContext = createContext<TranslationsContextType | undefined>(undefined);

export function TranslationsProvider({
  children,
  locale: initialLocale,
  translations
}: {
  children: React.ReactNode;
  locale: Locale;
  translations: Record<string, any>;
}) {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  
  const t = useMemo(() => {
    return (key: string) => {
      const keys = key.split('.');
      let value = translations;
      
      for (const k of keys) {
        if (!value[k]) return key;
        value = value[k];
      }
      
      return value as string;
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