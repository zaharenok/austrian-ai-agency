"use client";

import { useState, useEffect } from 'react';
import { TranslationsProvider } from '@/context/language-context';
import { VetCallHeader } from '@/components/vetcall/vet-header';
import { VetCallFooter } from '@/components/vetcall/vet-footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

type Locale = 'en' | 'de' | 'ru';

export function VetContactClient({ locale }: { locale: Locale }) {
  const [translations, setTranslations] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      let t;
      if (locale === 'de') {
        t = await import('@/locales/de/common.json');
      } else if (locale === 'en') {
        t = await import('@/locales/en/common.json');
      } else {
        t = await import('@/locales/ru/common.json');
      }
      setTranslations(t.default);
    };

    loadTranslations();
  }, [locale]);

  if (!translations) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vet-emerald-600"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_VETCALL_WEBHOOK_URL || 'https://n8n.aaagency.at/webhook/vetcall-contact',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        setIsSuccess(true);
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setIsSuccess(false), 5000);
      }
    } catch (error) {
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TranslationsProvider locale={locale} translations={translations}>
      <div className="min-h-screen bg-gradient-to-br from-vet-emerald-50 via-white to-vet-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <VetCallHeader />

        <main className="container py-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {translations.vetcall.navigation.contact}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {translations.contactForm.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-vet-emerald-100 dark:bg-vet-emerald-900/30 rounded-lg">
                        <Mail className="h-6 w-6 text-vet-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                        <a href="mailto:contact@vetcall.ai" className="text-vet-emerald-600 hover:underline">
                          contact@vetcall.ai
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-vet-emerald-100 dark:bg-vet-emerald-900/30 rounded-lg">
                        <Phone className="h-6 w-6 text-vet-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Telefon</h3>
                        <a href="tel:+43XXXXXXXXX" className="text-vet-emerald-600 hover:underline">
                          +43 XXX XXX XXX
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-vet-emerald-100 dark:bg-vet-emerald-900/30 rounded-lg">
                        <MapPin className="h-6 w-6 text-vet-emerald-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Standort</h3>
                        <p className="text-gray-600 dark:text-gray-300">Wien, Österreich</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>{translations.contactForm.title}</CardTitle>
                    <CardDescription>{translations.contactForm.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">{translations.contactForm.nameLabel} *</Label>
                          <Input id="name" name="name" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{translations.contactForm.emailLabel} *</Label>
                          <Input id="email" name="email" type="email" required />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Betreff *</Label>
                        <Input id="subject" name="subject" required />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">{translations.contactForm.messageLabel} *</Label>
                        <Textarea id="message" name="message" required rows={6} />
                      </div>

                      {isSuccess && (
                        <div className="p-4 bg-vet-emerald-50 dark:bg-vet-emerald-900/30 border border-vet-emerald-200 dark:border-vet-emerald-800 rounded-lg text-vet-emerald-800 dark:text-vet-emerald-200">
                          {translations.contactForm.successMessage}
                        </div>
                      )}

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-vet-emerald-600 to-vet-teal-600 hover:from-vet-emerald-700 hover:to-vet-teal-700"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        {isSubmitting ? translations.contactForm.submitting : translations.contactForm.submit}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <VetCallFooter />
      </div>
    </TranslationsProvider>
  );
}
