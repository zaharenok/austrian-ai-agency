"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/ui/site-footer";
import { useTranslations } from "@/context/language-context";

const CONTENT: Record<string, { title: string; sections: { title: string; body: React.ReactNode }[] }> = {
  de: {
    title: "Datenschutzerklärung",
    sections: [
      {
        title: "1. Verantwortlicher",
        body: (
          <>
            <p><strong>GeloKS GesmbH</strong></p>
            <p>Witzelsbergergasse 26-28/402<br />1150 Wien<br />Österreich</p>
            <p>FN 371573g</p>
            <p>E-Mail: office@aaagency.at</p>
          </>
        ),
      },
      {
        title: "2. Allgemeine Hinweise",
        body: (
          <p>Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2021, österreichisches Datenschutzgesetz). In dieser Datenschutzerklärung informieren wir Sie über die wichtigsten Aspekte der Datenverarbeitung im Rahmen unserer Website.</p>
        ),
      },
      {
        title: "3. Hosting",
        body: (
          <p>Diese Website wird auf Servern in der Europäischen Union gehostet (GitHub Pages, USA — Datenübertragung auf Grundlage des EU-US Data Privacy Framework). Beim Aufruf der Website werden automatisch Informationen wie IP-Adresse, Browsertyp und Zugriffszeit in Server-Logfiles gespeichert. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der sicheren Bereitstellung der Website).</p>
        ),
      },
      {
        title: "4. Chatbot (Kontaktformular)",
        body: (
          <>
            <p>Wenn Sie unseren Chatbot auf der Kontaktseite nutzen, werden folgende Daten verarbeitet:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ihre Nachricht (Text)</li>
              <li>Zeitstempel der Nachricht</li>
              <li>Session-ID</li>
              <li>Spracheinstellung</li>
              <li>IP-Adresse (technisch bedingt)</li>
            </ul>
            <p className="mt-3">Die Verarbeitung erfolgt über unsere Workflow-Automatisierung (n8n, gehostet in der EU auf eigenen Servern) zur Beantwortung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen). Die Daten werden gelöscht, sobald sie für die Bearbeitung Ihrer Anfrage nicht mehr erforderlich sind.</p>
          </>
        ),
      },
      {
        title: "5. Cookies und Google Analytics",
        body: (
          <>
            <p>Unsere Website verwendet Google Analytics zur Analyse der Nutzung. Google Analytics verwendet Cookies und speichert Informationen über Ihre Nutzung der Website (einschließlich Ihrer IP-Adresse) an Google-Server, die in den USA liegen können. Google ist nach dem EU-US Data Privacy Framework zertifiziert.</p>
            <p className="mt-3"><strong>Einwilligung:</strong> Google Analytics wird nur geladen, wenn Sie über unseren Cookie-Banner aktiv zustimmen. Ohne Ihre Einwilligung werden keine Analytics-Daten erfasst. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) i.V.m. § 165 Abs. 3 TKG 2021.</p>
            <p className="mt-3">Ihre Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen, indem Sie die Cookies in Ihrem Browser löschen oder unsere Cookie-Einstellungen aufrufen.</p>
          </>
        ),
      },
      {
        title: "6. Kontaktaufnahme per E-Mail",
        body: (
          <p>Wenn Sie uns per E-Mail kontaktieren, verarbeiten wir Ihre E-Mail-Adresse und die in Ihrer Nachricht enthaltenen Daten zur Bearbeitung Ihrer Anfrage. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO. Die Daten werden gelöscht, sobald sie für die Bearbeitung nicht mehr erforderlich sind.</p>
        ),
      },
      {
        title: "7. Ihre Rechte",
        body: (
          <>
            <p>Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit, Widerruf und Widerspruch zu. Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht verstößt oder Ihre datenschutzrechtlichen Ansprüche sonst in einer Weise verletzt worden sind, können Sie sich bei der Aufsichtsbehörde beschweren:</p>
            <p className="mt-2"><strong>Österreichische Datenschutzbehörde</strong><br />Barichgasse 40-42, 1030 Wien<br />E-Mail: dsb@dsb.gv.at</p>
          </>
        ),
      },
      {
        title: "8. Kontakt",
        body: (
          <p>Bei Fragen zum Datenschutz kontaktieren Sie uns unter: office@aaagency.at</p>
        ),
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    sections: [
      {
        title: "1. Data Controller",
        body: (
          <>
            <p><strong>GeloKS GesmbH</strong></p>
            <p>Witzelsbergergasse 26-28/402<br />1150 Vienna<br />Austria</p>
            <p>FN 371573g</p>
            <p>E-mail: office@aaagency.at</p>
          </>
        ),
      },
      {
        title: "2. General Information",
        body: (
          <p>The protection of your personal data is very important to us. We process your data exclusively on the basis of the legal provisions (GDPR, Austrian Data Protection Act). This privacy policy informs you about the most important aspects of data processing on our website.</p>
        ),
      },
      {
        title: "3. Hosting",
        body: (
          <p>This website is hosted on servers in the European Union and the United States (GitHub Pages — data transfer based on the EU-US Data Privacy Framework). When you visit the website, information such as IP address, browser type and access time is automatically stored in server log files. Legal basis: Art. 6 (1) (f) GDPR (legitimate interest in the secure provision of the website).</p>
        ),
      },
      {
        title: "4. Chatbot (Contact Form)",
        body: (
          <>
            <p>When you use our chatbot on the contact page, the following data is processed:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your message (text)</li>
              <li>Message timestamp</li>
              <li>Session ID</li>
              <li>Language setting</li>
              <li>IP address (technical necessity)</li>
            </ul>
            <p className="mt-3">Processing is carried out via our workflow automation (n8n, hosted in the EU on our own servers) to answer your enquiry. Legal basis: Art. 6 (1) (b) GDPR (pre-contractual measures) or Art. 6 (1) (f) GDPR (legitimate interest in responding to enquiries). Data is deleted as soon as it is no longer required.</p>
          </>
        ),
      },
      {
        title: "5. Cookies and Google Analytics",
        body: (
          <>
            <p>Our website uses Google Analytics to analyze usage. Google Analytics uses cookies and stores information about your use of the website (including your IP address) on Google servers, which may be located in the USA. Google is certified under the EU-US Data Privacy Framework.</p>
            <p className="mt-3"><strong>Consent:</strong> Google Analytics is only loaded when you actively consent via our cookie banner. Without your consent, no analytics data is collected. Legal basis: Art. 6 (1) (a) GDPR (consent).</p>
            <p className="mt-3">You can withdraw your consent at any time with effect for the future by deleting the cookies in your browser or accessing our cookie settings.</p>
          </>
        ),
      },
      {
        title: "6. Contact by E-mail",
        body: (
          <p>If you contact us by e-mail, we process your e-mail address and the data contained in your message to handle your enquiry. Legal basis: Art. 6 (1) (b) GDPR. Data is deleted as soon as it is no longer required.</p>
        ),
      },
      {
        title: "7. Your Rights",
        body: (
          <>
            <p>You have the right to access, rectification, deletion, restriction, data portability, withdrawal and objection. If you believe that the processing of your data violates data protection law, you can lodge a complaint with the supervisory authority:</p>
            <p className="mt-2"><strong>Austrian Data Protection Authority (DSB)</strong><br />Barichgasse 40-42, 1030 Vienna<br />E-mail: dsb@dsb.gv.at</p>
          </>
        ),
      },
      {
        title: "8. Contact",
        body: (
          <p>For data protection questions, contact us at: office@aaagency.at</p>
        ),
      },
    ],
  },
  ru: {
    title: "Политика конфиденциальности",
    sections: [
      {
        title: "1. Ответственный за обработку данных",
        body: (
          <>
            <p><strong>GeloKS GesmbH</strong></p>
            <p>Witzelsbergergasse 26-28/402<br />1150 Вена<br />Австрия</p>
            <p>FN 371573g</p>
            <p>E-mail: office@aaagency.at</p>
          </>
        ),
      },
      {
        title: "2. Общие сведения",
        body: (
          <p>Защита ваших персональных данных очень важна для нас. Мы обрабатываем ваши данные исключительно на основании законодательных положений (GDPR, австрийский закон о защите данных). Эта политика конфиденциальности информирует вас о важнейших аспектах обработки данных на нашем сайте.</p>
        ),
      },
      {
        title: "3. Хостинг",
        body: (
          <p>Этот сайт размещён на серверах в Европейском Союзе и США (GitHub Pages — передача данных на основании EU-US Data Privacy Framework). При посещении сайта автоматически сохраняются IP-адрес, тип браузера и время доступа в серверных лог-файлах. Правовое основание: ст. 6 (1) (f) GDPR (законный интерес в безопасном предоставлении сайта).</p>
        ),
      },
      {
        title: "4. Чат-бот (контактная форма)",
        body: (
          <>
            <p>При использовании нашего чат-бота на странице контактов обрабатываются следующие данные:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Ваше сообщение (текст)</li>
              <li>Время отправки</li>
              <li>ID сессии</li>
              <li>Языковая настройка</li>
              <li>IP-адрес (техническая необходимость)</li>
            </ul>
            <p className="mt-3">Обработка осуществляется через нашу автоматизацию (n8n, размещённую в ЕС на собственных серверах) для ответа на ваш запрос. Правовое основание: ст. 6 (1) (b) GDPR (преддоговорные меры) или ст. 6 (1) (f) GDPR (законный интерес в ответе на запросы). Данные удаляются, когда они больше не требуются.</p>
          </>
        ),
      },
      {
        title: "5. Cookies и Google Analytics",
        body: (
          <>
            <p>Наш сайт использует Google Analytics для анализа использования. Google Analytics использует cookie-файлы и хранит информацию о вашем использовании сайта (включая IP-адрес) на серверах Google, которые могут находиться в США. Google сертифицирован по EU-US Data Privacy Framework.</p>
            <p className="mt-3"><strong>Согласие:</strong> Google Analytics загружается только при вашем активном согласии через баннер cookie. Без согласия данные аналитики не собираются. Правовое основание: ст. 6 (1) (a) GDPR (согласие).</p>
            <p className="mt-3">Вы можете отозвать согласие в любое время, удалив cookie в браузере или изменив настройки cookie.</p>
          </>
        ),
      },
      {
        title: "6. Связь по электронной почте",
        body: (
          <p>Если вы связываетесь с нами по электронной почте, мы обрабатываем ваш адрес и данные, содержащиеся в сообщении, для обработки вашего запроса. Правовое основание: ст. 6 (1) (b) GDPR. Данные удаляются после завершения обработки.</p>
        ),
      },
      {
        title: "7. Ваши права",
        body: (
          <>
            <p>Вы имеете право на доступ, исправление, удаление, ограничение, переносимость, отзыв и возражение. Если вы считаете, что обработка ваших данных нарушает законодательство, вы можете подать жалобу в надзорный орган:</p>
            <p className="mt-2"><strong>Австрийский орган по защите данных (DSB)</strong><br />Barichgasse 40-42, 1030 Вена<br />E-mail: dsb@dsb.gv.at</p>
          </>
        ),
      },
      {
        title: "8. Контакты",
        body: (
          <p>По вопросам защиты данных обращайтесь: office@aaagency.at</p>
        ),
      },
    ],
  },
};

export function DatenschutzClient() {
  const { t, locale } = useTranslations();
  const lang = locale === "de" ? "de" : locale === "ru" ? "ru" : "en";
  const { title, sections } = CONTENT[lang];

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
        <h1 className="mb-8 text-3xl font-bold text-foreground">{title}</h1>
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
