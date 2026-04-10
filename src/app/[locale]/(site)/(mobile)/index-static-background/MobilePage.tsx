"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileIndexStaticBackgroundPage() {
  const { locale, t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>{t("mobile.indexStaticBg.title")}</h1>
          <p className={styles.lede}>{t("mobile.indexStaticBg.lede")}</p>

          <div className={styles.ctaRow}>
            <form
              action={withLocale(locale, routes.tickets)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                {t("mobile.indexStaticBg.cta.tickets")}
              </Button>
            </form>
            <form
              action={withLocale(locale, routes.news)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                {t("mobile.indexStaticBg.cta.news")}
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("mobile.indexStaticBg.section.core")}</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.indexStaticBg.core.1.title")}</p>
              <p className={styles.cardBody}>{t("mobile.indexStaticBg.core.1.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.indexStaticBg.core.2.title")}</p>
              <p className={styles.cardBody}>{t("mobile.indexStaticBg.core.2.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.indexStaticBg.core.3.title")}</p>
              <p className={styles.cardBody}>{t("mobile.indexStaticBg.core.3.body")}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("mobile.indexStaticBg.section.audience")}</h2>
          <ul className={styles.list}>
            <li>{t("mobile.indexStaticBg.audience.1")}</li>
            <li>{t("mobile.indexStaticBg.audience.2")}</li>
            <li>{t("mobile.indexStaticBg.audience.3")}</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
