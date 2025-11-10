import { VetContactClient } from './contact-client';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default function VetContactPage() {
  return <VetContactClient />;
}
