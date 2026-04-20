import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import Link from "next/link";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import { MobileBookPage } from "../(mobile)/book/MobilePage";
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

  const faqItems = [
    { q: t("v1.bookPage.faq.items.1.q"), a: t("v1.bookPage.faq.items.1.a") },
    { q: t("v1.bookPage.faq.items.2.q"), a: t("v1.bookPage.faq.items.2.a") },
    { q: t("v1.bookPage.faq.items.3.q"), a: t("v1.bookPage.faq.items.3.a") },
    { q: t("v1.bookPage.faq.items.4.q"), a: t("v1.bookPage.faq.items.4.a") },
  ];

  return (
    <ResponsiveRoute
      desktop={
        <V1DesktopShell>
          <V1Hero
            kicker={t("v1.kicker")}
            title={t("v1.book.title")}
            lede={t("v1.bookPage.lede")}
            background={{
              type: "image",
              src: "/aivent/images/background/3.webp",
              alt: "Background",
            }}
            primaryCta={{
              label: t("v1.cta.contact"),
              href: withLocale(locale, routes.contact),
            }}
            secondaryCta={{
              label: t("v1.cta.caseStudies"),
              href: withLocale(locale, routes.caseStudies),
            }}
          />

          <V1Section title={t("v1.bookPage.whatYouGetTitle")}>
            <V1Grid2>
              <V1Card title={t("v1.book.whatYouGet.1.title")} body={t("v1.book.whatYouGet.1.body")} />
              <V1Card title={t("v1.book.whatYouGet.2.title")} body={t("v1.book.whatYouGet.2.body")} />
              <V1Card title={t("v1.book.whatYouGet.3.title")} body={t("v1.book.whatYouGet.3.body")} />
              <V1Card title={t("v1.book.whatYouGet.4.title")} body={t("v1.book.whatYouGet.4.body")} />
            </V1Grid2>
          </V1Section>

          <V1Section title={t("v1.bookPage.faqTitle")}>
            <div className="flex flex-col gap-3">
              {faqItems.map((item, idx) => (
                <details
                  key={idx}
                  className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <span className="text-[15px] font-semibold text-white/90 leading-snug">
                      {item.q}
                    </span>
                    <span aria-hidden="true" className="text-white/50 text-lg leading-none">
                      +
                    </span>
                  </summary>
                  <div className="mt-3 text-white/70 leading-relaxed">{item.a}</div>
                </details>
              ))}
            </div>
          </V1Section>

          <V1Section>
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/25 via-white/5 to-cyan-400/15 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  {t("v1.bookPage.cta.title")}
                </h3>
                <p className="mt-2 text-white/70 max-w-[60ch]">
                  {t("v1.bookPage.cta.body")}
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <Link
                  href={withLocale(locale, routes.contact)}
                  className="inline-flex items-center justify-center rounded-full bg-violet-500 px-6 py-3 font-semibold text-white hover:bg-violet-400 transition"
                >
                  {t("v1.bookPage.cta.primary")}
                </Link>
                <Link
                  href={withLocale(locale, routes.caseStudies)}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 font-semibold text-white/90 hover:bg-white/10 transition"
                >
                  {t("v1.bookPage.cta.secondary")}
                </Link>
              </div>
            </div>
          </V1Section>
        </V1DesktopShell>
      }
      mobile={<MobileBookPage />}
    />
  );
}
