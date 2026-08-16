import { ImpressumClient } from "./impressum-client";
import { SiteFooter } from "@/components/ui/site-footer";

export default function ImpressumPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">
        <ImpressumClient />
      </main>
      <SiteFooter />
    </div>
  );
}
