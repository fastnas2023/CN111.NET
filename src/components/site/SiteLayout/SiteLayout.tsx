import React from "react";
import { Header } from "@/components/site/Header/Header";
import { Footer } from "@/components/site/Footer/Footer";
import styles from "./SiteLayout.module.scss";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

