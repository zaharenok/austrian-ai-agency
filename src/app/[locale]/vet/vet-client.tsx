"use client";

import { useEffect, useState } from 'react';
import { TranslationsProvider } from '@/context/language-context';
import { VetHeroSection } from '@/components/vetcall/vet-hero-section';
import { VetPainSection } from '@/components/vetcall/vet-pain-section';
import { VetHowItWorks } from '@/components/vetcall/vet-how-it-works';
import { VetBenefits } from '@/components/vetcall/vet-benefits';
import { VetIntegrations } from '@/components/vetcall/vet-integrations';
import { VetTestimonials } from '@/components/vetcall/vet-testimonials';
import { VetPricing } from '@/components/vetcall/vet-pricing';
import { VetFAQ } from '@/components/vetcall/vet-faq';
import { VetCompliance } from '@/components/vetcall/vet-compliance';
import { VetFinalCTA } from '@/components/vetcall/vet-final-cta';
import { VetWhatsAppButton } from '@/components/vetcall/vet-whatsapp-button';
import { VetCallHeader } from '@/components/vetcall/vet-header';
import { VetCallFooter } from '@/components/vetcall/vet-footer';
import { VetCallJsonLd } from '@/components/vetcall/vet-json-ld';

type Locale = 'en' | 'de' | 'ru';

export function VetCallClient({ locale: initialLocale }: { locale: Locale }) {
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      let t;
      if (initialLocale === 'de') {
        t = await import('@/locales/de/common.json');
      } else if (initialLocale === 'en') {
        t = await import('@/locales/en/common.json');
      } else {
        t = await import('@/locales/ru/common.json');
      }
      setTranslations(t.default);
    };

    loadTranslations();
  }, [initialLocale]);

  if (!translations) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-vet-emerald-50 to-vet-teal-50 dark:from-gray-900 dark:to-gray-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vet-emerald-600"></div>
      </div>
    );
  }

  return (
    <TranslationsProvider locale={initialLocale} translations={translations}>
      <VetCallJsonLd />
      <div className="min-h-screen bg-gradient-to-br from-vet-emerald-50 via-white to-vet-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <VetCallHeader />

        <main>
          <VetHeroSection />
          <VetPainSection />
          <VetHowItWorks />
          <VetBenefits />
          <VetIntegrations />
          <VetTestimonials />
          <VetPricing />
          <VetFAQ />
          <VetCompliance />
          <VetFinalCTA />
        </main>

        <VetCallFooter />
        <VetWhatsAppButton />
      </div>
    </TranslationsProvider>
  );
}
