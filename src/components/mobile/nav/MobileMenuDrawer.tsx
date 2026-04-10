"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "banli-ui";

import { routes } from "@/lib/routes";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import { useI18n } from "@/i18n/client";

import styles from "./MobileMenuDrawer.module.scss";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: routes.home },
  { label: "Index Slider", href: routes.indexSlider },
  { label: "Index Static Background", href: routes.indexStaticBackground },
  { label: "Index Slider Text", href: routes.indexSliderText },
  { label: "Index Countdown", href: routes.indexCountdown },
  { label: "Tickets", href: routes.tickets },
  { label: "Tickets 2", href: routes.tickets2 },
  { label: "News", href: routes.news },
  { label: "News Single", href: routes.newsSingle },
  { label: "Contact", href: routes.contact },
];

function readCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m?.[1] ? decodeURIComponent(m[1]) : undefined;
}

export type MobileMenuDrawerProps = {
  open: boolean;
  onClose: () => void;
};

export function MobileMenuDrawer({ open, onClose }: MobileMenuDrawerProps) {
  const pathname = usePathname();
  const isDev = process.env.NODE_ENV === "development";
  const { t } = useI18n();
  const [currentViewMode, setCurrentViewMode] = React.useState<
    "auto" | "mobile" | "desktop"
  >("auto");

  React.useEffect(() => {
    if (!open) return;
    const v = readCookie("viewMode");
    if (v === "mobile" || v === "desktop" || v === "auto") setCurrentViewMode(v);
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  const setViewMode = React.useCallback(
    async (viewMode: "auto" | "mobile" | "desktop") => {
      await fetch("/api/view-mode", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ viewMode }),
      });
      window.location.reload();
    },
    [],
  );

  if (!open) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true">
      <button
        type="button"
        className={styles.backdrop}
        aria-label="关闭菜单"
        onClick={onClose}
      />

      <aside className={styles.panel} aria-label="Mobile menu">
        <div className={styles.panelHeader}>
          <div className={styles.title}>Menu</div>
          <button
            type="button"
            className={styles.closeButton}
            aria-label="关闭菜单"
            onClick={onClose}
          >
            <Icon name="close" size="md" />
          </button>
        </div>

        <nav className={styles.nav} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  styles.navLink,
                  active ? styles.navLinkActive : "",
                ].join(" ")}
                onClick={onClose}
              >
                <span>{item.label}</span>
                <Icon name="chevron-right" size="sm" />
              </Link>
            );
          })}
        </nav>

        <div className={styles.footer}>
          <div className={styles.devLabel}>{t("lang.label")}</div>
          <LanguageSwitcher variant="mobile" />

          {isDev ? (
            <>
              <div className={styles.devLabel} style={{ marginTop: 14 }}>
                View Mode (dev)
              </div>
              <div className={styles.viewModeGrid}>
                {(["auto", "mobile", "desktop"] as const).map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    className={[
                      styles.viewModeButton,
                      currentViewMode === mode ? styles.viewModeButtonActive : "",
                    ].join(" ")}
                    onClick={() => setViewMode(mode)}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
