import { Hero } from "@/components/ui/animated-hero";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ServicesSection } from "@/components/ui/services-section";
import { SiteFooter } from "@/components/ui/site-footer";

export default function Home() {
  return (
    <AuroraBackground className="min-h-screen">
      <Hero />
      <ServicesSection />
      <SiteFooter />
    </AuroraBackground>
  );
}