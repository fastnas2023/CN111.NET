"use client";

import React from "react";

import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../_shared/V1MobilePage.module.scss";

export function MobileBookPage() {
  const { locale, t } = useI18n();

  const whatYouGet = [
    { title: t("v1.book.whatYouGet.1.title"), body: t("v1.book.whatYouGet.1.body") },
    { title: t("v1.book.whatYouGet.2.title"), body: t("v1.book.whatYouGet.2.body") },
    { title: t("v1.book.whatYouGet.3.title"), body: t("v1.book.whatYouGet.3.body") },
    { title: t("v1.book.whatYouGet.4.title"), body: t("v1.book.whatYouGet.4.body") },
  ];

  const faqItems = [
    { q: t("v1.bookPage.faq.items.1.q"), a: t("v1.bookPage.faq.items.1.a") },
    { q: t("v1.bookPage.faq.items.2.q"), a: t("v1.bookPage.faq.items.2.a") },
    { q: t("v1.bookPage.faq.items.3.q"), a: t("v1.bookPage.faq.items.3.a") },
    { q: t("v1.bookPage.faq.items.4.q"), a: t("v1.bookPage.faq.items.4.a") },
  ];

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <div className={styles.heroVisual}>
            <div className={styles.heroOverlay} />
            <p className={styles.kicker}>{t("v1.kicker")}</p>
            <h1 className={styles.h1}>{t("v1.book.title")}</h1>
            <p className={styles.lede}>{t("v1.bookPage.lede")}</p>

            <div className={styles.heroCtas}>
              <form action={withLocale(locale, routes.contact)} method="get">
                <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                  {t("v1.bookPage.cta.primary")}
                </Button>
              </form>
              <form action={withLocale(locale, routes.caseStudies)} method="get">
                <Button type="submit" variant="ghost" size="md" className={styles.ctaButton}>
                  {t("v1.bookPage.cta.secondary")}
                </Button>
              </form>
            </div>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.bookPage.whatYouGetTitle")}</h2>
          <div className={styles.cards}>
            {whatYouGet.map((item) => (
              <div key={item.title} className={styles.card}>
                <p className={styles.cardTitle}>{item.title}</p>
                <p className={styles.cardBody}>{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.bookPage.faqTitle")}</h2>
          <div className={styles.cards}>
            {faqItems.map((item, idx) => (
              <details key={idx} className={styles.card}>
                <summary className={styles.cardTitle}>{item.q}</summary>
                <p className={styles.cardBody}>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.card}>
            <p className={styles.cardTitle}>{t("v1.bookPage.cta.title")}</p>
            <p className={styles.cardBody}>{t("v1.bookPage.cta.body")}</p>
            <div className={styles.ctaRow}>
              <form
                action={withLocale(locale, routes.contact)}
                method="get"
                className={styles.ctaForm}
              >
                <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                  {t("v1.bookPage.cta.primary")}
                </Button>
              </form>
              <form
                action={withLocale(locale, routes.caseStudies)}
                method="get"
                className={styles.ctaForm}
              >
                <Button type="submit" variant="ghost" size="md" className={styles.ctaButton}>
                  {t("v1.bookPage.cta.secondary")}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
