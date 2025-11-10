"use client";

import { useState } from 'react';
import { useTranslations } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { VetCTAModal } from './vet-cta-modal';
import { Phone, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetFinalCTA() {
  const { t } = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'trial' | 'demo'>('trial');

  const handleCTAClick = (type: 'trial' | 'demo') => {
    setModalType(type);
    setIsModalOpen(true);

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: type === 'trial' ? 'cta_free_trial_clicked' : 'cta_demo_clicked',
        page: 'vet_final_cta'
      });
    }
  };

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-vet-emerald-600 to-vet-teal-600">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-4">
              {t('vetcall.finalCta.title')}
            </h2>
            <p className="text-xl mb-8 text-vet-emerald-50">
              {t('vetcall.finalCta.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => handleCTAClick('trial')}
                className="bg-white text-vet-emerald-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                <Phone className="mr-2 h-5 w-5" />
                {t('vetcall.finalCta.ctaPrimary')}
              </Button>
              <Button
                size="lg"
                onClick={() => handleCTAClick('demo')}
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl transition-all"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t('vetcall.finalCta.ctaSecondary')}
              </Button>
            </div>
          </motion.div>
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
