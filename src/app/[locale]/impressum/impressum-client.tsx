"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";

const CONTENT: Record<string, { sections: { title: string; body: React.ReactNode }[] }> = {
  de: {
    sections: [
      {
        title: "Angaben gemäß § 5 ECG",
        body: (
          <>
            <p><strong>GeloKS GesmbH</strong></p>
            <p>Michelbeuerngasse 2/22<br />1090 Wien<br />Österreich</p>
            <p>FN 371573g<br />Firmenbuchgericht: Handelsgericht Wien</p>
            <p>Geschäftsführer: Oleg Zaharenok</p>
          </>
        ),
      },
      {
        title: "Unternehmensgegenstand",
        body: (
          <p>Unternehmensberatung (freies Gewerbe gemäß § 94 Z 33 GewO), insbesondere Beratung im Bereich EU-KI-Verordnung (AI Act), Datenschutz (DSGVO) und digitale Compliance.</p>
        ),
      },
      {
        title: "Kontakt",
        body: (
          <>
            <p>E-Mail: office@aaagency.at<br />Website: https://aaagency.at</p>
            <p>UID: wird nachgereicht</p>
          </>
        ),
      },
      {
        title: "Mitgliedschaften / Aufsichtsbehörde",
        body: (
          <p>Zuständige Gewerbebehörde: Magistratisches Bezirksamt für den 9. Bezirk, Wien.<br />Mitglied der Wirtschaftskammer Österreich (WKO).</p>
        ),
      },
      {
        title: "EU-Streitschlichtung",
        body: (
          <p>Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung): Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <Link className="underline" href="https://ec.europa.eu/consumers/odr">https://ec.europa.eu/consumers/odr</Link></p>
        ),
      },
      {
        title: "Haftung für Inhalte",
        body: (
          <p>Als Diensteanbieter sind wir gemäß § 18 Abs. 2 ECG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Wir sind jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
        ),
      },
      {
        title: "Urheberrecht",
        body: (
          <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem österreichischen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
        ),
      },
    ],
  },
  en: {
    sections: [
      {
        title: "Information pursuant to § 5 ECG",
        body: (
          <>
            <p><strong>GeloKS GesmbH</strong></p>
            <p>Michelbeuerngasse 2/22<br />1090 Vienna<br />Austria</p>
            <p>FN 371573g<br />Commercial Court: Handelsgericht Wien</p>
            <p>Managing Director: Oleg Zaharenok</p>
          </>
        ),
      },
      {
        title: "Business purpose",
        body: (
          <p>Management consulting (free trade pursuant to § 94 No. 33 GewO), in particular consulting on the EU AI Act, data protection (GDPR) and digital compliance.</p>
        ),
      },
      {
        title: "Contact",
        body: (
          <>
            <p>E-mail: office@aaagency.at<br />Website: https://aaagency.at</p>
            <p>VAT ID: to be provided</p>
          </>
        ),
      },
      {
        title: "Supervisory authority",
        body: (
          <p>Competent trade authority: Magistratisches Bezirksamt for the 9th district, Vienna.<br />Member of the Austrian Economic Chamber (WKO).</p>
        ),
      },
      {
        title: "EU dispute resolution",
        body: (
          <p>Pursuant to the ODR Regulation, the European Commission provides a platform for online dispute resolution: <Link className="underline" href="https://ec.europa.eu/consumers/odr">https://ec.europa.eu/consumers/odr</Link></p>
        ),
      },
      {
        title: "Liability for content",
        body: (
          <p>As a service provider we are responsible for our own content on these pages in accordance with general laws. We are not obliged to monitor transmitted or stored third-party information.</p>
        ),
      },
      {
        title: "Copyright",
        body: (
          <p>The content and works created by the site operators are subject to Austrian copyright law. Reproduction, adaptation, distribution and any kind of exploitation beyond the limits of copyright require the written consent of the respective author.</p>
        ),
      },
    ],
  },
  ru: {
    sections: [
      {
        title: "Информация согласно § 5 ECG",
        body: (
          <>
            <p><strong>GeloKS GesmbH</strong></p>
            <p>Michelbeuerngasse 2/22<br />1090 Вена<br />Австрия</p>
            <p>FN 371573g<br />Торговый суд: Handelsgericht Wien</p>
            <p>Управляющий директор: Олег Захаренок</p>
          </>
        ),
      },
      {
        title: "Сфера деятельности",
        body: (
          <p>Бизнес-консалтинг (свободный промысел согласно § 94 Z 33 GewO), в частности консалтинг по EU AI Act (KI-Verordnung), защите данных (DSGVO) и цифровому комплаенсу.</p>
        ),
      },
      {
        title: "Контакт",
        body: (
          <>
            <p>E-mail: office@aaagency.at<br />Сайт: https://aaagency.at</p>
            <p>UID: будет указан</p>
          </>
        ),
      },
      {
        title: "Надзорный орган",
        body: (
          <p>Компетентный торговый орган: Magistratisches Bezirksamt 9-го округа, Вена.<br />Член Экономической палаты Австрии (WKO).</p>
        ),
      },
      {
        title: "Разрешение споров в ЕС",
        body: (
          <p>Согласно Регламенту ODR Европейская комиссия предоставляет платформу для онлайн-разрешения споров: <Link className="underline" href="https://ec.europa.eu/consumers/odr">https://ec.europa.eu/consumers/odr</Link></p>
        ),
      },
      {
        title: "Ответственность за содержание",
        body: (
          <p>Как поставщик услуг мы несём ответственность за собственное содержание на этих страницах в соответствии с общими законами. Мы не обязаны контролировать передаваемую или хранимую стороннюю информацию.</p>
        ),
      },
      {
        title: "Авторское право",
        body: (
          <p>Содержание и работы, созданные операторами сайта, подлежат австрийскому законодательству об авторском праве. Воспроизведение, обработка, распространение и любые виды использования за пределами авторского права требуют письменного согласия соответствующего автора.</p>
        ),
      },
    ],
  },
};

export function ImpressumClient() {
  const { t, locale } = useTranslations();
  const lang = locale === "de" ? "de" : locale === "ru" ? "ru" : "en";
  const { sections } = CONTENT[lang];

  return (
    <div className="mx-auto max-w-3xl flex flex-col gap-6 px-4 py-10 sm:px-6">
      <div className="flex items-center">
        <Link href={`/${locale}`}>
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t("navigation.backToHome")}
          </Button>
        </Link>
      </div>

      <div className="rounded-3xl border border-primary/10 bg-white/80 p-8 shadow-lg backdrop-blur-lg dark:bg-white/5 sm:p-10">
        <h1 className="mb-8 text-3xl font-bold text-foreground">Impressum</h1>
        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-xl font-semibold text-foreground">{section.title}</h2>
              <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">{section.body}</div>
            </section>
          ))}
        </div>
        <p className="mt-10 text-xs text-muted-foreground">Stand: {new Date().toLocaleDateString("de-AT")}</p>
      </div>
    </div>
  );
}
