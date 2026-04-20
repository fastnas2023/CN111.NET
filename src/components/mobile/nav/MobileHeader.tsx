"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { assets } from "@/lib/assets";
import { routes } from "@/lib/routes";
import { useI18n } from "@/i18n/client";
import { withLocale } from "@/i18n/paths";

import styles from "./MobileHeader.module.scss";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

export function MobileHeader() {
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);
  const { locale, t } = useI18n();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          className={styles.brand}
          href={withLocale(locale, routes.home)}
          aria-label={t("mobile.header.brandAria", { brand: t("brand.name") })}
        >
          <Image
            className={styles.brandLogo}
            src={assets.logo}
            alt={t("brand.name")}
            width={32}
            height={32}
            priority
          />
        </Link>

        <div className={styles.centerTitle}>{t("brand.name")}</div>

        <button
          type="button"
          className={styles.menuButton}
          aria-label={t("mobile.menu.open")}
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
      </div>

      <MobileMenuDrawer open={open} onClose={close} />
    </header>
  );
}
