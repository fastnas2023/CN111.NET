import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";
import ResponsiveRoute from "./_routing/ResponsiveRoute";
import { MobileHomePage } from "./(mobile)/home/MobilePage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import { V1Hero } from "@/components/site/v1/V1Hero";
import { V1Section } from "@/components/site/v1/V1Section";
import { V1Card, V1Grid, V1Grid2 } from "@/components/site/v1/V1Cards";

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

          <V1Section title={t("v1.home.solutions.title")}>
            <V1Grid2>
              <V1Card
                title={t("v1.solutions.s1.title")}
                body={t("v1.solutions.s1.body")}
                href={withLocale(locale, routes.solutions)}
                ctaLabel={t("v1.cta.learnMore")}
              />
              <V1Card
                title={t("v1.solutions.s2.title")}
                body={t("v1.solutions.s2.body")}
                href={withLocale(locale, routes.solutions)}
                ctaLabel={t("v1.cta.learnMore")}
              />
              <V1Card
                title={t("v1.solutions.s3.title")}
                body={t("v1.solutions.s3.body")}
                href={withLocale(locale, routes.solutions)}
                ctaLabel={t("v1.cta.learnMore")}
              />
              <V1Card
                title={t("v1.solutions.s4.title")}
                body={t("v1.solutions.s4.body")}
                href={withLocale(locale, routes.solutions)}
                ctaLabel={t("v1.cta.learnMore")}
              />
            </V1Grid2>
          </V1Section>

          <V1Section title={t("v1.home.cases.title")}>
            <V1Grid>
              <V1Card title={t("v1.home.cases.1.title")} body={t("v1.home.cases.1.body")} />
              <V1Card title={t("v1.home.cases.2.title")} body={t("v1.home.cases.2.body")} />
              <V1Card title={t("v1.home.cases.3.title")} body={t("v1.home.cases.3.body")} />
            </V1Grid>
          </V1Section>

          <V1Section title={t("v1.home.process.title")}>
            <V1Grid2>
              <V1Card title={t("v1.home.process.1.title")} body={t("v1.home.process.1.body")} />
              <V1Card title={t("v1.home.process.2.title")} body={t("v1.home.process.2.body")} />
              <V1Card title={t("v1.home.process.3.title")} body={t("v1.home.process.3.body")} />
              <V1Card title={t("v1.home.process.4.title")} body={t("v1.home.process.4.body")} />
            </V1Grid2>
          </V1Section>

          <V1Section title={t("v1.home.finalCta.title")}>
            <V1Grid2>
              <V1Card
                title={t("v1.home.finalCta.box.title")}
                body={t("v1.home.finalCta.box.body")}
                href={withLocale(locale, routes.book)}
                ctaLabel={t("v1.cta.book")}
              />
              <V1Card
                title={t("v1.home.finalCta.box2.title")}
                body={t("v1.home.finalCta.box2.body")}
                href={withLocale(locale, routes.contact)}
                ctaLabel={t("v1.cta.contact")}
              />
            </V1Grid2>
          </V1Section>
        </V1DesktopShell>
      }
      mobile={<MobileHomePage />}
    />
  );
}
