"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";
import { useScrollBoundary } from "@/hooks/use-scroll-boundary";
import {
  Shield,
  AlertTriangle,
  Euro,
  Handshake,
  Phone,
  Search,
  FileText,
  Scale,
  Eye,
  GraduationCap,
  ScrollText,
  UserCheck,
  Users,
  Building2,
  Briefcase,
  Check,
  ExternalLink,
  Send,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function EuAiActReadinessClient() {
  const { t } = useTranslations();
  const scrollBoundaryRef = useScrollBoundary();
  const [formSent, setFormSent] = useState(false);

  // Страница рассчитана на тёмную тему (aurora-фон + светлые карточки).
  // Принудительно включаем dark на время просмотра, чтобы дизайн не разваливался
  // на устройствах со светлой темой. MutationObserver перехватывает попытки
  // ThemeToggle убрать класс (layout монтируется раньше и применяет тему после).
  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    root.classList.add("dark");

    const observer = new MutationObserver(() => {
      if (!root.classList.contains("dark")) root.classList.add("dark");
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      observer.disconnect();
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      company: data.get("company"),
      email: data.get("email"),
      message: data.get("message"),
      page: "eu-ai-act-readiness",
      ts: new Date().toISOString(),
    };

    const WEBHOOK_URL = (process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "").trim();

    if (WEBHOOK_URL) {
      fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (res.ok) {
            setFormSent(true);
            form.reset();
          } else {
            fallbackMailto(payload);
          }
        })
        .catch(() => fallbackMailto(payload));
    } else {
      fallbackMailto(payload);
    }
  };

  const fallbackMailto = (payload: Record<string, FormDataEntryValue | null>) => {
    const subject = encodeURIComponent("EU AI Act Readiness Check — Anfrage");
    const body = encodeURIComponent(
      `Name: ${payload.name}\nFirma: ${payload.company}\nE-Mail: ${payload.email}\n\n${payload.message}`
    );
    window.location.href = `mailto:hello@aaagency.at?subject=${subject}&body=${body}`;
    setFormSent(true);
  };

  return (
    <AuroraBackground className="flex flex-col" ref={scrollBoundaryRef}>
      <div className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-[85vh] items-center justify-center px-4 py-20">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-spektr-cyan-500/10 px-4 py-2 text-sm font-semibold text-spektr-cyan-400 backdrop-blur-sm">
                <Shield className="h-4 w-4" />
                {t("euAiActReadiness.hero.badge")}
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {t("euAiActReadiness.hero.title")}
              </h1>

              <p className="mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl">
                {t("euAiActReadiness.hero.subtitle")}
              </p>

              <div className="mx-auto max-w-2xl space-y-3">
                <p className="rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-lg font-semibold text-red-400 backdrop-blur-sm">
                  {t("euAiActReadiness.hero.deadline")}
                </p>
                <p className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-5 py-3 font-medium text-amber-300 backdrop-blur-sm">
                  {t("euAiActReadiness.hero.fines")}
                </p>
                <a
                  href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-spektr-cyan-400 underline underline-offset-4 transition-colors hover:text-spektr-cyan-300"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  {t("euAiActReadiness.hero.lawLink")}
                </a>
              </div>

              <div className="pt-6">
                <a
                  href="#kontakt"
                  className={cn(
                    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
                    "bg-gradient-to-r from-spektr-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white",
                    "shadow-2xl shadow-spektr-cyan-500/40 ring-4 ring-white/20",
                    "transition-all duration-300 hover:scale-105 hover:shadow-spektr-cyan-500/60 hover:ring-white/30"
                  )}
                >
                  <span className="relative z-10">{t("euAiActReadiness.hero.cta")}</span>
                  <Send className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Why Now Section */}
        <section className="border-y border-primary/10 bg-white/80 py-20 backdrop-blur-md dark:bg-zinc-900/80">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-foreground">
                {t("euAiActReadiness.why.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("euAiActReadiness.why.subtitle")}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: AlertTriangle,
                  title: t("euAiActReadiness.why.card1title"),
                  description: t("euAiActReadiness.why.card1text"),
                  color: "text-red-500",
                },
                {
                  icon: Euro,
                  title: t("euAiActReadiness.why.card2title"),
                  description: t("euAiActReadiness.why.card2text"),
                  color: "text-orange-500",
                },
                {
                  icon: Handshake,
                  title: t("euAiActReadiness.why.card3title"),
                  description: t("euAiActReadiness.why.card3text"),
                  color: "text-spektr-cyan-500",
                },
              ].map(({ icon: Icon, title, description, color }) => (
                <motion.div
                  key={title as string}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl border border-border/60 bg-white/80 p-8 backdrop-blur-md dark:bg-white/5"
                >
                  <div className={cn("mb-4 inline-flex rounded-xl p-3", color, "bg-current/10")}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-foreground">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-foreground">
                {t("euAiActReadiness.steps.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("euAiActReadiness.steps.subtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Phone,
                  title: t("euAiActReadiness.steps.step1title"),
                  description: t("euAiActReadiness.steps.step1text"),
                  color: "text-blue-500",
                },
                {
                  icon: Search,
                  title: t("euAiActReadiness.steps.step2title"),
                  description: t("euAiActReadiness.steps.step2text"),
                  color: "text-spektr-cyan-500",
                },
                {
                  icon: FileText,
                  title: t("euAiActReadiness.steps.step3title"),
                  description: t("euAiActReadiness.steps.step3text"),
                  color: "text-green-500",
                },
              ].map(({ icon: Icon, title, description, color }, idx) => (
                <motion.div
                  key={title as string}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative rounded-2xl border border-border/60 bg-white/80 p-8 backdrop-blur-md dark:bg-white/5"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-spektr-cyan-500 text-base font-bold text-white shadow-md">
                      {idx + 1}
                    </span>
                    <div className={cn("inline-flex rounded-xl p-3", color, "bg-current/10")}>
                      <Icon className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-foreground">{title}</h3>
                  <p className="text-muted-foreground">{description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Checklist Section */}
        <section className="border-y border-primary/10 bg-white/80 py-20 backdrop-blur-md dark:bg-zinc-900/80">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-foreground">
                {t("euAiActReadiness.check.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("euAiActReadiness.check.subtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: Scale,
                  title: t("euAiActReadiness.check.item1title"),
                  description: t("euAiActReadiness.check.item1text"),
                },
                {
                  icon: Eye,
                  title: t("euAiActReadiness.check.item2title"),
                  description: t("euAiActReadiness.check.item2text"),
                },
                {
                  icon: GraduationCap,
                  title: t("euAiActReadiness.check.item3title"),
                  description: t("euAiActReadiness.check.item3text"),
                },
                {
                  icon: ScrollText,
                  title: t("euAiActReadiness.check.item4title"),
                  description: t("euAiActReadiness.check.item4text"),
                },
                {
                  icon: UserCheck,
                  title: t("euAiActReadiness.check.item5title"),
                  description: t("euAiActReadiness.check.item5text"),
                },
                {
                  icon: Shield,
                  title: t("euAiActReadiness.check.item6title"),
                  description: t("euAiActReadiness.check.item6text"),
                },
              ].map(({ icon: Icon, title, description }) => (
                <motion.div
                  key={title as string}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 backdrop-blur-md dark:bg-white/5"
                >
                  <div className="rounded-xl bg-spektr-cyan-500/10 p-3 text-spektr-cyan-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* For Whom Section */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-foreground">
                {t("euAiActReadiness.forWhom.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("euAiActReadiness.forWhom.subtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {[
                { icon: Users, text: t("euAiActReadiness.forWhom.group1") },
                { icon: Building2, text: t("euAiActReadiness.forWhom.group2") },
                { icon: Briefcase, text: t("euAiActReadiness.forWhom.group3") },
              ].map(({ icon: Icon, text }) => (
                <motion.div
                  key={text as string}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 backdrop-blur-md dark:bg-white/5"
                >
                  <div className="rounded-xl bg-blue-500/10 p-3 text-blue-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="font-medium text-foreground">{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="border-y border-primary/10 bg-white/80 py-20 backdrop-blur-md dark:bg-zinc-900/80" id="faq">
          <div className="container mx-auto max-w-4xl px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold text-foreground">
                {t("euAiActReadiness.faq.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("euAiActReadiness.faq.subtitle")}
              </p>
            </div>

            <div className="space-y-4">
              {[1, 2, 3, 4].map((n) => (
                <details
                  key={n}
                  className="group rounded-2xl border border-border/60 bg-white/80 p-6 backdrop-blur-md dark:bg-white/5"
                >
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                    {t(`euAiActReadiness.faq.q${n}`)}
                    <span className="text-spektr-cyan-500 transition-transform group-open:rotate-45">+</span>
                  </summary>
                  <p className="mt-4 text-muted-foreground">
                    {t(`euAiActReadiness.faq.a${n}`)}
                  </p>
                  {n === 4 && (
                    <a
                      href="https://eur-lex.europa.eu/eli/reg/2024/1689/oj"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-spektr-cyan-500 underline underline-offset-4 transition-colors hover:text-spektr-cyan-400"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {t("euAiActReadiness.faq.lawLink")}
                    </a>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-20" id="kontakt">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold text-foreground">
                {t("euAiActReadiness.form.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("euAiActReadiness.form.subtitle")}
              </p>
            </div>

            {formSent ? (
              <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-8 text-center backdrop-blur-md">
                <Check className="mx-auto mb-4 h-12 w-12 text-green-500" />
                <p className="text-xl font-semibold text-foreground">
                  {t("euAiActReadiness.form.toast")}
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 rounded-2xl border border-border/60 bg-white/80 p-8 backdrop-blur-md dark:bg-white/5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      {t("euAiActReadiness.form.nameLabel")}
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      placeholder={t("euAiActReadiness.form.namePh")}
                      className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-spektr-cyan-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-foreground">
                      {t("euAiActReadiness.form.companyLabel")}
                    </label>
                    <input
                      id="company"
                      name="company"
                      required
                      placeholder={t("euAiActReadiness.form.companyPh")}
                      className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-spektr-cyan-500"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">
                    {t("euAiActReadiness.form.emailLabel")}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder={t("euAiActReadiness.form.emailPh")}
                    className="w-full rounded-xl border border-border/60 bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-spektr-cyan-500"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    {t("euAiActReadiness.form.messageLabel")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder={t("euAiActReadiness.form.messagePh")}
                    className="w-full resize-none rounded-xl border border-border/60 bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-spektr-cyan-500"
                  />
                </div>
                <button
                  type="submit"
                  className={cn(
                    "group inline-flex w-full items-center justify-center gap-2 rounded-xl",
                    "bg-gradient-to-r from-spektr-cyan-500 to-blue-600 px-8 py-4 text-lg font-semibold text-white",
                    "shadow-lg shadow-spektr-cyan-500/30 transition-all duration-300 hover:shadow-spektr-cyan-500/50"
                  )}
                >
                  {t("euAiActReadiness.form.submit")}
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </div>
        </section>
      </div>

      <div
        ref={scrollBoundaryRef}
        className="w-full border-t border-primary/10 bg-white/90 backdrop-blur-md dark:bg-zinc-900/90"
      >
        <SiteFooter />
        <div className="scroll-boundary-detector" aria-hidden="true"></div>
      </div>
    </AuroraBackground>
  );
}
