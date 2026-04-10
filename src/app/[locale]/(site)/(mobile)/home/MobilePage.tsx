"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileHomePage() {
  const { locale, t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>{t("mobile.home.title")}</h1>
          <p className={styles.lede}>{t("mobile.home.lede")}</p>

          <div className={styles.ctaRow}>
            <form
              action={withLocale(locale, routes.tickets)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                {t("mobile.home.cta.tickets")}
              </Button>
            </form>
            <form
              action={withLocale(locale, routes.news)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                {t("mobile.home.cta.news")}
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("mobile.home.section.highlights")}</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.home.highlights.1.title")}</p>
              <p className={styles.cardBody}>{t("mobile.home.highlights.1.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.home.highlights.2.title")}</p>
              <p className={styles.cardBody}>{t("mobile.home.highlights.2.body")}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("mobile.home.section.benefits")}</h2>
          <ul className={styles.list}>
            <li>{t("mobile.home.benefits.1")}</li>
            <li>{t("mobile.home.benefits.2")}</li>
            <li>{t("mobile.home.benefits.3")}</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("mobile.home.section.help")}</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.home.help.1.title")}</p>
              <p className={styles.cardBody}>{t("mobile.home.help.1.body")}</p>
            </div>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
