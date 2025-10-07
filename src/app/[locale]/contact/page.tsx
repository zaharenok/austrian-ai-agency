import { AuroraBackground } from "@/components/ui/aurora-background";
import { ContactClient } from "./contact-client";

export const dynamicParams = false;

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
