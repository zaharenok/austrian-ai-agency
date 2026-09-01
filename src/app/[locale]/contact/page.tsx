import type { Metadata } from 'next';
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContactClient } from "./contact-client";

export const dynamicParams = false;

const titles: Record<string, string> = {
  de: 'Kontakt — KI-Chat & Anfrage — Austrian AI Agency',
  en: 'Contact — AI Chat & Inquiry — Austrian AI Agency',
  ru: 'Контакт — ИИ-чат и запрос — Austrian AI Agency',
};

const descriptions: Record<string, string> = {
  de: 'Kontaktieren Sie uns: KI-Chat, E-Mail oder Kontaktformular. Schnelle Antworten zu EU AI Act Compliance und KI-Lösungen.',
  en: 'Contact us: AI chat, email, or contact form. Quick answers on EU AI Act compliance and AI solutions.',
  ru: 'Свяжитесь с нами: ИИ-чат, email или форма. Быстрые ответы по EU AI Act комплаенсу и ИИ-решениям.',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return {
    title: titles[locale] || titles.en,
    description: descriptions[locale] || descriptions.en,
    alternates: {
      canonical: `/${locale}/contact/`,
      languages: {
        'de': 'Kontakt — KI-Chat & Anfrage — Austrian AI Agency',
        'en': 'Contact — AI Chat & Inquiry — Austrian AI Agency',
        'ru': 'Контакт — ИИ-чат и запрос — Austrian AI Agency',
      },
    },
  };
}

export function generateStaticParams() {
  return [
    { locale: "en" },
    { locale: "de" },
    { locale: "ru" },
  ];
}

export default function ContactPage() {
  return (
    <AuroraBackground className="min-h-[85vh] py-4">
      <ContactClient />
    </AuroraBackground>
  );
}
