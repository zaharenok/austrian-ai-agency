import type { Metadata } from 'next';
import { VetCallClient } from './vet-client';
import translations from '@/locales/de/common.json';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

interface PageProps {
  params: Promise<{
    locale: 'en' | 'de' | 'ru';
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  let meta = translations.vetcall.meta;

  if (locale === 'en') {
    const enTranslations = await import('@/locales/en/common.json');
    meta = enTranslations.default.vetcall.meta;
  } else if (locale === 'ru') {
    const ruTranslations = await import('@/locales/ru/common.json');
    meta = ruTranslations.default.vetcall.meta;
  }

  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      type: 'website',
      locale: locale === 'de' ? 'de_AT' : locale === 'en' ? 'en_US' : 'ru_RU',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
    },
  };
}

export default async function VetCallPage({ params }: PageProps) {
  const { locale } = await params;
  return <VetCallClient locale={locale} />;
}
