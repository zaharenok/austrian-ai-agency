import { VetCallClient } from './vet-client';

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default function VetCallPage() {
  return <VetCallClient />;
}
