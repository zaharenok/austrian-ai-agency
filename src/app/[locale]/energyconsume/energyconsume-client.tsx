"use client";

import { AuroraBackground } from "@/components/ui/aurora-background";
import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";
import { useScrollBoundary } from "@/hooks/use-scroll-boundary";
import { Zap, TrendingDown, Eye, Leaf, DollarSign, Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function EnergyConsumeClient() {
  const { t } = useTranslations();
  const scrollBoundaryRef = useScrollBoundary();

  const handleJoinClick = () => {
    window.open("https://bit.ly/48RaD2q", "_blank");
  };

  return (
    <AuroraBackground className="flex flex-col">
      <div className="flex-1">
        {/* Hero Section - PAIN/HOOK */}
        <section className="relative min-h-[85vh] flex items-center justify-center px-4 py-20">
          <div className="container mx-auto max-w-5xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-spektr-cyan-500/10 px-4 py-2 text-sm font-semibold text-spektr-cyan-400 backdrop-blur-sm">
                <Zap className="h-4 w-4" />
                {t("energyCommunity.hero.badge")}
              </div>

              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                {t("energyCommunity.hero.title")}
              </h1>

              <p className="mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl">
                {t("energyCommunity.hero.subtitle")}
              </p>

              <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
                {t("energyCommunity.hero.description")}
              </p>

              <div className="pt-6">
                <button
                  onClick={handleJoinClick}
                  className={cn(
                    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
                    "bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-lg font-semibold text-white",
                    "shadow-2xl shadow-green-500/50 ring-4 ring-white/20",
                    "transition-all duration-300 hover:scale-105 hover:shadow-green-500/70 hover:ring-white/30"
                  )}
                >
                  <span className="relative z-10">{t("energyCommunity.hero.cta")}</span>
                  <Zap className="relative z-10 h-5 w-5 transition-transform group-hover:rotate-12" />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem Section - PAIN POINTS */}
        <section className="border-y border-primary/10 bg-white/80 py-20 backdrop-blur-md dark:bg-zinc-900/80">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {t("energyCommunity.problem.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("energyCommunity.problem.subtitle")}
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: TrendingDown,
                  title: t("energyCommunity.problem.point1.title"),
                  description: t("energyCommunity.problem.point1.description"),
                  color: "text-red-500"
                },
                {
                  icon: DollarSign,
                  title: t("energyCommunity.problem.point2.title"),
                  description: t("energyCommunity.problem.point2.description"),
                  color: "text-orange-500"
                },
                {
                  icon: Eye,
                  title: t("energyCommunity.problem.point3.title"),
                  description: t("energyCommunity.problem.point3.description"),
                  color: "text-yellow-500"
                }
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

        {/* Solution Section - INTRODUCTION */}
        <section className="py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {t("energyCommunity.solution.title")}
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                {t("energyCommunity.solution.subtitle")}
              </p>
              <p className="mx-auto max-w-3xl text-lg text-muted-foreground">
                {t("energyCommunity.solution.intro")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  icon: DollarSign,
                  title: t("energyCommunity.solution.benefit1.title"),
                  description: t("energyCommunity.solution.benefit1.description"),
                  color: "text-green-500"
                },
                {
                  icon: Eye,
                  title: t("energyCommunity.solution.benefit2.title"),
                  description: t("energyCommunity.solution.benefit2.description"),
                  color: "text-blue-500"
                },
                {
                  icon: Leaf,
                  title: t("energyCommunity.solution.benefit3.title"),
                  description: t("energyCommunity.solution.benefit3.description"),
                  color: "text-emerald-500"
                },
                {
                  icon: Check,
                  title: t("energyCommunity.solution.benefit4.title"),
                  description: t("energyCommunity.solution.benefit4.description"),
                  color: "text-spektr-cyan-500"
                }
              ].map(({ icon: Icon, title, description, color }) => (
                <motion.div
                  key={title as string}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 backdrop-blur-md dark:bg-white/5"
                >
                  <div className={cn("rounded-xl p-3", color, "bg-current/10")}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-xl font-bold text-foreground">{title}</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - SOLUTION DETAILS */}
        <section className="border-y border-primary/10 bg-white/80 py-20 backdrop-blur-md dark:bg-zinc-900/80">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                {t("energyCommunity.pricing.title")}
              </h2>
              <p className="text-xl text-muted-foreground">
                {t("energyCommunity.pricing.subtitle")}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-12">
              {[
                {
                  title: t("energyCommunity.pricing.consumption.title"),
                  price: t("energyCommunity.pricing.consumption.price"),
                  unit: t("energyCommunity.pricing.consumption.unit"),
                  description: t("energyCommunity.pricing.consumption.description"),
                  highlight: true
                },
                {
                  title: t("energyCommunity.pricing.monthly.title"),
                  price: t("energyCommunity.pricing.monthly.price"),
                  unit: t("energyCommunity.pricing.monthly.unit"),
                  description: t("energyCommunity.pricing.monthly.description")
                },
                {
                  title: t("energyCommunity.pricing.deposit.title"),
                  price: t("energyCommunity.pricing.deposit.price"),
                  unit: t("energyCommunity.pricing.deposit.unit"),
                  description: t("energyCommunity.pricing.deposit.description")
                },
                {
                  title: t("energyCommunity.pricing.membership.title"),
                  price: t("energyCommunity.pricing.membership.price"),
                  unit: t("energyCommunity.pricing.membership.unit"),
                  description: t("energyCommunity.pricing.membership.description")
                }
              ].map(({ title, price, unit, description, highlight }) => (
                <motion.div
                  key={title as string}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={cn(
                    "rounded-2xl border p-6 text-center",
                    highlight
                      ? "border-spektr-cyan-500 bg-gradient-to-br from-spektr-cyan-500/10 to-spektr-cyan-600/5 shadow-lg shadow-spektr-cyan-500/20"
                      : "border-border/60 bg-white/80 backdrop-blur-md dark:bg-white/5"
                  )}
                >
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {title}
                  </p>
                  <p className="mb-1 text-5xl font-bold text-foreground">{price}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{unit}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <p className="inline-block rounded-full bg-green-500/10 px-6 py-3 text-lg font-semibold text-green-600 dark:text-green-400">
                {t("energyCommunity.pricing.comparison")}
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section - CALL TO ACTION */}
        <section className="py-20">
          <div className="container mx-auto max-w-4xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-bold text-foreground sm:text-5xl">
                {t("energyCommunity.cta.title")}
              </h2>

              <p className="text-xl text-muted-foreground">
                {t("energyCommunity.cta.subtitle")}
              </p>

              <div>
                <button
                  onClick={handleJoinClick}
                  className={cn(
                    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full",
                    "bg-gradient-to-r from-green-500 to-emerald-600 px-10 py-5 text-xl font-semibold text-white",
                    "shadow-2xl shadow-green-500/50 ring-4 ring-white/20",
                    "transition-all duration-300 hover:scale-105 hover:shadow-green-500/70 hover:ring-white/30"
                  )}
                >
                  <span className="relative z-10">{t("energyCommunity.cta.button")}</span>
                  <Zap className="relative z-10 h-6 w-6 transition-transform group-hover:rotate-12" />
                </button>
              </div>

              <p className="text-sm text-muted-foreground">
                {t("energyCommunity.cta.guarantee")}
              </p>
            </motion.div>
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
