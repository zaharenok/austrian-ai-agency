import type { Metadata } from 'next';
import { HomeClient } from "./home-client";

export const dynamicParams = false;

const SITE_URL = 'https://aaagency.at';

const titles: Record<string, string> = {
  de: 'KI-Compliance & EU AI Act für Recruiting — Austrian AI Agency',
  en: 'AI Compliance & EU AI Act for Recruiting — Austrian AI Agency',
  ru: 'AI-комплаенс и EU AI Act для рекрутинга — Austrian AI Agency',
};

const descriptions: Record<string, string> = {
  de: 'Von KI-Reifegrad-Audit bis zur produktiven Umsetzung. Wir machen Ihr Recruiting EU AI Act-konform — schneller und günstiger als jeder Wettbewerber. 58 Projekte für 23+ Unternehmen.',
  en: 'From AI readiness audit to production deployment. We make your recruiting EU AI Act-compliant — faster and more affordably than any competitor. 58 projects for 23+ companies.',
  ru: 'От аудита готовности ИИ до внедрения в продакшн. Делаем ваш рекрутинг соответствующим EU AI Act — быстрее и дешевле конкурентов. 58 проектов для 23+ компаний.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        'de': 'KI-Compliance & EU AI Act für Recruiting — Austrian AI Agency',
        'en': 'AI Compliance & EU AI Act for Recruiting — Austrian AI Agency',
        'ru': 'AI-комплаенс и EU AI Act для рекрутинга — Austrian AI Agency',
      },
    },
  };
}

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default function LocaleHomePage() {
  return <HomeClient />;
}
