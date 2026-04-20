"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import styles from "../../_shared/V1MobilePage.module.scss";

export function MobileSolutionDetailPage(props: {
  titleKey: string;
  ledeKey: string;
  solutionKey: "s1" | "s2" | "s3" | "s4";
}) {
  const { locale, t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <p className={styles.kicker}>{t("v1.kicker")}</p>
          <h1 className={styles.h1}>{t(props.titleKey)}</h1>
          <p className={styles.lede}>{t(props.ledeKey)}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.section.placeholderTitle")}</h2>
          <div className={styles.placeholder}>
            {t("v1.section.placeholderBody")}（{props.solutionKey}）
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.cta.learnMore")}</h2>
          <div className={styles.ctaRow}>
            <form action={withLocale(locale, routes.solutions)} method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                返回解决方案
              </Button>
            </form>
            <form action={withLocale(locale, routes.book)} method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                {t("v1.cta.book")}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}

