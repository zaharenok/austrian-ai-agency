import { HomeClient } from "./home-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default function LocaleHomePage() {
  return <HomeClient />;
}
