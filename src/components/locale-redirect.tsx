"use client";

import { useEffect } from "react";

const locales = ["en", "de", "ru"];
const defaultLocale = "en";

export function LocaleRedirect() {
  useEffect(() => {
    // Проверяем, находимся ли мы на корневой странице
    if (window.location.pathname !== "/" && window.location.pathname !== "") {
      return;
    }

    // Проверяем cookie для сохраненного языка
    const savedLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];

    if (savedLocale && locales.includes(savedLocale)) {
      window.location.href = `/${savedLocale}/`;
      return;
    }

    // Определяем язык браузера
    const browserLanguage = navigator.language.toLowerCase();
    let detectedLocale = defaultLocale;

    for (const locale of locales) {
      if (browserLanguage.startsWith(locale)) {
        detectedLocale = locale;
        break;
      }
    }

    // Сохраняем выбранный язык в cookie
    document.cookie = `NEXT_LOCALE=${detectedLocale}; path=/; max-age=31536000`;

    // Редирект на страницу с языком
    window.location.href = `/${detectedLocale}/`;
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        <p className="text-lg text-muted-foreground">Redirecting...</p>
      </div>
    </div>
  );
}
