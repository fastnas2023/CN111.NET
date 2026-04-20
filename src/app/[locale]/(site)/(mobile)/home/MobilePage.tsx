"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../_shared/V1MobilePage.module.scss";

export function MobileHomePage() {
  const { locale, t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.heroVisual}>
          <div className={styles.heroOverlay} />
          <p className={styles.kicker}>{t("v1.kicker")}</p>
          <h1 className={styles.h1}>{t("v1.home.heroA.title")}</h1>
          <p className={styles.lede}>{t("v1.home.heroA.lede")}</p>
          <div className={styles.heroCtas}>
            <form
              action={withLocale(locale, routes.book)}
              method="get"
              className={styles.ctaForm}
            >
              <Button
                type="submit"
                variant="primary"
                size="md"
                className={styles.ctaButton}
              >
                {t("v1.cta.book")}
              </Button>
            </form>
            <form
              action={withLocale(locale, routes.caseStudies)}
              method="get"
              className={styles.ctaForm}
            >
              <Button
                type="submit"
                variant="secondary"
                size="md"
                className={styles.ctaButton}
              >
                {t("v1.cta.caseStudies")}
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.home.entrySection.title")}</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.home.entry.growth.title")}</p>
              <p className={styles.cardBody}>{t("v1.home.entry.growth.body")}</p>
              <div className={styles.ctaRow}>
                <form
                  action={withLocale(locale, routes.solutions)}
                  method="get"
                  className={styles.ctaForm}
                >
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className={styles.ctaButton}
                  >
                    {t("v1.home.entry.growth.cta")}
                  </Button>
                </form>
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.home.entry.ai.title")}</p>
              <p className={styles.cardBody}>{t("v1.home.entry.ai.body")}</p>
              <div className={styles.ctaRow}>
                <form
                  action={withLocale(locale, routes.services)}
                  method="get"
                  className={styles.ctaForm}
                >
                  <Button
                    type="submit"
                    variant="secondary"
                    size="md"
                    className={styles.ctaButton}
                  >
                    {t("v1.home.entry.ai.cta")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.home.solutions.title")}</h2>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.solutions.s1.title")}</p>
              <p className={styles.cardBody}>{t("v1.solutions.s1.body")}</p>
              <div className={styles.ctaRow}>
                <form
                  action={withLocale(locale, routes.solutions)}
                  method="get"
                  className={styles.ctaForm}
                >
                  <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                    {t("v1.cta.learnMore")}
                  </Button>
                </form>
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.solutions.s2.title")}</p>
              <p className={styles.cardBody}>{t("v1.solutions.s2.body")}</p>
              <div className={styles.ctaRow}>
                <form
                  action={withLocale(locale, routes.solutions)}
                  method="get"
                  className={styles.ctaForm}
                >
                  <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                    {t("v1.cta.learnMore")}
                  </Button>
                </form>
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.solutions.s3.title")}</p>
              <p className={styles.cardBody}>{t("v1.solutions.s3.body")}</p>
              <div className={styles.ctaRow}>
                <form
                  action={withLocale(locale, routes.solutions)}
                  method="get"
                  className={styles.ctaForm}
                >
                  <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                    {t("v1.cta.learnMore")}
                  </Button>
                </form>
              </div>
            </div>

            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.solutions.s4.title")}</p>
              <p className={styles.cardBody}>{t("v1.solutions.s4.body")}</p>
              <div className={styles.ctaRow}>
                <form
                  action={withLocale(locale, routes.solutions)}
                  method="get"
                  className={styles.ctaForm}
                >
                  <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                    {t("v1.cta.learnMore")}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.home.cases.title")}</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.home.cases.1.title")}</p>
              <p className={styles.cardBody}>{t("v1.home.cases.1.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.home.cases.2.title")}</p>
              <p className={styles.cardBody}>{t("v1.home.cases.2.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("v1.home.cases.3.title")}</p>
              <p className={styles.cardBody}>{t("v1.home.cases.3.body")}</p>
            </div>
          </div>
          <div className={styles.ctaRow}>
            <form
              action={withLocale(locale, routes.caseStudies)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                {t("v1.cta.caseStudies")}
              </Button>
            </form>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.ctaBanner}>
            <p className={styles.ctaBannerTitle}>{t("v1.home.finalCta.title")}</p>
            <p className={styles.ctaBannerBody}>{t("v1.home.conversion.lede")}</p>
            <div className={styles.heroCtas}>
              <form
                action={withLocale(locale, routes.book)}
                method="get"
                className={styles.ctaForm}
              >
                <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                  {t("v1.cta.book")}
                </Button>
              </form>
              <form
                action={withLocale(locale, routes.contact)}
                method="get"
                className={styles.ctaForm}
              >
                <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                  {t("v1.cta.contact")}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
