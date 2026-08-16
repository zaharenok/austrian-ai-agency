"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/context/language-context";

const UNSUBSCRIBE_WEBHOOK = (process.env.NEXT_PUBLIC_UNSUBSCRIBE_WEBHOOK_URL || "").trim();

const COPY: Record<string, { title: string; success: string; error: string; subtitle: string; button: string }> = {
  de: {
    title: "Abmeldung",
    success: "Sie wurden erfolgreich abgemeldet.",
    error: "Es gab ein Problem bei der Abmeldung. Bitte schreiben Sie uns an office@aaagency.at.",
    subtitle: "Sie erhalten keine weiteren E-Mails von uns.",
    button: "Abmelden",
  },
  en: {
    title: "Unsubscribe",
    success: "You have been successfully unsubscribed.",
    error: "There was a problem unsubscribing. Please email office@aaagency.at.",
    subtitle: "You will not receive any further emails from us.",
    button: "Unsubscribe",
  },
  ru: {
    title: "Отписка",
    success: "Вы успешно отписаны.",
    error: "Произошла ошибка. Напишите нам на office@aaagency.at.",
    subtitle: "Вы больше не будете получать наши письма.",
    button: "Отписаться",
  },
};

export function AbmeldenClient() {
  const { t, locale } = useTranslations();
  const lang = locale === "de" ? "de" : locale === "ru" ? "ru" : "en";
  const copy = COPY[lang];

  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const e = params.get("email") || "";
    setEmail(e);
    // Auto-unsubscribe if email present in URL
    if (e && UNSUBSCRIBE_WEBHOOK) {
      setStatus("loading");
      fetch(UNSUBSCRIBE_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e, source: "email-link", timestamp: new Date().toISOString() }),
        cache: "no-store",
      })
        .then((r) => {
          if (r.ok) setStatus("done");
          else setStatus("error");
        })
        .catch(() => setStatus("error"));
    }
  }, []);

  const handleManual = useCallback(async () => {
    if (!email || !UNSUBSCRIBE_WEBHOOK) return;
    setStatus("loading");
    try {
      const r = await fetch(UNSUBSCRIBE_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "form", timestamp: new Date().toISOString() }),
        cache: "no-store",
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }, [email]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center gap-6 px-4 py-10 sm:px-6">
      <div className="flex w-full items-center">
        <Link href={`/${locale}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("navigation.backToHome")}
          </Button>
        </Link>
      </div>

      <div className="w-full rounded-3xl border border-primary/10 bg-white/80 p-8 text-center shadow-lg backdrop-blur-lg dark:bg-white/5 sm:p-10">
        {status === "done" ? (
          <>
            <CheckCircle2 className="mx-auto mb-4 h-14 w-14 text-primary" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">{copy.success}</h1>
            <p className="text-sm text-muted-foreground">{copy.subtitle}</p>
          </>
        ) : status === "error" ? (
          <>
            <h1 className="mb-2 text-2xl font-bold text-foreground">{copy.title}</h1>
            <p className="text-sm text-muted-foreground">{copy.error}</p>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-2xl font-bold text-foreground">{copy.title}</h1>
            <p className="mb-6 text-sm text-muted-foreground">{copy.subtitle}</p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@firma.at"
                disabled={status === "loading"}
                className="rounded-full border bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                onClick={handleManual}
                disabled={status === "loading" || !email || !UNSUBSCRIBE_WEBHOOK}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
              >
                {status === "loading" && <Loader2 className="h-4 w-4 animate-spin" />}
                {copy.button}
              </button>
              {!UNSUBSCRIBE_WEBHOOK && (
                <p className="text-xs text-muted-foreground">
                  Bitte schreiben Sie uns: office@aaagency.at
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}