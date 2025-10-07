"use client";

import { useTranslations } from "@/context/language-context";
import { Target, Code2, GraduationCap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function ServicesSection() {
  const { t, locale } = useTranslations();
  const cards = [
    {
      key: "strategy" as const,
      icon: Target,
      badge: "Strategy sprint",
    },
    {
      key: "development" as const,
      icon: Code2,
      badge: "Delivery",
    },
    {
      key: "training" as const,
      icon: GraduationCap,
      badge: "Enablement",
    },
  ];
  
  return (
    <div className="container mx-auto space-y-10 px-4 sm:px-6">
      <div className="space-y-4 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-spektr-cyan-300">
          {t("navigation.services")}
        </p>
        <h2 className="text-3xl font-bold md:text-4xl">{t("services.title") || "AI Services"}</h2>
        <p className="mx-auto max-w-2xl text-base text-muted-foreground">
          {t("services.subtitle")}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ key, icon: Icon, badge }) => {
          const title = t(`services.${key}.title`);
          const description = t(`services.${key}.description`);
          const features = t(`services.${key}.features`);
          return (
            <Link
              href={`/${locale}/contact`}
              key={key}
              className="group flex h-full flex-col rounded-3xl border border-primary/10 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-transform hover:-translate-y-1 hover:shadow-xl dark:bg-white/10"
            >
              <div className="flex items-start justify-between">
                <div className="rounded-2xl bg-primary/10 p-4 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <Badge variant="secondary" className="uppercase tracking-wide">
                  {badge}
                </Badge>
              </div>

              <div className="mt-6 space-y-3">
                <h3 className="text-2xl font-semibold">{title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>

              {Array.isArray(features) && features.length > 0 && (
                <ul className="mt-6 space-y-2 text-left text-sm text-muted-foreground">
                  {features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-auto pt-6 text-sm font-semibold text-primary">
                {t("cta.bookIntro")}
                <ArrowRight className="ml-2 inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
