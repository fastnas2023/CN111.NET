"use client";

import React from "react";
import { DesktopHeader } from "../Header/DesktopHeader";
import { DesktopFooter } from "../Footer/DesktopFooter";
import { ContactForm } from "./ContactForm";
import styles from "./DesktopContactPage.module.scss";

export function DesktopContactPage() {
  return (
    <div className={styles.layout}>
      <DesktopHeader />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.hero}>
            <h1>Contact Us</h1>
            <p>Have questions? We'd love to hear from you.</p>
          </div>
          
          <div className={styles.grid}>
            <div className={styles.formCard}>
              <ContactForm />
            </div>
            
            <div className={styles.infoCard}>
              <h3>Get In Touch</h3>
              
              <div className={styles.item}>
                <h4>Address</h4>
                <p>100 Mainstreet Center, Sydney</p>
              </div>
              
              <div className={styles.item}>
                <h4>Email</h4>
                <p>contact@aivent.com</p>
              </div>
              
              <div className={styles.item}>
                <h4>Phone</h4>
                <p>+1 333 9296</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DesktopFooter />
    </div>
  );
}
