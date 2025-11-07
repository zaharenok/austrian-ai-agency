"use client";

import { useTranslations } from '@/context/language-context';
import { VetCallHeader } from '@/components/vetcall/vet-header';
import { VetCallFooter } from '@/components/vetcall/vet-footer';

export function VetImpressumClient() {
  const { t, locale } = useTranslations();

  return (
    <div className="min-h-screen bg-gradient-to-br from-vet-emerald-50 via-white to-vet-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <VetCallHeader />

        <main className="container py-20">
          <div className="max-w-4xl mx-auto prose dark:prose-invert">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Impressum
            </h1>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Angaben gemäß § 5 TMG und § 25 MedienG
                </h2>
                <p>
                  <strong>VetCall AI</strong><br />
                  Ein Service von Austrian AI Agency<br />
                  Wien, Österreich
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Kontakt</h2>
                <p>
                  E-Mail: contact@vetcall.ai<br />
                  Telefon: +43 XXX XXX XXX<br />
                  Website: https://aaagency.at/{locale}/vet
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Geschäftsführung
                </h2>
                <p>
                  [Geschäftsführer Name]
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Umsatzsteuer-ID
                </h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß §27 a Umsatzsteuergesetz:<br />
                  ATU[XXXXXXXX]
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Aufsichtsbehörde
                </h2>
                <p>
                  Magistrat der Stadt Wien<br />
                  Gewerbebehörde<br />
                  Wien, Österreich
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Haftungsausschluss
                </h2>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Haftung für Inhalte</h3>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
                  Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 mt-4">Haftung für Links</h3>
                <p>
                  Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
                  Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Urheberrecht</h2>
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen
                  dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede
                  Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen
                  Zustimmung des jeweiligen Autors bzw. Erstellers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  Online-Streitbeilegung
                </h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                  <a
                    href="https://ec.europa.eu/consumers/odr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-vet-emerald-600 hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr
                  </a>
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Stand: {new Date().toLocaleDateString('de-AT')}
                </p>
              </section>
            </div>
          </div>
        </main>

      <VetCallFooter />
    </div>
  );
}
