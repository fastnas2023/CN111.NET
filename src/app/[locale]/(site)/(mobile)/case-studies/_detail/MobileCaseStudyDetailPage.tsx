"use client";

import React from "react";
import { Button } from "banli-ui";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import type { CaseStudy } from "@/lib/caseStudies";
import styles from "../../_shared/MobileLanding.module.scss";

export function MobileCaseStudyDetailPage(props: { caseStudy: CaseStudy }) {
  const { locale, t } = useI18n();
  const cs = props.caseStudy;

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>{t(cs.listTitleKey)}</h1>
          <p className={styles.lede}>{t(cs.listBodyKey)}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>背景</h2>
          <ul className={styles.list}>
            {cs.detail.background.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>做了什么</h2>
          <ul className={styles.list}>
            {cs.detail.whatWeDid.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>结果</h2>
          <ul className={styles.list}>
            {cs.detail.results.map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.h2}>CTA</h2>
          <div className={styles.ctaRow}>
            <form action={withLocale(locale, routes.book)} method="get" className={styles.ctaForm}>
              <Button type="submit" variant="primary" size="md" className={styles.ctaButton}>
                {t("v1.cta.book")}
              </Button>
            </form>
            <form action={withLocale(locale, routes.contact)} method="get" className={styles.ctaForm}>
              <Button type="submit" variant="secondary" size="md" className={styles.ctaButton}>
                {t("v1.cta.contact")}
              </Button>
            </form>
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}

