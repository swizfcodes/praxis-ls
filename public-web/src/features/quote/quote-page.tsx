import { useTranslation } from "react-i18next";
import { usePublishedServices } from "@/lib/use-services";
import { PageShell } from "@/components/site/page-shell";
import { QuoteWizard } from "@/components/site/quote-wizard";
import { Band } from "@/components/ui/band";
import { BadgePill } from "@/components/ui/badge-pill";
import { BgMap } from "@/components/ui/bg-map";
import { Card } from "@/components/ui/card";
import { SectionHead } from "@/components/ui/section-head";
import { Reveal } from "@/components/ui/reveal";
import { useDocumentMeta } from "@/lib/use-document-meta";

/** The standalone quote route. The home page keeps the same wizard in its
 *  commercial band; this route gives the wizard the dedicated hero promised by
 *  the public-web UI plan. */
export function QuotePage() {
  const { t } = useTranslation();
  const { services } = usePublishedServices();

  useDocumentMeta({
    title: t("site.quote.title"),
    description: t("site.quote.sub"),
  });

  return (
    <PageShell label={t("site.quote.title")}>
      <Band surface="hero" className="relative overflow-hidden">
        <BgMap />
        <div className="relative z-10 flex flex-col items-center text-center">
          <BadgePill>{t("site.quote.title")}</BadgePill>
          <SectionHead
            title={t("site.quote.titleBeforeAccent")}
            accent={t("site.quote.titleAccent")}
            lead={t("site.quote.sub")}
            align="center"
            titleAs="h1"
            hero
            className="mt-3 text-[var(--hero-foreground)] [&>p:last-child]:text-[var(--hero-muted)]"
          />
        </div>
      </Band>

      <Band surface="plain">
        <Reveal className="mx-auto max-w-reading">
          <Card padded>
            <QuoteWizard services={services} />
          </Card>
        </Reveal>
      </Band>
    </PageShell>
  );
}
