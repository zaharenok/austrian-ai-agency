"use client";

import Link from 'next/link';
import { useTranslations } from '@/context/language-context';
import { LanguageSwitcher } from '@/components/ui/language-switcher';
import { Stethoscope } from 'lucide-react';

export function VetCallHeader() {
  const { t, locale } = useTranslations();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-900/95">
      <div className="container flex h-16 items-center justify-between">
        <Link href={`/${locale}/vet`} className="flex items-center space-x-2 group">
          <div className="rounded-lg bg-gradient-to-br from-vet-emerald-500 to-vet-teal-600 p-2 transition-transform group-hover:scale-110">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-vet-emerald-600 to-vet-teal-600 bg-clip-text text-transparent">
            VetCall AI
          </span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href={`/${locale}/vet#pricing`} className="text-gray-700 hover:text-vet-emerald-600 transition-colors dark:text-gray-300">
            {t('vetcall.navigation.pricing')}
          </Link>
          <Link href={`/${locale}/vet#faq`} className="text-gray-700 hover:text-vet-emerald-600 transition-colors dark:text-gray-300">
            {t('vetcall.navigation.faq')}
          </Link>
          <Link href={`/${locale}/vet/contact`} className="text-gray-700 hover:text-vet-emerald-600 transition-colors dark:text-gray-300">
            {t('vetcall.navigation.contact')}
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
