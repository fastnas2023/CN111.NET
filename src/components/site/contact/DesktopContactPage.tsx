"use client";

import React from "react";
import { DesktopHeader } from "../Header/DesktopHeader";
import { DesktopFooter } from "../Footer/DesktopFooter";
import { ContactForm } from "./ContactForm";
import styles from "./DesktopContactPage.module.scss";

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
  return (
    <div className={styles.layout}>
      <DesktopHeader />
      
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Contact</h1>
            <p>Join thought leaders, developers, researchers, and founders as we explore how artificial intelligence is reshaping industries, creativity.</p>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.grid}>
            
            <div className={styles.infoCard}>
              <h2>We’re here to answer your questions.</h2>
              <p>Have a question, suggestion, or just want to say hi? We’re here and happy to hear from you!</p>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><LocationIcon /></div>
                <div className={styles.textContent}>
                  <h4>Event Location</h4>
                  <p>121 AI Blvd, San Francisco, BCA 94107</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><MailIcon /></div>
                <div className={styles.textContent}>
                  <h4>Send a Message</h4>
                  <p>contact@aivent-support.com</p>
                </div>
              </div>
              
              <div className={styles.contactItem}>
                <div className={styles.iconBox}><PhoneIcon /></div>
                <div className={styles.textContent}>
                  <h4>Call Us Directly</h4>
                  <p>+1 123 456 789</p>
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
