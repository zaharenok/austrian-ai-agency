"use client";

import { useTranslations } from '@/context/language-context';
import { MessageSquare, Calendar, Cog, Mic, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetIntegrations() {
  const { t } = useTranslations();

  const integrations = [
    { icon: MessageSquare, name: t('vetcall.integrations.whatsapp') },
    { icon: Calendar, name: t('vetcall.integrations.calendar') },
    { icon: Cog, name: t('vetcall.integrations.automation') },
    { icon: Mic, name: t('vetcall.integrations.voice') },
    { icon: Mail, name: t('vetcall.integrations.notifications') },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-vet-emerald-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {t('vetcall.integrations.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t('vetcall.integrations.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-8">
          {integrations.map((integration, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
                <integration.icon className="h-12 w-12 text-vet-emerald-600" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {integration.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
