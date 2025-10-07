import React from 'react';
import { Metadata } from 'next';
import '../globals.css';
import { TranslationsProvider } from '@/context/language-context';
import { MainHeader } from '@/components/ui/main-header';

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
  params: Promise<{ locale: string }>;
}) {
  // Использование await для получения параметров в соответствии с требованиями Next.js 15
  const { locale } = await params;
  const translations = await getTranslations(locale);

  return (
    <TranslationsProvider locale={locale as 'en' | 'de' | 'ru'} translations={translations}>
      <div className="flex flex-col min-h-[100dvh]">
        <MainHeader />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
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
