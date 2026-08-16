import { PaketeClient } from "./pakete-client";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "de" }, { locale: "en" }, { locale: "ru" }];
}

export default function PaketePage() {
  return <PaketeClient />;
}