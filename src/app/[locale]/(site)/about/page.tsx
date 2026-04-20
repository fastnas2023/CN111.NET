import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../_routing/ResponsiveRoute";
import { MobileAboutPage } from "../(mobile)/about/MobilePage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import { V1Hero } from "@/components/site/v1/V1Hero";
import { V1Section } from "@/components/site/v1/V1Section";
import { V1Card, V1Grid2 } from "@/components/site/v1/V1Cards";

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
            title={t("v1.about.title")}
            lede={t("v1.aboutPage.lede")}
            background={{
              type: "image",
              src: "/aivent/images/background/7.webp",
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

          <V1Section title={t("v1.aboutPage.valuesTitle")}>
            <V1Grid2>
              <V1Card title={t("v1.about.values.1.title")} body={t("v1.about.values.1.body")} />
              <V1Card title={t("v1.about.values.2.title")} body={t("v1.about.values.2.body")} />
              <V1Card title={t("v1.about.values.3.title")} body={t("v1.about.values.3.body")} />
              <V1Card title={t("v1.about.values.4.title")} body={t("v1.about.values.4.body")} />
            </V1Grid2>
          </V1Section>
        </V1DesktopShell>
      }
      mobile={<MobileAboutPage />}
    />
  );
}
