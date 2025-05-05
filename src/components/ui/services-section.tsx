"use client";

import { useTranslations } from "@/context/language-context";

export function ServicesSection() {
  const { t } = useTranslations();
  
  return (
    <div className="container mx-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="border rounded-lg p-6 shadow-sm backdrop-blur-sm bg-white/10">
          <h3 className="text-xl font-semibold mb-2">{t("services.strategy.title")}</h3>
          <p className="text-muted-foreground">
            {t("services.strategy.description")}
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm backdrop-blur-sm bg-white/10">
          <h3 className="text-xl font-semibold mb-2">{t("services.development.title")}</h3>
          <p className="text-muted-foreground">
            {t("services.development.description")}
          </p>
        </div>
        
        <div className="border rounded-lg p-6 shadow-sm backdrop-blur-sm bg-white/10">
          <h3 className="text-xl font-semibold mb-2">{t("services.training.title")}</h3>
          <p className="text-muted-foreground">
            {t("services.training.description")}
          </p>
        </div>
      </div>
    </div>
  );
}