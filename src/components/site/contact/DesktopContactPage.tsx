"use client";

import React from "react";
import { DesktopHeader } from "../Header/DesktopHeader";
import { DesktopFooter } from "../Footer/DesktopFooter";
import { ContactForm } from "./ContactForm";
import styles from "./DesktopContactPage.module.scss";
import { useI18n } from "@/i18n/client";

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

export function DesktopContactPage() {
  const { t } = useI18n();

  return (
    <div className={styles.layout}>
      <DesktopHeader />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>{t("contact.hero.title")}</h1>
            <p>{t("contact.hero.lede")}</p>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.grid}>
            
            <div className={styles.infoCard}>
              <h2>{t("contact.intro.title")}</h2>
              <p>{t("contact.intro.body")}</p>

              <h3 className="text-white text-xl font-semibold mb-6">
                {t("contact.firstCall.title")}
              </h3>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><LocationIcon /></div>
                <div className={styles.textContent}>
                  <h4>{t("contact.firstCall.items.1.title")}</h4>
                  <p>{t("contact.firstCall.items.1.body")}</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><MailIcon /></div>
                <div className={styles.textContent}>
                  <h4>{t("contact.firstCall.items.2.title")}</h4>
                  <p>{t("contact.firstCall.items.2.body")}</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><PhoneIcon /></div>
                <div className={styles.textContent}>
                  <h4>{t("contact.firstCall.items.3.title")}</h4>
                  <p>{t("contact.firstCall.items.3.body")}</p>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              <ContactForm />
            </div>

          </div>
        </div>
      </main>

      <DesktopFooter />
    </div>
  );
}
