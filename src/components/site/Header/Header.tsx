"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Icon } from "banli-ui";
import styles from "./Header.module.scss";
import { assets } from "@/lib/assets";
import { routes } from "@/lib/routes";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Why Attend", href: "/#why-attend" },
  { label: "Speakers", href: "/#speakers" },
  { label: "Schedule", href: "/#schedule" },
  { label: "Tickets", href: "/#tickets" },
  { label: "Venue", href: "/#venue" },
  { label: "FAQ", href: "/#faq" },
];

export function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link className={styles.brand} href={routes.home} aria-label="Aivent Home">
          <Image
            className={styles.brandLogo}
            src={assets.logo}
            alt="Aivent"
            width={34}
            height={34}
            priority
          />
          <span className={styles.brandText}>AIVENT</span>
        </Link>

        <nav className={styles.nav} aria-label="Single-page navigation">
          {NAV_ITEMS.map((item) => (
            <Link key={item.label} className={styles.navLink} href={item.href}>
              {item.label}
            </Link>
          ))}

          <Link className={styles.navLink} href={routes.tickets}>
            <span className={styles.pagesLabel}>Pages</span>
            <Icon name="chevron-down" size="sm" className={styles.pagesIcon} />
          </Link>
        </nav>

        <div className={styles.actions}>
          <div className={styles.ctaWrap}>
            <Button
              type="button"
              variant="primary"
              size="sm"
              className={styles.ctaButton}
              onClick={() => router.push(routes.tickets)}
            >
              BUY TICKETS
            </Button>
          </div>

          <button
            type="button"
            className={styles.menuButton}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span className={styles.menuIcon} aria-hidden="true" />
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className={styles.mobileOverlay} role="dialog" aria-modal="true">
          <button
            type="button"
            className={styles.mobileBackdrop}
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />

          <div className={styles.mobilePanel}>
            <div className={styles.mobileHeader}>
              <div className={styles.mobileTitle}>Menu</div>
              <button
                type="button"
                className={styles.mobileClose}
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              >
                <Icon name="close" size="md" />
              </button>
            </div>

            <div className={styles.mobileNav} aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.label}
                  className={styles.mobileNavLink}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className={styles.mobileNavLink}
                href={routes.tickets}
                onClick={() => setMobileOpen(false)}
              >
                Pages
              </Link>
            </div>

            <Button
              type="button"
              variant="primary"
              size="md"
              className={styles.mobileCta}
              onClick={() => {
                setMobileOpen(false);
                router.push(routes.tickets);
              }}
            >
              BUY TICKETS
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
