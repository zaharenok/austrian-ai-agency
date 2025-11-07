"use client";

import { useState } from 'react';
import { useTranslations } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { VetCTAModal } from './vet-cta-modal';
import { Phone, Shield, Zap, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetHeroSection() {
  const { t } = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'trial' | 'demo'>('trial');

  const handleCTAClick = (type: 'trial' | 'demo') => {
    setModalType(type);
    setIsModalOpen(true);

    // Analytics
    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: type === 'trial' ? 'cta_free_trial_clicked' : 'cta_demo_clicked',
        page: 'vet_hero'
      });
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-vet-emerald-50 via-white to-vet-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 md:py-32">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-vet-emerald-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-vet-teal-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl mb-6">
                {t('vetcall.hero.title')}
              </h1>
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 sm:text-xl max-w-3xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {t('vetcall.hero.subtitle')}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button
                size="lg"
                onClick={() => handleCTAClick('trial')}
                className="bg-gradient-to-r from-vet-emerald-600 to-vet-teal-600 hover:from-vet-emerald-700 hover:to-vet-teal-700 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                {t('vetcall.hero.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCTAClick('demo')}
                className="border-2 border-vet-emerald-600 text-vet-emerald-600 hover:bg-vet-emerald-50 dark:border-vet-emerald-400 dark:text-vet-emerald-400 text-lg px-8 py-6 rounded-xl transition-all"
              >
                {t('vetcall.hero.ctaSecondary')}
              </Button>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-vet-emerald-600" />
                <span>{t('vetcall.hero.trustBadge1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-vet-emerald-600" />
                <span>{t('vetcall.hero.trustBadge2')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-vet-emerald-600" />
                <span>{t('vetcall.hero.trustBadge3')}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <VetCTAModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType}
      />
    </>
  );
}
