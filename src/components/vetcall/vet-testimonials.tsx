"use client";

import { useTranslations } from '@/context/language-context';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function VetTestimonials() {
  const { t } = useTranslations();

  const testimonials = [
    {
      text: t('vetcall.testimonials.testimonial1.text'),
      author: t('vetcall.testimonials.testimonial1.author'),
      clinic: t('vetcall.testimonials.testimonial1.clinic'),
    },
    {
      text: t('vetcall.testimonials.testimonial2.text'),
      author: t('vetcall.testimonials.testimonial2.author'),
      clinic: t('vetcall.testimonials.testimonial2.clinic'),
    },
    {
      text: t('vetcall.testimonials.testimonial3.text'),
      author: t('vetcall.testimonials.testimonial3.author'),
      clinic: t('vetcall.testimonials.testimonial3.clinic'),
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
            {t('vetcall.testimonials.title')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-gradient-to-br from-vet-emerald-50 to-vet-teal-50 dark:from-gray-700 dark:to-gray-800 border-2 border-vet-emerald-200 dark:border-vet-emerald-800">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Quote className="h-10 w-10 text-vet-emerald-600 opacity-50" />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                    "{testimonial.text}"
                  </p>

                  <div className="border-t border-vet-emerald-200 dark:border-vet-emerald-700 pt-4">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.clinic}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
