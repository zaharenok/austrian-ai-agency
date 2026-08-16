"use client";

import { useEffect } from "react";

/**
 * Клиентский редирект: /[locale]/pakete → /[locale]/ki-pakete.
 * Старый слаг переехал: пакеты EU AI Act теперь живут на /de/ki-pakete,
 * чтобы не конфликтовать с пакетами других проектов на aaagency.at.
 */
export default function PaketeRedirect() {
  useEffect(() => {
    const loc = window.location.pathname;
    const m = loc.match(/^\/(de|en|ru)\/pakete\/?/);
    const locale = m ? m[1] : "de";
    window.location.replace(`/${locale}/ki-pakete/`);
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
        <a href="/de/ki-pakete/">KI-Pakete für EU AI Act Compliance</a>
      </p>
    </div>
  );
}