"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "banli-ui";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import styles from "./DesktopHeader.module.scss";

export function DesktopHeader() {
  const { locale } = useI18n();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <Link href={`/${locale}`} className={styles.logoLink}>
        <img src="/aivent/images/logo.webp" alt="Logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link href={`/${locale}`} className={styles.navLink}>Home</Link>
        <Link href={`/${locale}/tickets-2`} className={styles.navLink}>Tickets</Link>
        <Link href={`/${locale}/news`} className={styles.navLink}>News</Link>
        <Link href={`/${locale}/contact`} className={styles.navLink}>Contact</Link>
      </nav>

      <div className={styles.actions}>
        <LanguageSwitcher variant="desktop" />
        <Link href={`/${locale}/tickets-2`}>
          <Button variant="primary" size="sm">Buy Tickets</Button>
        </Link>
      </div>
    </header>
  );
}
