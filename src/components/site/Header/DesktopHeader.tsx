"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "banli-ui";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";
import styles from "./DesktopHeader.module.scss";

export function DesktopHeader() {
  const { locale, t } = useI18n();
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
      <Link href={withLocale(locale, routes.home)} className={styles.logoLink}>
        <img src="/aivent/images/logo.webp" alt="Logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link href={withLocale(locale, routes.home)} className={styles.navLink}>
          {t("nav.home")}
        </Link>
        <Link
          href={withLocale(locale, routes.solutions)}
          className={styles.navLink}
        >
          {t("nav.solutions")}
        </Link>
        <Link
          href={withLocale(locale, routes.services)}
          className={styles.navLink}
        >
          {t("nav.services")}
        </Link>
        <Link
          href={withLocale(locale, routes.caseStudies)}
          className={styles.navLink}
        >
          {t("nav.caseStudies")}
        </Link>
        <Link
          href={withLocale(locale, routes.resources)}
          className={styles.navLink}
        >
          {t("nav.resources")}
        </Link>
        <Link href={withLocale(locale, routes.about)} className={styles.navLink}>
          {t("nav.about")}
        </Link>
        <Link
          href={withLocale(locale, routes.contact)}
          className={styles.navLink}
        >
          {t("nav.contact")}
        </Link>
      </nav>

      <div className={styles.actions}>
        <LanguageSwitcher variant="desktop" />
        <Link href={withLocale(locale, routes.book)}>
          <Button variant="primary" size="sm">
            {t("nav.cta.book")}
          </Button>
        </Link>
      </div>
    </header>
  );
}
