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
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function PaketeClient() {
  const { t, locale } = useTranslations();
  const scrollBoundaryRef = useScrollBoundary();
  const [selected, setSelected] = useState(0);
  const [formSent, setFormSent] = useState(false);
  const [ref, setRef] = useState("");

  useEffect(() => {
    const root = document.documentElement;
    const hadDark = root.classList.contains("dark");
    // Сохраняем REF-домен из URL (?domain=...), чтобы привязать заказ к лиду
    const params = new URLSearchParams(window.location.search);
    const d = params.get("domain");
    if (d) setRef(d);

    return () => {
      if (!hadDark) root.classList.remove("dark");
    };
  }, []);

  const ft = (key: string): string => String(t(key));

  // Пакеты захардкожены (переводы в common.json — только метки), чтобы не зависеть
  // от типизации t(): возвращает string | string[], а не объекты
  const realPkgs: any[] = [
    { name: "Compliance-Check", price: "€699", period: "einmalig", desc: "Website-Scan, Bericht, Priorisierung" },
    { name: "Vollständiger Audit", price: "€1.900", period: "einmalig", desc: "Alle Prozesse (ATS, KI-Screening), Maßnahmenkatalog" },
    { name: "Compliance-Monitoring", price: "€290", period: "/Monat", desc: "Laufende Prüfung, Updates bei Gesetzesänderungen" },
    { name: "Umsetzung + Schulung", price: "€3.500", period: "einmalig", desc: "Änderungen umsetzen, Team schulen, DPO-Übergabe" },
  ];

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const pkg = realPkgs[selected] || realPkgs[0];
    const name = String(data.get("name") || "");
    const company = String(data.get("company") || "");
    const email = String(data.get("email") || "");

    const subject = `Bestellung: ${pkg?.name || "Paket"}` + (ref ? ` (REF: ${ref})` : "");
    const body = [
      `Paket: ${pkg?.name || ""}`,
      `Preis: ${pkg?.price || ""} ${pkg?.period || ""}`,
      "",
      `Name: ${name}`,
      `Unternehmen: ${company}`,
      `E-Mail: ${email}`,
      `Referenz: ${ref || "—"}`,
      "",
      "AGB akzeptiert: ja",
    ].join("\n");

    // Открываем mailto с готовым заказом — письмо уходит на oleg@aaagency.at
    window.location.href = `mailto:oleg@aaagency.at?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setFormSent(true);
  };

  const icons = [Shield, FileText, MonitorCheck, Users];

  return (
    <div ref={scrollBoundaryRef} className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <AuroraBackground>
        <div className="relative px-4 py-20 max-w-6xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-1.5 text-sm text-slate-600 dark:text-slate-300 mb-5">
              <Shield className="w-4 h-4 text-spektr-cyan" />
              {ft("pakete.hero.badge")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              {ft("pakete.hero.title")}
            </h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              {ft("pakete.hero.subtitle")}
            </p>
          </div>

          {/* Package cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {realPkgs.map((pkg: any, i: number) => {
              const Icon = icons[i % icons.length];
              const active = selected === i;
              return (
                <motion.button
                  key={i}
                  type="button"
                  onClick={() => setSelected(i)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={cn(
                    "text-left rounded-2xl p-6 border transition-all cursor-pointer",
                    active
                      ? "border-spektr-cyan bg-spektr-cyan/5 shadow-lg shadow-spektr-cyan/10 scale-[1.02]"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-spektr-cyan/50"
                  )}
                >
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
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-1">{pkg?.name}</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                    {pkg?.price}
                    <span className="text-sm font-normal text-slate-400"> {pkg?.period}</span>
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">{pkg?.desc}</div>
                </motion.button>
              );
            })}
          </div>

          {/* Order form */}
          <div className="max-w-xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              {ft("pakete.form.title")}
            </h2>

            {formSent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <p className="text-lg font-semibold text-slate-900 dark:text-white">
                  {ft("pakete.form.success")}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  {ref ? `Referenz: ${ref}` : ""}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                  {ft("pakete.form.packageLabel")}:{" "}
                  <span className="font-semibold text-spektr-cyan">
                    {realPkgs[selected]?.name} — {realPkgs[selected]?.price} {realPkgs[selected]?.period}
                  </span>
                </div>
                <input
                  name="name"
                  required
                  placeholder={ft("pakete.form.name")}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-spektr-cyan"
                />
                <input
                  name="company"
                  placeholder={ft("pakete.form.company")}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-spektr-cyan"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder={ft("pakete.form.email")}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-spektr-cyan"
                />
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer">
                  <input type="checkbox" required className="rounded border-slate-300 text-spektr-cyan focus:ring-spektr-cyan" />
                  {ft("pakete.form.agb")}
                </label>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-spektr-cyan hover:bg-spektr-cyan/90 text-white font-semibold py-3.5 px-6 flex items-center justify-center gap-2 transition-colors"
                >
                  {ft("pakete.form.submit")}
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