"use client";

import Script from 'next/script';
import { useTranslations } from '@/context/language-context';

export function VetCallJsonLd() {
  const { locale } = useTranslations();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "VetCall AI",
    "description": "24/7 AI-powered phone assistant for veterinary clinics in Austria",
    "provider": {
      "@type": "Organization",
      "name": "Austrian AI Agency",
      "url": "https://aaagency.at"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Austria"
    },
    "availableLanguage": ["de", "en", "ru"],
    "serviceType": "AI Phone Assistant",
    "offers": [
      {
        "@type": "Offer",
        "name": "Basic Plan",
        "price": "149",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "149",
          "priceCurrency": "EUR",
          "unitText": "MONTH"
        },
        "description": "200 minutes per month, 1 number, WhatsApp/SMS confirmation, calendar integration",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Pro Plan",
        "price": "349",
        "priceCurrency": "EUR",
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": "349",
          "priceCurrency": "EUR",
          "unitText": "MONTH"
        },
        "description": "600 minutes per month, 3 numbers, emergency routing, advanced reports, priority support",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Enterprise Plan",
        "price": "0",
        "priceCurrency": "EUR",
        "description": "Unlimited minutes, unlimited numbers, SSO & SLA, custom integrations, dedicated account manager",
        "availability": "https://schema.org/InStock"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "3"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "VetCall AI",
    "description": "AI-powered phone assistant service for veterinary clinics",
    "image": "https://aaagency.at/vetcall-og-image.jpg",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Vienna",
      "addressCountry": "AT"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "48.2082",
      "longitude": "16.3738"
    },
    "url": `https://aaagency.at/${locale}/vet`,
    "telephone": "+43XXXXXXXXX",
    "email": "contact@vetcall.ai",
    "priceRange": "€€",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do we need to change our phone number?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. We start with call forwarding. Your existing number stays the same."
        }
      },
      {
        "@type": "Question",
        "name": "Does VetCall AI really book appointments?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, via your Google/Outlook calendar. VetCall AI checks available times and books directly."
        }
      },
      {
        "@type": "Question",
        "name": "Is this GDPR-compliant?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. EU hosting, 60-90 day retention, data processing agreement (DPA)."
        }
      }
    ]
  };

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
