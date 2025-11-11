"use client";

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
import { VetCallHeader } from '@/components/vetcall/vet-header';
import { VetCallFooter } from '@/components/vetcall/vet-footer';
import { VetCallJsonLd } from '@/components/vetcall/vet-json-ld';

export function VetCallClient() {
  return (
    <>
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
      </div>
    </>
  );
}
