"use client";

import { useTranslations } from '@/context/language-context';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';

export function VetFAQ() {
  const { t } = useTranslations();

  const faqs = [
    {
      question: t('vetcall.faq.q1.question'),
      answer: t('vetcall.faq.q1.answer'),
    },
    {
      question: t('vetcall.faq.q2.question'),
      answer: t('vetcall.faq.q2.answer'),
    },
    {
      question: t('vetcall.faq.q3.question'),
      answer: t('vetcall.faq.q3.answer'),
    },
    {
      question: t('vetcall.faq.q4.question'),
      answer: t('vetcall.faq.q4.answer'),
    },
    {
      question: t('vetcall.faq.q5.question'),
      answer: t('vetcall.faq.q5.answer'),
    },
    {
      question: t('vetcall.faq.q6.question'),
      answer: t('vetcall.faq.q6.answer'),
    },
  ];

  return (
    <section id="faq" className="py-20 bg-white dark:bg-gray-800">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('vetcall.faq.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('vetcall.faq.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="space-y-4" suppressHydrationWarning>
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`faq-q${index + 1}`}
                value={`faq-q${index + 1}`}
                className="border-2 border-gray-200 dark:border-gray-700 rounded-lg px-6 hover:border-vet-emerald-500 transition-colors"
                suppressHydrationWarning
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 dark:text-white hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
