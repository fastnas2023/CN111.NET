import type { ReactNode } from "react";

import { DesktopHeader } from "@/components/site/Header/DesktopHeader";
import { DesktopFooter } from "@/components/site/Footer/DesktopFooter";
import styles from "./V1DesktopShell.module.scss";

export function V1DesktopShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.layout}>
      <DesktopHeader />
      <main className={styles.main}>{children}</main>
      <DesktopFooter />
    </div>
  );
}

