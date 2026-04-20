import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";
import ResponsiveRoute from "./_routing/ResponsiveRoute";
import { MobileHomePage } from "./(mobile)/home/MobilePage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import { V1Hero } from "@/components/site/v1/V1Hero";
import { V1Section } from "@/components/site/v1/V1Section";
import { V1Card, V1Grid2 } from "@/components/site/v1/V1Cards";
import { ProofStrip } from "@/components/site/v1/home/ProofStrip";
import { Capabilities } from "@/components/site/v1/home/Capabilities";
import { FeaturedCases } from "@/components/site/v1/home/FeaturedCases";
import { PricingPreview } from "@/components/site/v1/home/PricingPreview";
import { InsightsPreview } from "@/components/site/v1/home/InsightsPreview";
import { FAQAccordion } from "@/components/site/v1/home/FAQAccordion";
import { ConversionCTA } from "@/components/site/v1/home/ConversionCTA";

export default async function Page(props: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  return (
    <ResponsiveRoute
      desktop={
        <V1DesktopShell>
          <V1Hero
            kicker={t("v1.kicker")}
            title={t("v1.home.heroA.title")}
            lede={t("v1.home.heroA.lede")}
            background={{ type: "video", src: "/assets/videos/hero.mp4" }}
            primaryCta={{
              label: t("v1.cta.book"),
              href: withLocale(locale, routes.book),
            }}
            secondaryCta={{
              label: t("v1.cta.caseStudies"),
              href: withLocale(locale, routes.caseStudies),
            }}
          />

          <ProofStrip t={t} />

          <V1Section title={t("v1.home.entrySection.title")}>
            <V1Grid2>
              <V1Card
                title={t("v1.home.entry.growth.title")}
                body={t("v1.home.entry.growth.body")}
                href={withLocale(locale, routes.solutions)}
                ctaLabel={t("v1.home.entry.growth.cta")}
              />
              <V1Card
                title={t("v1.home.entry.ai.title")}
                body={t("v1.home.entry.ai.body")}
                href={withLocale(locale, routes.services)}
                ctaLabel={t("v1.home.entry.ai.cta")}
              />
            </V1Grid2>
          </V1Section>

          <Capabilities locale={locale} t={t} />
          <FeaturedCases locale={locale} t={t} />
          <PricingPreview locale={locale} t={t} />
          <InsightsPreview locale={locale} t={t} />
          <FAQAccordion t={t} />
          <ConversionCTA locale={locale} t={t} />
        </V1DesktopShell>
      }
      mobile={<MobileHomePage />}
    />
  );
}
