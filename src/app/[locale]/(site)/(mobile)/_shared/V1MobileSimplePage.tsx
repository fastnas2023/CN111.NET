"use client";

import React from "react";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import styles from "./V1MobilePage.module.scss";

export function V1MobileSimplePage(props: { titleKey: string; ledeKey: string }) {
  const { t } = useI18n();

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
          <div className={styles.placeholder}>{t("v1.section.placeholderBody")}</div>
        </section>
      </div>
    </MobileAppShell>
  );
}

