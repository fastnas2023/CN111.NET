"use client";

import React from "react";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";
import { useI18n } from "@/i18n/client";
import { V1ServicesPricing } from "@/components/site/v1/V1ServicesPricing";
import styles from "../_shared/V1MobilePage.module.scss";

export function MobileServicesPage() {
  const { t } = useI18n();

  return (
    <MobileAppShell>
      <div className={styles.page}>
        <header className={styles.heroVisual}>
          <div className={styles.heroOverlay} />
          <p className={styles.kicker}>{t("v1.kicker")}</p>
          <h1 className={styles.h1}>{t("v1.services.title")}</h1>
          <p className={styles.lede}>{t("v1.services.lede")}</p>
        </header>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{t("v1.servicesPage.packagesTitle")}</h2>
          <V1ServicesPricing anchorOffset={84} />
        </section>
      </div>
    </MobileAppShell>
  );
}
