"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/i18n/client";
import styles from "./DesktopFooter.module.scss";

export function DesktopFooter() {
  const { locale } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <img src="/aivent/images/logo.webp" alt="Logo" />
          <p>The premier event for tech innovators.</p>
        </div>
        <div className={styles.links}>
          <Link href={`/${locale}/contact`}>Contact Us</Link>
          <Link href={`/${locale}/tickets-2`}>Get Tickets</Link>
        </div>
      </div>
      <div className={styles.bottom}>
        &copy; {year} CN111.NET. All Rights Reserved.
      </div>
    </footer>
  );
}