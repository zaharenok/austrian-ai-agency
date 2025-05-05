import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { TranslationsProvider } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/ui/language-switcher';

const inter = Inter({ subsets: ['latin', 'cyrillic'] });

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
  params: { locale } 
}: { 
  children: ReactNode;
  params: { locale: string; }
}) {
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