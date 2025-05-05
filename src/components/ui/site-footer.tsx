"use client";

import { useTranslations } from "@/context/language-context";

export function SiteFooter() {
  const { t } = useTranslations();
  const year = new Date().getFullYear();
  
  return (
    <footer className="py-10 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold text-spektr-cyan-50">Austrian AI Agency</h2>
            <p className="text-muted-foreground">aaagency.at</p>
          </div>
          
          <div className="flex gap-8">
            <div>
              <h4 className="font-medium mb-2">{t("footer.contacts")}</h4>
              <p className="text-muted-foreground">contact@aaagency.at</p>
              <p className="text-muted-foreground">+43 123 456789</p>
            </div>
            
            <div>
              <h4 className="font-medium mb-2">{t("footer.address")}</h4>
              <p className="text-muted-foreground">{t("footer.vienna")}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-muted-foreground text-sm">
          © {year} Austrian AI Agency. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}