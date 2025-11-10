"use client";

import { useState } from 'react';
import { useTranslations } from '@/context/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VetCTAModal } from './vet-cta-modal';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetPricing() {
  const { t } = useTranslations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'trial' | 'demo'>('trial');

  const plans = [
    {
      name: t('vetcall.pricing.basic.name'),
      description: t('vetcall.pricing.basic.description'),
      price: t('vetcall.pricing.basic.price'),
      period: t('vetcall.pricing.basic.period'),
      features: [
        t('vetcall.pricing.basic.feature1'),
        t('vetcall.pricing.basic.feature2'),
        t('vetcall.pricing.basic.feature3'),
        t('vetcall.pricing.basic.feature4'),
        t('vetcall.pricing.basic.feature5'),
      ],
      highlighted: false,
    },
    {
      name: t('vetcall.pricing.pro.name'),
      description: t('vetcall.pricing.pro.description'),
      badge: t('vetcall.pricing.pro.badge'),
      price: t('vetcall.pricing.pro.price'),
      period: t('vetcall.pricing.pro.period'),
      features: [
        t('vetcall.pricing.pro.feature1'),
        t('vetcall.pricing.pro.feature2'),
        t('vetcall.pricing.pro.feature3'),
        t('vetcall.pricing.pro.feature4'),
        t('vetcall.pricing.pro.feature5'),
      ],
      highlighted: true,
    },
    {
      name: t('vetcall.pricing.enterprise.name'),
      description: t('vetcall.pricing.enterprise.description'),
      price: t('vetcall.pricing.enterprise.price'),
      period: t('vetcall.pricing.enterprise.period'),
      features: [
        t('vetcall.pricing.enterprise.feature1'),
        t('vetcall.pricing.enterprise.feature2'),
        t('vetcall.pricing.enterprise.feature3'),
        t('vetcall.pricing.enterprise.feature4'),
        t('vetcall.pricing.enterprise.feature5'),
      ],
      highlighted: false,
    },
  ];

  const handleCTAClick = (planName: string) => {
    setModalType('trial');
    setIsModalOpen(true);

    if (typeof window !== 'undefined' && (window as any).dataLayer) {
      (window as any).dataLayer.push({
        event: 'pricing_plan_selected',
        plan: planName
      });
    }
  };

  return (
    <>
      <section id="pricing" className="py-20 bg-gradient-to-br from-vet-teal-50 to-vet-emerald-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('vetcall.pricing.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('vetcall.pricing.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <Card className={`h-full ${
                  plan.highlighted
                    ? 'border-4 border-vet-emerald-600 shadow-2xl transform md:-translate-y-4'
                    : 'border-2'
                }`}>
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-vet-emerald-600 to-vet-teal-600 text-white px-4 py-1 text-sm">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                      {plan.period && (
                        <span className="text-gray-600 dark:text-gray-400 ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <Check className="h-5 w-5 text-vet-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      onClick={() => handleCTAClick(plan.name)}
                      className={`w-full ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-vet-emerald-600 to-vet-teal-600 hover:from-vet-emerald-700 hover:to-vet-teal-700'
                          : 'bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900'
                      }`}
                    >
                      {t('vetcall.hero.ctaPrimary')}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-8 text-gray-600 dark:text-gray-400"
          >
            {t('vetcall.pricing.guarantee')}
          </motion.p>
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
