"use client";

import Link from "next/link";
import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/context/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function MainHeader() {
  const { locale, t } = useTranslations();
  const pathname = usePathname();

  const navItems = useMemo(
    () => [
      { key: "home", href: `/${locale}`, label: t("navigation.home") },
      { key: "services", href: `/${locale}#services`, label: t("navigation.services") },
      { key: "why", href: `/${locale}#why`, label: t("navigation.whyUs") },
    ],
    [locale, t]
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-white/80 backdrop-blur-md transition-colors dark:bg-zinc-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href={`/${locale}`} className="flex items-center gap-2 font-semibold tracking-tight">
          <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">AI</span>
          <span className="hidden text-sm text-muted-foreground sm:block">Austrian AI Agency</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href || (item.key === "home" && pathname === `/${locale}`)
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link href={`/${locale}/contact`}>
            <Button size="sm" className="hidden sm:inline-flex">
              {t("cta.contact")}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
