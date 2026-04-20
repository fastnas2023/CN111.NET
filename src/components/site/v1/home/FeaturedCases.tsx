import Link from "next/link";

import type { SupportedLocale } from "@/i18n/locales";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";

import { V1Card, V1Grid } from "../V1Cards";
import { V1Section } from "../V1Section";
import styles from "./V1HomeSections.module.scss";

export type FeaturedCasesProps = {
  locale: SupportedLocale;
  t: (key: string) => string;
};

export function FeaturedCases({ locale, t }: FeaturedCasesProps) {
  const href = withLocale(locale, routes.caseStudies);
  return (
    <V1Section title={t("v1.home.cases.title")}>
      <V1Grid>
        <V1Card
          title={t("v1.home.cases.1.title")}
          body={t("v1.home.cases.1.body")}
          href={href}
          ctaLabel={t("v1.cta.caseStudies")}
        />
        <V1Card
          title={t("v1.home.cases.2.title")}
          body={t("v1.home.cases.2.body")}
          href={href}
          ctaLabel={t("v1.cta.caseStudies")}
        />
        <V1Card
          title={t("v1.home.cases.3.title")}
          body={t("v1.home.cases.3.body")}
          href={href}
          ctaLabel={t("v1.cta.caseStudies")}
        />
      </V1Grid>

      <div className={styles.sectionFooter}>
        <Link className={styles.textLink} href={href}>
          {t("v1.home.cases.more")}
        </Link>
      </div>
    </V1Section>
  );
}

