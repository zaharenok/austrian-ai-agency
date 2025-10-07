"use client";

import { Hero } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ServicesSection } from "@/components/ui/services-section";
import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";
import { useScrollBoundary } from "@/hooks/use-scroll-boundary";
import { BrainCircuit, ShieldCheck, Users2 } from "lucide-react";

export function HomeClient() {
  const { t } = useTranslations();
  const scrollBoundaryRef = useScrollBoundary();

  return (
    <div className="page-container">
      <AuroraBackground className="min-h-screen">
        <div className="flex min-h-screen flex-col">
          <div className="flex-1 space-y-24 pb-24">
            <Hero />

            <section id="services" className="border-y border-primary/10 bg-white/80 py-20 backdrop-blur-md dark:bg-zinc-900/80">
              <ServicesSection />
            </section>

            <section id="why" className="py-20">
              <div className="container mx-auto grid gap-10 px-4 text-center sm:px-6 lg:grid-cols-[1.2fr,1fr] lg:text-left">
                <div className="space-y-6">
                  <p className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-spektr-cyan-300">
                    {t("navigation.whyUs")}
                  </p>
                  <h2 className="text-3xl font-bold md:text-4xl">{t("whyChoose.title")}</h2>
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
                        <h3 className="text-xl font-semibold">{title}</h3>
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
            className="footer-boundary mt-auto w-full border-t border-primary/10 bg-white/90 backdrop-blur-md dark:bg-zinc-900/90"
          >
            <SiteFooter />
            <div className="scroll-boundary-detector" aria-hidden="true"></div>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}
