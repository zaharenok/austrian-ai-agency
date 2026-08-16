import { EuAiActReadinessClient } from "./eu-ai-act-readiness-client";
import DeRedirectPage from "./de-redirect";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default async function EuAiActReadinessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Немецкая версия переехала на немецкий слаг /de/ki-verordnung-readiness-check
  if (locale === "de") {
    return <DeRedirectPage />;
  }

  return <EuAiActReadinessClient />;
}
