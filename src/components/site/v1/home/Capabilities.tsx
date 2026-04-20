import type { SupportedLocale } from "@/i18n/locales";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";

import { V1Card, V1Grid2 } from "../V1Cards";
import { V1Section } from "../V1Section";
import styles from "./V1HomeSections.module.scss";

export type CapabilitiesProps = {
  locale: SupportedLocale;
  t: (key: string) => string;
};

export function Capabilities({ locale, t }: CapabilitiesProps) {
  return (
    <V1Section title={t("v1.home.capabilities.title")}>
      <p className={styles.sectionLede}>{t("v1.home.capabilities.lede")}</p>
      <V1Grid2>
        <V1Card
          title={t("v1.solutions.s1.title")}
          body={t("v1.solutions.s1.body")}
          href={withLocale(locale, routes.solutions)}
          ctaLabel={t("v1.cta.learnMore")}
        />
        <V1Card
          title={t("v1.solutions.s2.title")}
          body={t("v1.solutions.s2.body")}
          href={withLocale(locale, routes.solutions)}
          ctaLabel={t("v1.cta.learnMore")}
        />
        <V1Card
          title={t("v1.solutions.s3.title")}
          body={t("v1.solutions.s3.body")}
          href={withLocale(locale, routes.solutions)}
          ctaLabel={t("v1.cta.learnMore")}
        />
        <V1Card
          title={t("v1.solutions.s4.title")}
          body={t("v1.solutions.s4.body")}
          href={withLocale(locale, routes.solutions)}
          ctaLabel={t("v1.cta.learnMore")}
        />
      </V1Grid2>
    </V1Section>
  );
}

