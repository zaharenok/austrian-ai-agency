import type { Metadata } from 'next';
import { PaketeClient } from "./pakete-client";

export const dynamicParams = false;

const titles: Record<string, string> = {
  de: 'KI-Pakete & Preise — EU AI Act Compliance ',
  en: 'AI Packages & Pricing — EU AI Act Compliance ',
  ru: 'Пакеты ИИ и цены — EU AI Act комплаенс ',
};

const descriptions: Record<string, string> = {
  de: 'Transparente Preise für EU AI Act Compliance: KI-Inventur ab €790, Audit ab €2.500, Umsetzung ab €4.900, Monitoring ab €390/Monat.',
  en: 'Transparent pricing for EU AI Act compliance: AI inventory from €790, audit from €2,500, implementation from €4,900, monitoring from €390/month.',
  ru: 'Прозрачные цены на EU AI Act комплаенс: инвентаризация от €790, аудит от €2.500, внедрение от €4.900, мониторинг от €390/мес.',
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
      canonical: `/${locale}/ki-pakete/`,
      languages: {
        'de': '/de/ki-pakete/',
        'en': '/en/ki-pakete/',
        'ru': '/ru/ki-pakete/',
      },
    },
  };
}

export function generateStaticParams() {
  return [{ locale: "de" }, { locale: "en" }, { locale: "ru" }];
}

export default function PaketePage() {
  return <PaketeClient />;
}
