"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Sparkles } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/context/language-context";

function Hero() {
  const { t, locale } = useTranslations();
  const [titleNumber, setTitleNumber] = useState(0);
  
  const titles = useMemo(
    () => t("hero.titles"),
    [t]
  );
  const stats = useMemo(() => ({
    projects: t("hero.stats.projects"),
    clients: t("hero.stats.clients"),
    years: t("hero.stats.years"),
    clientsCount: "23+" // Hardcoded client count
  }), [t]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <section className="relative w-full pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center gap-10 text-center">
          <Badge variant="outline" className="flex items-center gap-2 bg-white/80 backdrop-blur-sm dark:bg-white/10">
            <Sparkles className="h-4 w-4 text-spektr-cyan-400" />
            <span>{t("hero.badge")}</span>
          </Badge>

          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight">
              <span className="block text-spektr-cyan-200">{t("hero.title")}</span>
              <span className="relative mt-2 block text-foreground">
                <AnimatePresence mode="wait">
                  {Array.isArray(titles) && titles.map((title, index) => (
                    titleNumber === index && (
                      <motion.span
                        key={`${title}-${index}`}
                        className="inline-block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      >
                        {title}
                      </motion.span>
                    )
                  ))}
                </AnimatePresence>
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground">
              {t("hero.description")}
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <Link href={`/${locale}/contact`}>
              <Button size="lg" className="gap-2 px-8">
                {t("cta.contact")}
                <Mail className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 px-8"
              onClick={() => {
                const section = document.querySelector('#services');
                section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              {t("cta.learnMore")}
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="grid w-full gap-6 sm:grid-cols-3">
            {Object.entries(stats).map(([key, label]) => (
              <div
                key={key}
                className="rounded-2xl border border-primary/10 bg-white/80 p-6 text-left shadow-sm backdrop-blur-sm dark:bg-white/10"
              >
                <p className="text-4xl font-semibold text-primary">{
                  key === 'projects' ? '58' : key === 'clients' ? '23+' : '5+'
                }</p>
                <p className="text-sm uppercase tracking-wider text-muted-foreground">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
