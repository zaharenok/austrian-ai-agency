"use client";

import { useState } from 'react';
import { useTranslations } from '@/context/language-context';
import { Button } from '@/components/ui/button';
import { VetCTAModal } from './vet-cta-modal';
import { Phone } from 'lucide-react';
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

            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => handleCTAClick('trial')}
                className="bg-white text-vet-emerald-600 hover:bg-gray-50 text-lg px-10 py-7 rounded-xl shadow-2xl hover:shadow-white/50 transition-all transform hover:scale-105 ring-2 ring-white/50 ring-offset-2 ring-offset-vet-emerald-600"
              >
                <Phone className="mr-2 h-6 w-6" />
                {t('vetcall.finalCta.ctaPrimary')}
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
