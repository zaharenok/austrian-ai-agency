"use client";

import { useTranslations } from '@/context/language-context';
import { PhoneCall, BrainCircuit, Zap, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetHowItWorks() {
  const { t } = useTranslations();

  const steps = [
    {
      icon: PhoneCall,
      title: t('vetcall.howItWorks.step1.title'),
      description: t('vetcall.howItWorks.step1.description'),
    },
    {
      icon: BrainCircuit,
      title: t('vetcall.howItWorks.step2.title'),
      description: t('vetcall.howItWorks.step2.description'),
    },
    {
      icon: Zap,
      title: t('vetcall.howItWorks.step3.title'),
      description: t('vetcall.howItWorks.step3.description'),
    },
    {
      icon: FileText,
      title: t('vetcall.howItWorks.step4.title'),
      description: t('vetcall.howItWorks.step4.description'),
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-vet-teal-50 to-vet-emerald-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('vetcall.howItWorks.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('vetcall.howItWorks.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-vet-emerald-600 to-vet-teal-600 rounded-full blur-xl opacity-30"></div>
                  <div className="relative flex items-center justify-center w-20 h-20 bg-gradient-to-br from-vet-emerald-600 to-vet-teal-600 rounded-full">
                    <step.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center border-2 border-vet-emerald-600 font-bold text-vet-emerald-600">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 right-0 w-full h-0.5 bg-gradient-to-r from-vet-emerald-300 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
