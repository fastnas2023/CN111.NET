"use client";

import React from "react";

import styles from "./MobileAppShell.module.scss";
import { MobileHeader } from "../nav/MobileHeader";
import { ViewportViewModeSync } from "../ViewportViewModeSync";

export type MobileAppShellProps = {
  children: React.ReactNode;
};

/**
 * Mobile-only "app shell": sticky header + page content area.
 * (Pages will typically wrap their content with this component.)
 */
export function MobileAppShell({ children }: MobileAppShellProps) {
  return (
    <div className={styles.root} data-mobile-shell="true">
      <ViewportViewModeSync />
      <MobileHeader />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
