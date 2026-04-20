"use client";

import React from "react";
import Link from "next/link";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import { caseStudies } from "@/lib/caseStudies";
import styles from "../_shared/MobileLanding.module.scss";

export function MobileCaseStudiesPage() {
  const { locale, t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.hero}>
          <h1 className={styles.h1}>{t("v1.caseStudies.title")}</h1>
          <p className={styles.lede}>{t("v1.caseStudiesPage.lede")}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.h2}>{t("v1.caseStudiesPage.listTitle")}</h2>
          <div className={styles.cards}>
            {caseStudies.map((cs) => (
              <Link
                key={cs.slug}
                href={withLocale(locale, `${routes.caseStudies}/${cs.slug}`)}
                className={styles.card}
              >
                <p className={styles.cardTitle}>{t(cs.listTitleKey)}</p>
                <p className={styles.cardBody}>{t(cs.listBodyKey)}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </MobileAppShell>
  );
}
