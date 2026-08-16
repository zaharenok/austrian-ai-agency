import { AbmeldenClient } from "./abmelden-client";
import { SiteFooter } from "@/components/ui/site-footer";

export default function AbmeldenPage() {
  return (
    <div className="flex min-h-full flex-col">
      <main className="flex-1">
        <AbmeldenClient />
      </main>
      <SiteFooter />
    </div>
  );
}