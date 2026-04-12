"use client";

import React from "react";
import Link from "next/link";
import { Button } from "banli-ui";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import styles from "./DesktopHeader.module.scss";

export function DesktopHeader() {
  const { t, locale } = useI18n();

  return (
    <header className={styles.header}>
      <Link href={`/${locale}`} className={styles.logoLink}>
        <img src="/assets/images/logo.webp" alt="Logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link href={`/${locale}`} className={styles.navLink}>Home</Link>
        <Link href={`/${locale}/tickets-2`} className={styles.navLink}>Tickets</Link>
        <Link href={`/${locale}/news`} className={styles.navLink}>News</Link>
        <Link href={`/${locale}/contact`} className={styles.navLink}>Contact</Link>
      </nav>

      <div className={styles.actions}>
        <LanguageSwitcher variant="desktop" />
        <Button variant="primary" size="sm" asChild>
          <Link href={`/${locale}/tickets-2`}>Buy Tickets</Link>
        </Button>
      </div>
    </header>
  );
}