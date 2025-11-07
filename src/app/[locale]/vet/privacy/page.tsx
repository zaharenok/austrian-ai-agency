"use client";

import { useState, useEffect } from 'react';
import { TranslationsProvider } from '@/context/language-context';
import { VetCallHeader } from '@/components/vetcall/vet-header';
import { VetCallFooter } from '@/components/vetcall/vet-footer';

export default function VetPrivacyPage({ params }: { params: { locale: 'en' | 'de' | 'ru' } }) {
  const [translations, setTranslations] = useState<any>(null);

  useEffect(() => {
    const loadTranslations = async () => {
      let t;
      if (params.locale === 'de') {
        t = await import('@/locales/de/common.json');
      } else if (params.locale === 'en') {
        t = await import('@/locales/en/common.json');
      } else {
        t = await import('@/locales/ru/common.json');
      }
      setTranslations(t.default);
    };

    loadTranslations();
  }, [params.locale]);

  if (!translations) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-vet-emerald-600"></div>
      </div>
    );
  }

  return (
    <TranslationsProvider locale={params.locale} translations={translations}>
      <div className="min-h-screen bg-gradient-to-br from-vet-emerald-50 via-white to-vet-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <VetCallHeader />

        <main className="container py-20">
          <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Datenschutzerklärung
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Verantwortlicher</h2>
                <p>
                  VetCall AI<br />
                  Betrieben von Austrian AI Agency<br />
                  Wien, Österreich<br />
                  E-Mail: contact@vetcall.ai
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  2. Verarbeitung personenbezogener Daten
                </h2>
                <p>
                  Wir verarbeiten personenbezogene Daten unserer Kunden und Nutzer ausschließlich im Rahmen der
                  gesetzlichen Bestimmungen der DSGVO und des österreichischen Datenschutzgesetzes.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Erhobene Daten</h2>
                <p>Im Rahmen unserer Dienstleistung erheben wir folgende Daten:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name der Klinik</li>
                  <li>Kontaktperson</li>
                  <li>E-Mail-Adresse</li>
                  <li>Telefonnummer</li>
                  <li>Standort (Stadt/PLZ)</li>
                  <li>Anrufprotokolle und -zusammenfassungen</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Zweck der Verarbeitung</h2>
                <p>Die erhobenen Daten werden verwendet für:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bereitstellung unserer Telefonassistenz-Dienstleistung</li>
                  <li>Terminbuchungen und -verwaltung</li>
                  <li>Kundensupport und Kommunikation</li>
                  <li>Rechnungsstellung</li>
                  <li>Service-Verbesserung und -Optimierung</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. Datenspeicherung</h2>
                <p>
                  Alle Daten werden in der Europäischen Union gehostet. Anrufprotokolle werden für 60-90 Tage
                  aufbewahrt und anschließend automatisch gelöscht. Kundendaten werden für die Dauer der
                  Geschäftsbeziehung sowie gesetzliche Aufbewahrungsfristen aufbewahrt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Ihre Rechte</h2>
                <p>Sie haben das Recht auf:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Auskunft über Ihre gespeicherten Daten</li>
                  <li>Berichtigung unrichtiger Daten</li>
                  <li>Löschung Ihrer Daten</li>
                  <li>Einschränkung der Verarbeitung</li>
                  <li>Datenübertragbarkeit</li>
                  <li>Widerspruch gegen die Verarbeitung</li>
                  <li>Beschwerde bei der Datenschutzbehörde</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Datensicherheit</h2>
                <p>
                  Wir verwenden moderne Verschlüsselungstechnologien und Sicherheitsmaßnahmen zum Schutz Ihrer
                  Daten. Alle Mitarbeiter sind zur Vertraulichkeit verpflichtet.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Kontakt</h2>
                <p>
                  Bei Fragen zum Datenschutz kontaktieren Sie uns unter:<br />
                  E-Mail: privacy@vetcall.ai<br />
                  Stand: {new Date().toLocaleDateString('de-AT')}
                </p>
              </section>
            </div>
          </div>
        </main>

        <VetCallFooter />
      </div>
    </TranslationsProvider>
  );
}
