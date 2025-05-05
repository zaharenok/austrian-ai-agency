import React from 'react';
import { Metadata } from 'next';
import '../globals.css';
import { TranslationsProvider } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

export const metadata: Metadata = {
  title: 'Austrian AI Agency',
  description: 'Innovative AI solutions for business automation and optimization',
};

// Импортируем переводы для каждой локали
async function getTranslations(locale: string) {
  try {
    return (await import(`../../locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error);
    // Возвращаем английские переводы в случае ошибки
    return (await import('../../locales/en/common.json')).default;
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const translations = await getTranslations(locale);

  return (
    <TranslationsProvider locale={locale as 'en' | 'de' | 'ru'} translations={translations}>
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      {children}
    </TranslationsProvider>
  );
}

export function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'ru' },
  ];
}