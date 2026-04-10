"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileIndexCountdownPage() {
  const { locale, t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>{t("mobile.indexCountdown.title")}</h1>
          <p className={styles.lede}>{t("mobile.indexCountdown.lede")}</p>

          <div className={styles.ctaRow}>
            <form
              action={withLocale(locale, routes.tickets)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                {t("mobile.indexCountdown.cta.tickets")}
              </Button>
            </form>
            <form
              action={withLocale(locale, routes.contact)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                {t("mobile.indexCountdown.cta.support")}
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("mobile.indexCountdown.section.what")}</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.indexCountdown.what.1.title")}</p>
              <p className={styles.cardBody}>{t("mobile.indexCountdown.what.1.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("mobile.indexCountdown.what.2.title")}</p>
              <p className={styles.cardBody}>{t("mobile.indexCountdown.what.2.body")}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("mobile.indexCountdown.section.checklist")}</h2>
          <ul className={styles.list}>
            <li>{t("mobile.indexCountdown.checklist.1")}</li>
            <li>{t("mobile.indexCountdown.checklist.2")}</li>
            <li>{t("mobile.indexCountdown.checklist.3")}</li>
          </ul>
        </section>
      </div>
    </MobileAppShell>
  );
}
