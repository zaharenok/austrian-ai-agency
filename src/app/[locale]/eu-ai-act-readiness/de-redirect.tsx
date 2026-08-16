"use client";

import { useEffect } from "react";

/**
 * Клиентский редирект для статического экспорта (GitHub Pages).
 * Старый немецкий слаг /de/eu-ai-act-readiness переехал на /de/ki-verordnung-readiness-check.
 * JS-пользователи получают мгновенный replace; без JS — обычная ссылка.
 */
export default function DeRedirectPage() {
  useEffect(() => {
    window.location.replace("/de/ki-verordnung-readiness-check/");
  }, []);

  return (
    <div
      style={{
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <p style={{ fontFamily: "system-ui, sans-serif", fontSize: "1.1rem" }}>
        Diese Seite ist umgezogen:{" "}
        <a href="/de/ki-verordnung-readiness-check/">
          EU AI Act Readiness Check für Recruiting &amp; HR-Tech
        </a>
      </p>
    </div>
  );
}
