"use client";

import { useTranslations } from "@/context/language-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

export function SiteFooter() {
  const { t, locale } = useTranslations();
  const year = new Date().getFullYear();
  
  return (
    <footer className="scroll-snap-align-end bg-black/10 py-10 text-sm text-muted-foreground backdrop-blur-sm dark:bg-zinc-950/40">
      <div className="container mx-auto flex flex-col gap-8 px-4 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xl space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Austrian AI Agency</h2>
          <p className="text-sm text-muted-foreground">
            {t("hero.description")}
          </p>
        </div>

        <div className="flex flex-col items-start gap-4 text-sm md:items-end">
          <Link href={`/${locale}/contact`}>
            <Button size="sm" className="gap-2">
              {t("cta.bookIntro")}
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
          <div className="flex flex-col items-start gap-2 text-right text-muted-foreground md:items-end">
            <Link href={`/${locale}#services`} className="hover:text-primary">
              {t("navigation.services")}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-primary">
              {t("navigation.contact")}
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-muted-foreground">
        © {year} Austrian AI Agency. {t("footer.rights")}
      </div>
    </footer>
  );
}
