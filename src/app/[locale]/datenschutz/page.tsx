import { DatenschutzClient } from "./datenschutz-client";
import { SiteFooter } from "@/components/ui/site-footer";

export default function DatenschutzPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">
        <DatenschutzClient />
      </main>
      <SiteFooter />
    </div>
  );
}
