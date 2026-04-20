import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../_routing/ResponsiveRoute";
import { MobileCaseStudiesPage } from "../(mobile)/case-studies/MobilePage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import { V1Hero } from "@/components/site/v1/V1Hero";
import { V1Section } from "@/components/site/v1/V1Section";
import { V1Card, V1Grid } from "@/components/site/v1/V1Cards";
import { caseStudies } from "@/lib/caseStudies";

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
            title={t("v1.caseStudies.title")}
            lede={t("v1.caseStudiesPage.lede")}
            background={{
              type: "image",
              src: "/aivent/images/background/5.webp",
              alt: "Background",
            }}
            primaryCta={{
              label: t("v1.cta.book"),
              href: withLocale(locale, routes.book),
            }}
            secondaryCta={{
              label: t("v1.cta.contact"),
              href: withLocale(locale, routes.contact),
            }}
          />

          <V1Section title={t("v1.caseStudiesPage.listTitle")}>
            <V1Grid>
              {caseStudies.map((cs) => (
                <V1Card
                  key={cs.slug}
                  title={t(cs.listTitleKey)}
                  body={t(cs.listBodyKey)}
                  href={withLocale(locale, `${routes.caseStudies}/${cs.slug}`)}
                  ctaLabel={t("v1.cta.caseStudies")}
                />
              ))}
            </V1Grid>
          </V1Section>
        </V1DesktopShell>
      }
      mobile={<MobileCaseStudiesPage />}
    />
  );
}
