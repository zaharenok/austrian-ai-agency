"use client";

import Link from 'next/link';
import { useTranslations } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetCompliance() {
  const { t, locale } = useTranslations();

  return (
    <section className="py-16 bg-gradient-to-br from-vet-emerald-50 to-vet-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-2 border-vet-emerald-200 dark:border-vet-emerald-800">
            <CardContent className="p-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex-shrink-0">
                  <Shield className="h-10 w-10 text-vet-emerald-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {t('vetcall.compliance.title')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {t('vetcall.compliance.description')}
                  </p>
                  <Link
                    href={`/${locale}/vet/privacy`}
                    className="text-vet-emerald-600 hover:text-vet-emerald-700 font-medium underline"
                  >
                    {t('vetcall.compliance.linkText')} →
                  </Link>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <AlertTriangle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium">
                  {t('vetcall.compliance.disclaimer')}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
