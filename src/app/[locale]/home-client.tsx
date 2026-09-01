"use client";

import { Hero } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ServicesSection } from "@/components/ui/services-section";
import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";
import { useScrollBoundary } from "@/hooks/use-scroll-boundary";
import { BrainCircuit, ShieldCheck, Users2, Scan, Search, Rocket, Activity } from "lucide-react";

const processIcons = [Scan, Search, Rocket, Activity];

export function HomeClient() {
  const { t } = useTranslations();
  const scrollBoundaryRef = useScrollBoundary();
  const steps = (t("process.steps") as unknown as Array<{ num: string; title: string; desc: string }>) || [];

  return (
    <AuroraBackground className="flex flex-col">
      <div className="flex-1">
        <Hero />

        <section id="services" className="border-y border-primary/10 bg-white/80 py-20 backdrop-blur-md dark:bg-zinc-900/80">
          <ServicesSection />
        </section>

        <section id="process" className="py-20 bg-white/60 dark:bg-zinc-900/60">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="space-y-4 text-center mb-14">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-spektr-cyan-300">
                {t("process.title")}
              </p>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("process.subtitle")}</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, i) => {
                const Icon = processIcons[i % processIcons.length];
                return (
                  <div key={i} className="relative text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-spektr-cyan/10 text-spektr-cyan">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div className="mb-2 text-sm font-bold text-spektr-cyan">{step.num}</div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                    {i < steps.length - 1 && (
                      <div className="absolute right-0 top-8 hidden h-px w-full bg-gradient-to-r from-spektr-cyan/20 to-transparent lg:block" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="why" className="py-20">
          <div className="container mx-auto grid gap-10 px-4 text-center sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:text-left">
            <div className="space-y-6">
              <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-spektr-cyan-300">
                {t("navigation.whyUs")}
              </p>
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">{t("whyChoose.title")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("hero.description")}
              </p>
            </div>

            <div className="grid gap-6">
              {[{
                icon: BrainCircuit,
                title: t("whyChoose.innovation.title"),
                description: t("whyChoose.innovation.description")
              }, {
                icon: Users2,
                title: t("whyChoose.expertise.title"),
                description: t("whyChoose.expertise.description")
              }, {
                icon: ShieldCheck,
                title: t("whyChoose.support.title"),
                description: t("whyChoose.support.description")
              }].map(({ icon: Icon, title, description }) => (
                <div key={title as string} className="flex items-start gap-4 rounded-2xl border border-border/60 bg-white/80 p-6 text-left backdrop-blur-md dark:bg-white/5">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{description}</p>
                  </div>
                </div>
              ))}
            </div>
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
