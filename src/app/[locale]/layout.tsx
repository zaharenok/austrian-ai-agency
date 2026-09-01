import React from 'react';
import { Metadata } from 'next';
import '../globals.css';
import { TranslationsProvider } from '@/context/language-context';
import { MainHeader } from '@/components/ui/main-header';
import { ConsentBanner } from '@/components/ui/consent-banner';

const SITE_URL = 'https://aaagency.at';

const metadataByLocale: Record<string, { title: string; description: string }> = {
  de: {
    title: 'Austrian AI Agency — KI-Compliance & EU AI Act für Recruiting',
    description: 'Wir machen Ihr Recruiting EU AI Act-konform. KI-Audit, Umsetzung und Monitoring — Fixpreise ab €790. 58 Projekte für 23+ Unternehmen.',
  },
  en: {
    title: 'Austrian AI Agency — AI Compliance & EU AI Act for Recruiting',
    description: 'We make your recruiting EU AI Act-compliant. AI audit, implementation and monitoring — fixed prices from €790. 58 projects for 23+ companies.',
  },
  ru: {
    title: 'Austrian AI Agency — AI-комплаенс и EU AI Act для рекрутинга',
    description: 'Делаем ваш рекрутинг соответствующим EU AI Act. Аудит ИИ, внедрение и мониторинг — фиксированные цены от €790. 58 проектов.',
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = metadataByLocale[locale] || metadataByLocale.en;

  return {
    title: {
      default: m.title,
      template: `%s | Austrian AI Agency`,
    },
    description: m.description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        'de': '/de/',
        'en': '/en/',
        'ru': '/ru/',
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${locale}/`,
      siteName: 'Austrian AI Agency',
      locale: locale === 'de' ? 'de_AT' : locale === 'ru' ? 'ru_RU' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
    },
  };
}

async function getTranslations(locale: string) {
  try {
    return (await import(`../../locales/${locale}/common.json`)).default;
  } catch (error) {
    console.error(`Failed to load translations for ${locale}:`, error);
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
      <ConsentBanner />
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
