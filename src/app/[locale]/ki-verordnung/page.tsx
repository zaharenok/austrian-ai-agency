import { EuAiActReadinessClient } from "../eu-ai-act-readiness/eu-ai-act-readiness-client";

export const dynamicParams = false;

export function generateStaticParams() {
  // Слаг ki-verordnung доступен во всех локалях (de/en/ru)
  return [{ locale: "de" }, { locale: "en" }, { locale: "ru" }];
}

export default function KiVerordnungReadinessCheckPage() {
  return <EuAiActReadinessClient />;
}
