"use client";

import { useTranslations } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, Clock, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetPainSection() {
  const { t } = useTranslations();

  const painPoints = [
    {
      icon: Phone,
      title: t('vetcall.pain.point1.title'),
      description: t('vetcall.pain.point1.description'),
    },
    {
      icon: Clock,
      title: t('vetcall.pain.point2.title'),
      description: t('vetcall.pain.point2.description'),
    },
    {
      icon: Calendar,
      title: t('vetcall.pain.point3.title'),
      description: t('vetcall.pain.point3.description'),
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('vetcall.pain.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border-2 hover:border-vet-emerald-500 transition-all hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="inline-flex p-3 bg-vet-emerald-100 dark:bg-vet-emerald-900/30 rounded-lg">
                      <point.icon className="h-6 w-6 text-vet-emerald-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {point.description}
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
