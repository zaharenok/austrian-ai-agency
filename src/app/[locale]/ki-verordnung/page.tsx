import { EuAiActReadinessClient } from "../eu-ai-act-readiness/eu-ai-act-readiness-client";

export const dynamicParams = false;

export function generateStaticParams() {
  // Немецкий слаг существует только для de — en/ru остаются на eu-ai-act-readiness
  return [{ locale: "de" }];
}

export default function KiVerordnungReadinessCheckPage() {
  return <EuAiActReadinessClient />;
}
