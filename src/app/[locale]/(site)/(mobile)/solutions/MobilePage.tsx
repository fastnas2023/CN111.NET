"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import styles from "../_shared/V1MobilePage.module.scss";

export function MobileSolutionsPage() {
  const { locale, t } = useI18n();

  const entries = [
    { key: "s1", titleKey: "v1.solutions.s1.title", bodyKey: "v1.solutions.s1.body" },
    { key: "s2", titleKey: "v1.solutions.s2.title", bodyKey: "v1.solutions.s2.body" },
    { key: "s3", titleKey: "v1.solutions.s3.title", bodyKey: "v1.solutions.s3.body" },
    { key: "s4", titleKey: "v1.solutions.s4.title", bodyKey: "v1.solutions.s4.body" },
  ] as const;

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.kicker}>{t("v1.kicker")}</p>
          <h1 className={styles.h1}>{t("v1.solutions.title")}</h1>
          <p className={styles.lede}>{t("v1.solutions.lede")}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.solutionsPage.cardsTitle")}</h2>
          <div className={styles.cards}>
            {entries.map((entry) => (
              <div key={entry.key} className={styles.card}>
                <p className={styles.cardTitle}>{t(entry.titleKey)}</p>
                <p className={styles.cardBody}>{t(entry.bodyKey)}</p>
                <div className={styles.ctaRow}>
                  <form
                    action={withLocale(locale, `/solutions/${entry.key}`)}
                    method="get"
                    className={styles.ctaForm}
                  >
                    <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                      {t("v1.cta.learnMore")}
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
