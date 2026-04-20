import Link from "next/link";

import type { SupportedLocale } from "@/i18n/locales";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";

import { V1Card, V1Grid } from "../V1Cards";
import { V1Section } from "../V1Section";
import styles from "./V1HomeSections.module.scss";

export type InsightsPreviewProps = {
  locale: SupportedLocale;
  t: (key: string) => string;
};

export function InsightsPreview({ locale, t }: InsightsPreviewProps) {
  const href = withLocale(locale, routes.resources);

  return (
    <V1Section title={t("v1.home.insights.title")}>
      <p className={styles.sectionLede}>{t("v1.home.insights.lede")}</p>
      <V1Grid>
        <V1Card title={t("v1.home.insights.1.title")} body={t("v1.home.insights.1.body")} href={href} ctaLabel={t("v1.cta.learnMore")} />
        <V1Card title={t("v1.home.insights.2.title")} body={t("v1.home.insights.2.body")} href={href} ctaLabel={t("v1.cta.learnMore")} />
        <V1Card title={t("v1.home.insights.3.title")} body={t("v1.home.insights.3.body")} href={href} ctaLabel={t("v1.cta.learnMore")} />
      </V1Grid>

      <div className={styles.sectionFooter}>
        <Link className={styles.textLink} href={href}>
          {t("v1.home.insights.more")}
        </Link>
      </div>
    </V1Section>
  );
}

