import { EuAiActReadinessClient } from "./eu-ai-act-readiness-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default function EuAiActReadinessPage() {
  return <EuAiActReadinessClient />;
}
