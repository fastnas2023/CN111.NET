"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { ContactForm } from "@/components/site/contact/ContactForm";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileContactPage() {
  const { locale, t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>{t("contact.hero.title")}</h1>
          <p className={styles.lede}>{t("contact.hero.lede")}</p>

          <div className={styles.ctaRow}>
            <form
              action={withLocale(locale, routes.book)}
              method="get"
              className={styles.ctaForm}
            >
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                {t("contact.cta.book")}
              </Button>
            </form>
          </div>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("contact.firstCall.title")}</h2>
          <div className={styles.cards}>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("contact.firstCall.items.1.title")}</p>
              <p className={styles.cardBody}>{t("contact.firstCall.items.1.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("contact.firstCall.items.2.title")}</p>
              <p className={styles.cardBody}>{t("contact.firstCall.items.2.body")}</p>
            </div>
            <div className={styles.card}>
              <p className={styles.cardTitle}>{t("contact.firstCall.items.3.title")}</p>
              <p className={styles.cardBody}>{t("contact.firstCall.items.3.body")}</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.card}>
            <ContactForm />
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
