import React from "react";
import Link from "next/link";

import type { SupportedLocale } from "@/i18n/locales";
import { withLocale } from "@/i18n/paths";
import { routes } from "@/lib/routes";
import { V1Section } from "@/components/site/v1/V1Section";
import styles from "./solutions.module.scss";

export function ConversionCTA(props: {
  locale: SupportedLocale;
  title?: string;
  body?: string;
  primaryLabel: string;
  secondaryLabel: string;
}) {
  return (
    <V1Section>
      <div className={styles.ctaBox}>
        <h3 className={styles.ctaTitle}>{props.title ?? "准备开始了吗？"}</h3>
        <p className={styles.ctaBody}>
          {props.body ??
            "这是一段占位文案：描述你的下一步行动、期待产出，以及一个轻量的开始方式（例如 30 分钟电话/视频沟通）。"}
        </p>
        <div className={styles.ctaRow}>
          <Link className={styles.ctaPrimary} href={withLocale(props.locale, routes.book)}>
            {props.primaryLabel}
          </Link>
          <Link className={styles.ctaSecondary} href={withLocale(props.locale, routes.contact)}>
            {props.secondaryLabel}
          </Link>
        </div>
      </div>
    </V1Section>
  );
}

