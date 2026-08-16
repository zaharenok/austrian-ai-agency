"use client";

import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";

/**
 * AGB (Allgemeine Geschäftsbedingungen) — обязательная страница,
 * на которую ссылается чекбокс «Ich akzeptiere die AGB» на /ki-pakete.
 * Контент задан по локали (не зависит от типизации t()).
 */
export default function AgbClient() {
  const { locale } = useTranslations();

  const CONTENT: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
    de: {
      title: "Allgemeine Geschäftsbedingungen (AGB)",
      sections: [
        { h: "1. Geltungsbereich", p: "Diese AGB gelten für alle Leistungen der Austrian AI Agency (GeloKS GmbH, FN 371573g, Michelbeuerngasse 2/22, 1090 Wien) gegenüber Unternehmen (B2B). Abweichende Bedingungen des Kunden gelten nur, wenn schriftlich vereinbart." },
        { h: "2. Vertragsgegenstand", p: "Gegenstand des Vertrags sind Beratungs-, Prüf- und Umsetzungsleistungen im Bereich KI-Compliance (EU AI Act, DSGVO, TKG), insbesondere Website-Scans, Audits, Maßnahmenkataloge, Schulungen und laufendes Monitoring." },
        { h: "3. Angebot und Vertragsschluss", p: "Die auf der Website genannten Preise sind unverbindliche Angebote. Ein Vertrag kommt zustande, wenn der Kunde eine Bestellung über die Website aufgibt und das Angebot schriftlich (per E-Mail) bestätigt wird." },
        { h: "4. Preise und Zahlung", p: "Alle Preise verstehen sich zzgl. der gesetzlichen Umsatzsteuer (USt). Die Zahlung erfolgt per Banküberweisung auf unser Konto. Rechnungen sind innerhalb von 14 Tagen nach Rechnungsdatum fällig." },
        { h: "5. Leistungsumfang", p: "Der genaue Leistungsumfang ergibt sich aus der Leistungsbeschreibung im Angebot bzw. der Bestellung. Wir erbringen Leistungen nach bestem Wissen und Gewissen; eine Rechtsberatung im Sinne des RA-ÄG ist ausgeschlossen." },
        { h: "6. Haftung", p: "Die Haftung ist auf vorsätzliches und grob fahrlässiges Verhalten beschränkt. Für mittelbare Schäden und entgangenen Gewinn wird nicht gehaftet. Die Haftung ist der Höhe nach auf den Rechnungswert begrenzt." },
        { h: "7. Gewährleistung", p: "Es gilt die gesetzliche Gewährleistung. Beanstandungen sind innerhalb von 14 Tagen schriftlich geltend zu machen." },
        { h: "8. Vertraulichkeit und Datenschutz", p: "Wir behandeln alle Informationen des Kunden vertraulich. Personenbezogene Daten werden gemäß DSGVO verarbeitet; Details siehe Datenschutzerklärung." },
        { h: "9. Laufzeit und Kündigung", p: "Einmalige Leistungen enden mit der Erbringung. Laufende Serviceverträge (Monitoring) haben eine Mindestlaufzeit von 6 Monaten und verlängern sich stillschweigend um jeweils 3 Monate, sofern nicht 30 Tage vor Ablauf gekündigt wird." },
        { h: "10. Gerichtsstand und anwendbares Recht", p: "Es gilt österreichisches Recht. Gerichtsstand ist Wien. Für Verbraucher gelten die zwingenden Bestimmungen ihres Wohnsitzstaates." },
      ],
    },
    en: {
      title: "Terms and Conditions",
      sections: [
        { h: "1. Scope", p: "These terms apply to all services of Austrian AI Agency (GeloKS GmbH, FN 371573g, Michelbeuerngasse 2/22, 1090 Vienna) provided to businesses (B2B). Deviating customer terms apply only if agreed in writing." },
        { h: "2. Subject matter", p: "The contract covers advisory, audit and implementation services in the field of AI compliance (EU AI Act, GDPR, TKG), in particular website scans, audits, action plans, trainings and ongoing monitoring." },
        { h: "3. Offer and contract conclusion", p: "Prices listed on the website are non-binding offers. A contract is concluded when the customer places an order via the website and the offer is confirmed in writing (by email)." },
        { h: "4. Prices and payment", p: "All prices are exclusive of statutory VAT. Payment is by bank transfer to our account. Invoices are due within 14 days of the invoice date." },
        { h: "5. Scope of services", p: "The exact scope of services is defined in the service description in the offer or order. Services are provided with due care; legal advice within the meaning of the RA-ÄG is excluded." },
        { h: "6. Liability", p: "Liability is limited to intent and gross negligence. No liability for indirect damage or loss of profit. Liability is limited to the invoice value." },
        { h: "7. Warranty", p: "Statutory warranty applies. Claims must be made in writing within 14 days." },
        { h: "8. Confidentiality and data protection", p: "All customer information is treated confidentially. Personal data is processed in accordance with the GDPR; see the privacy policy for details." },
        { h: "9. Term and termination", p: "One-off services end upon delivery. Ongoing service contracts (monitoring) have a minimum term of 6 months and renew automatically for 3-month periods unless cancelled 30 days before expiry." },
        { h: "10. Jurisdiction and governing law", p: "Austrian law applies. Place of jurisdiction is Vienna. Mandatory provisions of the consumer's country of residence apply to consumers." },
      ],
    },
    ru: {
      title: "Условия предоставления услуг (AGB)",
      sections: [
        { h: "1. Сфера действия", p: "Настоящие условия применяются ко всем услугам Austrian AI Agency (GeloKS GmbH, FN 371573g, Michelbeuerngasse 2/22, 1090 Wien) для компаний (B2B). Иные условия клиента действуют только при письменном согласовании." },
        { h: "2. Предмет договора", p: "Предмет договора — консультационные, аудиторские и внедренческие услуги в области ИИ-комплаенса (EU AI Act, DSGVO, TKG), включая сканы сайтов, аудиты, каталоги мер, обучение и текущий мониторинг." },
        { h: "3. Предложение и заключение договора", p: "Цены на сайте — необязывающие предложения. Договор заключается, когда клиент оформляет заказ на сайте, а предложение подтверждается письменно (по электронной почте)." },
        { h: "4. Цены и оплата", p: "Все цены указаны без учёта НДС. Оплата производится банковским переводом на наш счёт. Счета подлежат оплате в течение 14 дней с даты выставления." },
        { h: "5. Объём услуг", p: "Точный объём услуг определяется описанием в предложении или заказе. Услуги оказываются с должной тщательностью; юридические консультации в смысле RA-ÄG исключены." },
        { h: "6. Ответственность", p: "Ответственность ограничена умыслом и грубой неосторожностью. За косвенный ущерб и упущенную выгоду не отвечаем. Ответственность ограничена суммой счёта." },
        { h: "7. Гарантия", p: "Действует законная гарантия. Претензии предъявляются в письменной форме в течение 14 дней." },
        { h: "8. Конфиденциальность и защита данных", p: "Вся информация клиента обрабатывается конфиденциально. Персональные данные обрабатываются согласно DSGVO; подробности — в политике конфиденциальности." },
        { h: "9. Срок и расторжение", p: "Разовые услуги завершаются по их оказании. Действующие сервисные договоры (мониторинг) имеют минимальный срок 6 месяцев и автоматически продлеваются на 3 месяца, если не расторгнуты за 30 дней." },
        { h: "10. Подсудность и применимое право", p: "Применяется австрийское право. Место подсудности — Вена. Для потребителей действуют императивные нормы страны проживания." },
      ],
    },
  };

  const c = CONTENT[locale] || CONTENT.de;

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">{c.title}</h1>
        <div className="space-y-6">
          {c.sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">{s.h}</h2>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{s.p}</p>
            </div>
          ))}
        </div>
        <p className="mt-10 text-xs text-slate-400">
          Austrian AI Agency · GeloKS GmbH · FN 371573g · Michelbeuerngasse 2/22, 1090 Wien
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}