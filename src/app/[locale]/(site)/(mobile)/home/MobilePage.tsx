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
        <header className={styles.hero}>
          <p className={styles.kicker}>{t("v1.kicker")}</p>
          <h1 className={styles.h1}>{t("v1.home.hero.title")}</h1>
          <p className={styles.lede}>{t("v1.home.hero.lede")}</p>
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
      </div>
    </MobileAppShell>
  );
}
