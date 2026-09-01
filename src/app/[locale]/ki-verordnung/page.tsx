import type { Metadata } from 'next';
import { EuAiActReadinessClient } from "../eu-ai-act-readiness/eu-ai-act-readiness-client";

export const dynamicParams = false;

const titles: Record<string, string> = {
  de: 'EU AI Act Readiness Check — Kostenloser KI-Check | Austrian AI Agency',
  en: 'EU AI Act Readiness Check — Free AI Assessment | Austrian AI Agency',
  ru: 'EU AI Act Readiness Check — Бесплатная оценка ИИ | Austrian AI Agency',
};

const descriptions: Record<string, string> = {
  de: 'Prüfen Sie in 5 Minuten, ob Ihre KI-Systeme EU AI Act-konform sind. Kostenloser Readiness Check für Recruiting-Unternehmen.',
  en: 'Check in 5 minutes whether your AI systems are EU AI Act-compliant. Free readiness check for recruiting companies.',
  ru: 'Проверьте за 5 минут, соответствуют ли ваши ИИ-системы EU AI Act. Бесплатная проверка для рекрутинговых компаний.',
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
      canonical: `/${locale}/ki-verordnung/`,
      languages: {
        'de': '/de/ki-verordnung/',
        'en': '/en/ki-verordnung/',
        'ru': '/ru/ki-verordnung/',
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "de" }, { locale: "en" }, { locale: "ru" }];
}

export default function KiVerordnungReadinessCheckPage() {
  return <EuAiActReadinessClient />;
}
