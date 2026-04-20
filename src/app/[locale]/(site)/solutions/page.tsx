import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../_routing/ResponsiveRoute";
import { MobileSolutionsPage } from "../(mobile)/solutions/MobilePage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import { V1Hero } from "@/components/site/v1/V1Hero";
import { V1Section } from "@/components/site/v1/V1Section";
import { V1Card, V1Grid2 } from "@/components/site/v1/V1Cards";

const solutionDetailRoutes = {
  s1: "/solutions/s1",
  s2: "/solutions/s2",
  s3: "/solutions/s3",
  s4: "/solutions/s4",
} as const;

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
            title={t("v1.solutions.title")}
            lede={t("v1.solutionsPage.lede")}
            background={{
              type: "image",
              src: "/aivent/images/background/2.webp",
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

          <V1Section title={t("v1.solutionsPage.cardsTitle")}>
            <V1Grid2>
              <V1Card
                title={t("v1.solutions.s1.title")}
                body={t("v1.solutions.s1.body")}
                href={withLocale(locale, solutionDetailRoutes.s1)}
                ctaLabel={t("v1.cta.learnMore")}
              />
              <V1Card
                title={t("v1.solutions.s2.title")}
                body={t("v1.solutions.s2.body")}
                href={withLocale(locale, solutionDetailRoutes.s2)}
                ctaLabel={t("v1.cta.learnMore")}
              />
              <V1Card
                title={t("v1.solutions.s3.title")}
                body={t("v1.solutions.s3.body")}
                href={withLocale(locale, solutionDetailRoutes.s3)}
                ctaLabel={t("v1.cta.learnMore")}
              />
              <V1Card
                title={t("v1.solutions.s4.title")}
                body={t("v1.solutions.s4.body")}
                href={withLocale(locale, solutionDetailRoutes.s4)}
                ctaLabel={t("v1.cta.learnMore")}
              />
            </V1Grid2>
          </V1Section>
        </V1DesktopShell>
      }
      mobile={<MobileSolutionsPage />}
    />
  );
}
