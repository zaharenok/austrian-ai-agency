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
  de: 'Individuelle KI-Agenten, Automatisierung und EU AI Act-Compliance — konzipiert und gebaut von einem Gründer in Wien, der selbst entwickelt.',
  en: 'Custom AI agents, automation and EU AI Act compliance — designed, built and shipped by a hands-on founder in Vienna.',
  ru: 'ИИ-агенты на заказ, автоматизация и комплаенс EU AI Act — проектирует и внедряет основатель-практик в Вене.',
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
      canonical: `${SITE_URL}/${locale}/`,
      languages: {
        'de': `${SITE_URL}/de/`,
        'en': `${SITE_URL}/en/`,
        'ru': `${SITE_URL}/ru/`,
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
