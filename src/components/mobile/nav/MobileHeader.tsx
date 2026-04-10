"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { assets } from "@/lib/assets";
import { routes } from "@/lib/routes";

import styles from "./MobileHeader.module.scss";
import { MobileMenuDrawer } from "./MobileMenuDrawer";

export function MobileHeader() {
  const [open, setOpen] = React.useState(false);
  const close = React.useCallback(() => setOpen(false), []);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href={routes.home} aria-label="Aivent Home">
          <Image
            className={styles.brandLogo}
            src={assets.logo}
            alt="Aivent"
            width={32}
            height={32}
            priority
          />
          <span className={styles.brandText}>AIVENT</span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-label="打开菜单"
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
