import { VetPrivacyClient } from './privacy-client';

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

export default async function VetPrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  return <VetPrivacyClient locale={locale} />;
}
