# Desktop Contact Page Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the desktop contact page from a legacy jQuery template to native React components using `banli-ui`, including building a native Desktop Header and Footer.

**Architecture:** We will create `DesktopHeader`, `DesktopFooter`, and `DesktopContactPage` components. We will update the `ResponsiveRoute` in `contact/page.tsx` to serve the new `DesktopContactPage` instead of the legacy `DesktopTemplateShell`. The form will submit to the existing `/api/contact` endpoint.

**Tech Stack:** Next.js App Router, React 19, SCSS Modules, `banli-ui` (internal), `next-intl` (via `useI18n`).

---

### Task 1: Create Desktop Header Component

**Files:**
- Create: `src/components/site/Header/DesktopHeader.tsx`
- Create: `src/components/site/Header/DesktopHeader.module.scss`

- [ ] **Step 1: Create SCSS Module**

Create `src/components/site/Header/DesktopHeader.module.scss` with styling for a sticky, dark-themed header that visually aligns with the brand.

```scss
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  background: rgba(17, 22, 43, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 40px;
}

.logo {
  height: 32px;
  width: auto;
}

.nav {
  display: flex;
  align-items: center;
  gap: 32px;
}

.navLink {
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: var(--primary-color, #ff4200);
  }
}

.actions {
  display: flex;
  align-items: center;
  gap: 16px;
}
```

- [ ] **Step 2: Create React Component**

Create `src/components/site/Header/DesktopHeader.tsx` using `useI18n` for localized links and integrating the existing `LanguageSwitcher`.

```tsx
"use client";

import React from "react";
import Link from "next/link";
import { Button } from "banli-ui";
import { useI18n } from "@/i18n/client";
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
import styles from "./DesktopHeader.module.scss";

export function DesktopHeader() {
  const { t, locale } = useI18n();

  return (
    <header className={styles.header}>
      <Link href={`/${locale}`} className={styles.logoLink}>
        <img src="/assets/images/logo.webp" alt="Logo" className={styles.logo} />
      </Link>

      <nav className={styles.nav}>
        <Link href={`/${locale}`} className={styles.navLink}>Home</Link>
        <Link href={`/${locale}/tickets-2`} className={styles.navLink}>Tickets</Link>
        <Link href={`/${locale}/news`} className={styles.navLink}>News</Link>
        <Link href={`/${locale}/contact`} className={styles.navLink}>Contact</Link>
      </nav>

      <div className={styles.actions}>
        <LanguageSwitcher variant="desktop" />
        <Button variant="primary" size="sm" asChild>
          <Link href={`/${locale}/tickets-2`}>Buy Tickets</Link>
        </Button>
      </div>
    </header>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/components/site/Header/
git commit -m "feat(ui): create native DesktopHeader component"
```

---

### Task 2: Create Desktop Footer Component

**Files:**
- Create: `src/components/site/Footer/DesktopFooter.tsx`
- Create: `src/components/site/Footer/DesktopFooter.module.scss`

- [ ] **Step 1: Create SCSS Module**

Create `src/components/site/Footer/DesktopFooter.module.scss`.

```scss
.footer {
  background: #11162b;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 60px 40px 30px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.brand {
  img {
    height: 32px;
    margin-bottom: 16px;
  }
}

.links {
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  
  a {
    color: inherit;
    transition: color 0.2s;
    &:hover { color: #fff; }
  }
}

.bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}
```

- [ ] **Step 2: Create React Component**

Create `src/components/site/Footer/DesktopFooter.tsx`.

```tsx
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
          <img src="/assets/images/logo.webp" alt="Logo" />
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/site/Footer/
git commit -m "feat(ui): create native DesktopFooter component"
```

---

### Task 3: Create Desktop Contact Page

**Files:**
- Create: `src/components/site/contact/DesktopContactPage.tsx`
- Create: `src/components/site/contact/DesktopContactPage.module.scss`

- [ ] **Step 1: Create SCSS Module**

Create `src/components/site/contact/DesktopContactPage.module.scss`.

```scss
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--aivent-bg, #0f1322);
}

.main {
  flex: 1;
  padding-top: 120px; // account for fixed header
  padding-bottom: 80px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.hero {
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 48px;
    font-weight: 700;
    color: #fff;
    margin-bottom: 16px;
  }
  
  p {
    font-size: 18px;
    color: rgba(255, 255, 255, 0.7);
  }
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.formCard {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 40px;
}

.infoCard {
  h3 {
    font-size: 24px;
    color: #fff;
    margin-bottom: 24px;
  }
  
  .item {
    margin-bottom: 24px;
    h4 {
      color: var(--primary-color, #ff4200);
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    p {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
    }
  }
}
```

- [ ] **Step 2: Create React Component**

Create `src/components/site/contact/DesktopContactPage.tsx` using `ContactForm` from existing code.

```tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add src/components/site/contact/
git commit -m "feat(contact): create native DesktopContactPage"
```

---

### Task 4: Swap out the routing shell

**Files:**
- Modify: `src/app/[locale]/(site)/contact/page.tsx`

- [ ] **Step 1: Modify routing in `page.tsx`**

Replace the legacy shell import with the new native component.

```tsx
import { DesktopContactPage } from "@/components/site/contact/DesktopContactPage";
import { MobileContactPage } from "../(mobile)/contact/MobilePage";
import ResponsiveRoute from "../_routing/ResponsiveRoute";

export default async function Page() {
  return (
    <ResponsiveRoute
      desktop={<DesktopContactPage />}
      mobile={<MobileContactPage />}
    />
  );
}
```

- [ ] **Step 2: Test the build**

Run `pnpm build` to ensure no typescript errors were introduced.

- [ ] **Step 3: Commit**

```bash
git add src/app/\[locale\]/\(site\)/contact/page.tsx
git commit -m "feat(contact): migrate desktop contact page to native React"
```
