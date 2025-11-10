import { VetPrivacyClient } from './privacy-client';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default function VetPrivacyPage() {
  return <VetPrivacyClient />;
}
