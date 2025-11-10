"use client";

import { useTranslations } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingDown, CalendarCheck, PhoneForwarded, Smartphone, Shield, TestTubes } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetBenefits() {
  const { t } = useTranslations();

  const benefits = [
    { icon: TrendingDown, text: t('vetcall.benefits.benefit1') },
    { icon: CalendarCheck, text: t('vetcall.benefits.benefit2') },
    { icon: PhoneForwarded, text: t('vetcall.benefits.benefit3') },
    { icon: Smartphone, text: t('vetcall.benefits.benefit4') },
    { icon: Shield, text: t('vetcall.benefits.benefit5') },
    { icon: TestTubes, text: t('vetcall.benefits.benefit6') },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('vetcall.benefits.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('vetcall.benefits.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="h-full border-2 hover:border-vet-emerald-500 hover:shadow-lg transition-all group">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-vet-emerald-100 dark:bg-vet-emerald-900/30 rounded-lg group-hover:bg-vet-emerald-200 dark:group-hover:bg-vet-emerald-800/50 transition-colors">
                      <benefit.icon className="h-6 w-6 text-vet-emerald-600" />
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 font-medium pt-2">
                    {benefit.text}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
