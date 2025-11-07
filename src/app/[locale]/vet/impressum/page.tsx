import { VetImpressumClient } from './impressum-client';

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

export default async function VetImpressumPage({ params }: PageProps) {
  const { locale } = await params;
  return <VetImpressumClient locale={locale} />;
}
