import Link from "next/link";

import type { SupportedLocale } from "@/i18n/locales";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";

import { V1Section } from "../V1Section";
import styles from "./V1HomeSections.module.scss";

export type PricingPreviewProps = {
  locale: SupportedLocale;
  t: (key: string) => string;
};

function PricingCard(props: {
  title: string;
  badge: string;
  body: string;
  bullets: string[];
}) {
  return (
    <div className={styles.pricingCard}>
      <div className={styles.pricingHeader}>
        <h3 className={styles.pricingTitle}>{props.title}</h3>
        <span className={styles.pricingBadge}>{props.badge}</span>
      </div>
      <p className={styles.pricingBody}>{props.body}</p>
      <ul className={styles.pricingList}>
        {props.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </div>
  );
}

export function PricingPreview({ locale, t }: PricingPreviewProps) {
  return (
    <V1Section title={t("v1.home.pricing.title")}>
      <p className={styles.sectionLede}>{t("v1.home.pricing.lede")}</p>

      <div className={styles.pricingGrid}>
        <PricingCard
          title={t("v1.home.pricing.p1.title")}
          badge={t("v1.home.pricing.p1.badge")}
          body={t("v1.home.pricing.p1.body")}
          bullets={[
            t("v1.home.pricing.p1.b1"),
            t("v1.home.pricing.p1.b2"),
            t("v1.home.pricing.p1.b3"),
          ]}
        />
        <PricingCard
          title={t("v1.home.pricing.p2.title")}
          badge={t("v1.home.pricing.p2.badge")}
          body={t("v1.home.pricing.p2.body")}
          bullets={[
            t("v1.home.pricing.p2.b1"),
            t("v1.home.pricing.p2.b2"),
            t("v1.home.pricing.p2.b3"),
          ]}
        />
        <PricingCard
          title={t("v1.home.pricing.p3.title")}
          badge={t("v1.home.pricing.p3.badge")}
          body={t("v1.home.pricing.p3.body")}
          bullets={[
            t("v1.home.pricing.p3.b1"),
            t("v1.home.pricing.p3.b2"),
            t("v1.home.pricing.p3.b3"),
          ]}
        />
      </div>

      <div className={styles.sectionFooter}>
        <Link className={styles.textLink} href={withLocale(locale, routes.book)}>
          {t("v1.cta.book")}
        </Link>
      </div>
    </V1Section>
  );
}
