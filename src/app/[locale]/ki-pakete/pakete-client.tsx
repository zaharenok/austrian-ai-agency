"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";
import { useScrollBoundary } from "@/hooks/use-scroll-boundary";
import {
  Check,
  Shield,
  FileText,
  MonitorCheck,
  Users,
  ArrowRight,
  Clock,
  BarChart3,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

// Separater n8n-Webhook für Bestellungen (nicht der Chat-Webhook).
// Bleibt er leer, fällt das Formular automatisch auf mailto: zurück.
const N8N_ORDER_WEBHOOK_URL = (
  process.env.NEXT_PUBLIC_N8N_ORDER_WEBHOOK_URL || ""
).trim();

const AUDIT_INDEX = 1; // AI Act Readiness Audit = empfohlener Einstieg

function parsePrice(price: string): number {
  return parseInt(String(price).replace(/[^\d]/g, "") || "0", 10);
}

export function PaketeClient() {
  const { t, locale } = useTranslations();
  const scrollBoundaryRef = useScrollBoundary();
  const [selected, setSelected] = useState<number[]>([0]);
  const [formSent, setFormSent] = useState<null | "webhook" | "mailto">(null);
  const [sending, setSending] = useState(false);
  const [ref, setRef] = useState("");

  const ft = (key: string): string => String(t(key));

  // Pakete kommen aus den Locale-JSONs (eine Quelle der Wahrheit)
  const realPkgs: any[] = (t("kiPakete.packages") as unknown as any[]) || [];

  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    // REF-Domain aus URL (?domain=...) → Funnel-Lead: Scan ist schon erledigt
    const params = new URLSearchParams(window.location.search);
    const d = params.get("domain");
    if (d) {
      setRef(d);
      // Funnel-Leads haben den kostenlosen Scan schon → Audit vorauswählen
      setSelected([AUDIT_INDEX]);
    }

    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

  // Summen getrennt: einmalig vs. monatlich (Monitoring ist ein Abo)
  const selPkgs = selected
    .map((i: number) => realPkgs[i])
    .filter(Boolean);
  const oneTime = selPkgs
    .filter((p: any) => !p.monthly)
    .reduce((s: number, p: any) => s + parsePrice(p.price), 0);
  const monthly = selPkgs
    .filter((p: any) => p.monthly)
    .reduce((s: number, p: any) => s + parsePrice(p.price), 0);
  const monthlyPeriod = realPkgs.find((p: any) => p.monthly)?.period || "/Monat";
  const oneTimePeriod = realPkgs.find((p: any) => !p.monthly)?.period || "";

  const totalsLabel = [
    oneTime > 0 ? `€${oneTime.toLocaleString("de-DE")}${oneTimePeriod ? ` ${oneTimePeriod}` : ""}` : "",
    monthly > 0 ? `€${monthly.toLocaleString("de-DE")} ${monthlyPeriod}` : "",
  ]
    .filter(Boolean)
    .join(" + ");

  const buildMailto = (name: string, company: string, email: string) => {
    const subject =
      `Bestellung: ${selPkgs.map((p: any) => p.name).join(" + ") || "Paket"}` +
      (ref ? ` (REF: ${ref})` : "");
    const body = [
      ...selPkgs.map((p: any) => `Paket: ${p.name} — ${p.price} ${p.period}`),
      `Gesamt: ${totalsLabel}`,
      "",
      `Name: ${name}`,
      `Unternehmen: ${company}`,
      `E-Mail: ${email}`,
      `Referenz: ${ref || "—"}`,
      "",
      "AGB akzeptiert: ja",
    ].join("\n");
    return `mailto:oleg@aaagency.at?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const email = String(data.get("email") || "");

    if (N8N_ORDER_WEBHOOK_URL) {
      try {
        setSending(true);
        const response = await fetch(N8N_ORDER_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            type: "order",
            source: "ki-pakete",
            locale,
            timestamp: new Date().toISOString(),
            packages: selPkgs.map((p: any) => ({
              name: p.name,
              price: p.price,
              period: p.period,
            })),
            totalOneTime: oneTime,
            totalMonthly: monthly,
            totalLabel: totalsLabel,
            name,
            company,
            email,
            ref: ref || null,
          }),
        });
        if (response.ok) {
          setFormSent("webhook");
          return;
        }
        console.error(`Order webhook failed with status ${response.status}`);
      } catch (err) {
        console.error("Order webhook error, falling back to mailto", err);
      } finally {
        setSending(false);
      }
    }

    // Fallback: mailto mit vorbereiteter Bestellung
    window.location.href = buildMailto(name, company, email);
    setFormSent("mailto");
  };

  const icons = [Shield, FileText, Users, MonitorCheck];
  const trustIcons = [Clock, BarChart3, PhoneCall];

  return (
    <div ref={scrollBoundaryRef} className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <AuroraBackground>
        <div className="relative px-4 py-20 max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-1.5 text-sm text-slate-600 dark:text-slate-300 mb-5">
              <Shield className="w-4 h-4 text-spektr-cyan" />
              {ft("kiPakete.hero.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {ft("kiPakete.hero.title")}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {ft("kiPakete.hero.subtitle")}
            </p>
          </div>

          {/* Funnel-Banner: kostenloser Scan für ?domain= ist schon erledigt */}
          {ref && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto mb-10 rounded-2xl border border-green-200 dark:border-green-900/60 bg-green-50 dark:bg-green-950/40 px-5 py-4 flex items-start gap-3"
            >
              <span className="mt-0.5 w-6 h-6 shrink-0 rounded-full bg-green-500 text-white flex items-center justify-center">
                <Check className="w-4 h-4" />
              </span>
              <p className="text-sm text-green-800 dark:text-green-300">
                {ft("kiPakete.banner.text").replace("{domain}", ref)}
              </p>
            </motion.div>
          )}

          {/* Trust-Leiste: Deadline, Social Proof, Risk Reversal */}
          <div className="grid sm:grid-cols-3 gap-4 mb-14 max-w-4xl mx-auto">
            {(["clock", "chart", "check"] as const).map((key, i) => {
              const TrustIcon = trustIcons[i % trustIcons.length];
              const item: any = (t as any)(`kiPakete.trust.${key}`);
              return (
                <div
                  key={key}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 px-4 py-4"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <TrustIcon className="w-4 h-4 text-spektr-cyan shrink-0" />
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                      {item?.title}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                    {item?.text}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Package cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {realPkgs.map((pkg: any, i: number) => {
              const Icon = icons[i % icons.length];
              const active = selected.includes(i);
              const recommended = !!pkg.recommended;
              const features: string[] = Array.isArray(pkg.features) ? pkg.features : [];
              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() =>
                    setSelected((prev: number[]) =>
                      prev.includes(i) ? prev.filter((x: number) => x !== i) : [...prev, i]
                    )
                  }
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    "relative text-left rounded-2xl p-6 border transition-all cursor-pointer flex flex-col",
                    active
                      ? "border-spektr-cyan bg-spektr-cyan/5 shadow-lg shadow-spektr-cyan/10"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-spektr-cyan/50",
                    recommended &&
                      "pt-14 border-spektr-cyan/60 ring-1 ring-spektr-cyan/40 dark:bg-slate-900"
                  )}
                >
                  {recommended && (
                    <span className="absolute top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-spektr-cyan text-white text-xs font-semibold px-3 py-1 shadow">
                      <Sparkles className="w-3 h-3" />
                      {ft("kiPakete.recommendedLabel")}
                    </span>
                  )}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-xl bg-spektr-cyan/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-spektr-cyan" />
                    </div>
                    {active && (
                      <span className="w-5 h-5 rounded-full bg-spektr-cyan text-white flex items-center justify-center">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                    {pkg?.name}
                  </div>
                  <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">
                    {pkg?.price}
                    <span className="text-base font-normal text-slate-400"> {pkg?.period}</span>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-3">
                    {pkg?.desc}
                  </div>
                  {features.length > 0 && (
                    <ul className="mt-auto space-y-1.5">
                      {features.map((f: string, fi: number) => (
                        <li
                          key={fi}
                          className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300"
                        >
                          <Check className="w-3.5 h-3.5 mt-0.5 text-spektr-cyan shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Hint: multiple packages allowed */}
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mb-14">
            {ft("kiPakete.hero.multiHint")}
          </p>

          {/* Order form */}
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {ft("kiPakete.form.title")}
            </h2>

            {formSent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {ft(
                    formSent === "webhook"
                      ? "kiPakete.form.successWebhook"
                      : "kiPakete.form.successMailto"
                  )}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {ref ? `${ft("kiPakete.form.ref")}: ${ref}` : ""}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {ref && (
                  <div className="flex items-center justify-between rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 px-4 py-3">
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {ft("kiPakete.form.ref")}
                    </span>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      {ref}
                    </span>
                  </div>
                )}
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {ft("kiPakete.form.packageLabel")}:
                  <span className="font-semibold text-spektr-cyan block mt-1">
                    {selPkgs.map((p: any) => p.name).join(" + ")}
                    {selPkgs.length > 0 ? " — " : ""}
                    <span className="text-slate-700 dark:text-slate-200">{totalsLabel}</span>
                  </span>
                </div>
                <input
                  name="name"
                  required
                  placeholder={ft("kiPakete.form.name")}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-spektr-cyan"
                />
                <input
                  name="company"
                  placeholder={ft("kiPakete.form.company")}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-spektr-cyan"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={ft("kiPakete.form.email")}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-spektr-cyan"
                />
                <label className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" required className="mt-1 rounded border-slate-300 text-spektr-cyan focus:ring-spektr-cyan" />
                  <span>
                    {ft("kiPakete.form.agb")}{" "}
                    <a
                      href={`/${locale}/agb/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-spektr-cyan underline hover:text-spektr-cyan/80"
                    >
                      {ft("kiPakete.form.agbLink")}
                    </a>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-xl bg-spektr-cyan hover:bg-spektr-cyan/90 disabled:opacity-60 text-white font-semibold py-3.5 px-6 flex items-center justify-center gap-2 transition-colors"
                >
                  {sending ? ft("kiPakete.form.submitting") : ft("kiPakete.form.submit")}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </AuroraBackground>
      <SiteFooter />
    </div>
  );
}
