"use client";

import { useMetaPixelPageView } from "@/hooks/use-meta-pixel";
import { useTranslations } from "@/context/language-context";

export function MetaPixelTracker() {
  const { locale } = useTranslations();
  useMetaPixelPageView(locale);

  return null;
}
