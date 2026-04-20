import Link from "next/link";

import type { SupportedLocale } from "@/i18n/locales";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";

import { V1Section } from "../V1Section";
import styles from "./V1HomeSections.module.scss";

export type ConversionCTAProps = {
  locale: SupportedLocale;
  t: (key: string) => string;
};

export function ConversionCTA({ locale, t }: ConversionCTAProps) {
  return (
    <V1Section>
      <div className={styles.conversionCard}>
        <h2 className={styles.conversionTitle}>{t("v1.home.finalCta.title")}</h2>
        <p className={styles.conversionBody}>{t("v1.home.conversion.lede")}</p>
        <div className={styles.conversionCtas}>
          <Link className={styles.ctaPrimary} href={withLocale(locale, routes.book)}>
            {t("v1.cta.book")}
          </Link>
          <Link className={styles.ctaSecondary} href={withLocale(locale, routes.contact)}>
            {t("v1.cta.contact")}
          </Link>
        </div>
      </div>
    </V1Section>
  );
}

