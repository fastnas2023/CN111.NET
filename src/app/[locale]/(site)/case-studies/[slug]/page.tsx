import { notFound } from "next/navigation";

import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../../_routing/ResponsiveRoute";
import { MobileCaseStudyDetailPage } from "../../(mobile)/case-studies/_detail/MobileCaseStudyDetailPage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import { V1Hero } from "@/components/site/v1/V1Hero";
import { V1Section } from "@/components/site/v1/V1Section";
import { V1Card, V1Grid2 } from "@/components/site/v1/V1Cards";
import { getCaseStudyBySlug } from "@/lib/caseStudies";

export default async function Page(props: {
  params: Promise<{ locale: SupportedLocale; slug: string }>;
}) {
  const { locale, slug } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  const cs = getCaseStudyBySlug(slug);
  if (!cs) notFound();

  return (
    <ResponsiveRoute
      desktop={
        <V1DesktopShell>
          <V1Hero
            kicker={t("v1.kicker")}
            title={t(cs.listTitleKey)}
            lede={
              cs.isPlaceholder
                ? `${t(cs.listBodyKey)}（详情建设中）`
                : t(cs.listBodyKey)
            }
            background={{
              type: "image",
              src: cs.heroBackgroundImageSrc,
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

          <V1Section title="背景">
            <ul>
              {cs.detail.background.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </V1Section>

          <V1Section title="做了什么">
            <ul>
              {cs.detail.whatWeDid.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </V1Section>

          <V1Section title="结果">
            <ul>
              {cs.detail.results.map((line, idx) => (
                <li key={idx}>{line}</li>
              ))}
            </ul>
          </V1Section>

          <V1Section title="CTA">
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
      mobile={<MobileCaseStudyDetailPage caseStudy={cs} />}
    />
  );
}

