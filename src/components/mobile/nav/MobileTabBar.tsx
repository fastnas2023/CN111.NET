"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { routes } from "@/lib/routes";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";

import styles from "./MobileTabBar.module.scss";

type TabItem = { labelKey: string; href: string };

const TAB_ITEMS: TabItem[] = [
  { labelKey: "nav.home", href: routes.home },
  { labelKey: "nav.solutions", href: routes.solutions },
  { labelKey: "nav.services", href: routes.services },
  { labelKey: "nav.contact", href: routes.contact },
];

export function MobileTabBar() {
  const pathname = usePathname();
  const { locale, t } = useI18n();

  return (
    <nav className={styles.root} aria-label={t("mobile.tabBar.ariaLabel")}>
      <div className={styles.inner}>
        {TAB_ITEMS.map((item) => {
          const href = withLocale(locale, item.href);
          const isRoot = href === `/${locale}`;
          const active =
            pathname === href ||
            pathname === `${href}/` ||
            (!isRoot && pathname?.startsWith(href + "/"));

          return (
            <Link
              key={item.href}
              href={href}
              className={[styles.tab, active ? styles.tabActive : ""].join(" ")}
            >
              <span className={styles.label}>{t(item.labelKey)}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

