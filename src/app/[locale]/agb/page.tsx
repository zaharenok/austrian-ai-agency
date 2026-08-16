import AgbClient from "./agb-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "de" }, { locale: "en" }, { locale: "ru" }];
}

export default function AgbPage() {
  return <AgbClient />;
}