# Design Spec: Native React Migration for Desktop Contact Page

**Date**: 2026-04-12  
**Status**: Pending Review  
**Author**: Agent

## 1. Goal & Context

The project currently uses a "Hybrid Rendering" strategy for desktop where legacy Aivent jQuery/HTML templates are injected via `dangerouslySetInnerHTML`. This causes hydration mismatches, bloats the bundle with jQuery, and creates a fragmented developer experience. 

We will begin a "Strangler Fig" migration to native React components, starting with the **Contact Page** as our pilot. 

## 2. Approach

We will replace the string-injected `contact.html` template with a native React component (`DesktopContactPage`).
- We will **NOT** load the `DesktopTemplateShell` (which injects the legacy `AiventScriptsServer` and jQuery).
- We will use components from our internal `banli-ui` library to build a modern, cohesive desktop layout that aligns with the existing mobile design system, rather than strictly matching the pixel-for-pixel look of the legacy Aivent theme.

## 3. Architecture & Routing

### 3.1 Next.js Route (`src/app/[locale]/(site)/contact/page.tsx`)

Currently, this route reads `contact.html` and passes it to `DesktopTemplateShell`. 
We will change it to:

```tsx
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import { MobileContactPage } from "../(mobile)/contact/MobilePage";
import { DesktopContactPage } from "@/components/site/contact/DesktopContactPage";

export default async function Page() {
  return (
    <ResponsiveRoute
      desktop={<DesktopContactPage />}
      mobile={<MobileContactPage />}
    />
  );
}
```

### 3.2 The New Component (`src/components/site/contact/DesktopContactPage.tsx`)

This component will be a standalone desktop page. Because it no longer uses the legacy template shell, it must provide its own Header and Footer (or we must build a React version of the Desktop Header/Footer).

*Wait, this reveals a crucial architectural decision:* The legacy `index.html` and `contact.html` contain the **global Desktop Header (Nav) and Footer**. If we drop the legacy shell for the Contact page, we lose the global navigation for that page!

### 3.3 The Header/Footer Dependency

To make `DesktopContactPage` work without the legacy shell, we must also implement a **React-native Desktop Header and Footer** (using `banli-ui`). 

**Scope Expansion**: The pilot migration must include:
1. `DesktopHeader` (Native React)
2. `DesktopFooter` (Native React)
3. `DesktopContactPage` (Content area)

## 4. Components & Data Flow

1. **`DesktopHeader`**: 
   - Needs to render the logo, main navigation links (localized via `useI18n`), and the Language Switcher dropdown we just fixed.
   - Will be sticky/fixed at the top.
2. **`DesktopContactPage`**:
   - A Hero section (Title: Contact Us).
   - A grid layout: Left side (Contact Form), Right side (Address/Email info).
   - The form will submit to the existing mock API (`/api/contact`).
3. **`DesktopFooter`**:
   - Simple links and copyright text.

## 5. Visual Design (Using `banli-ui`)

Since we are moving away from the exact Aivent CSS, we will utilize:
- `banli-ui` Input, Textarea, Button for the form.
- Tailwind CSS / SCSS modules for layout (`grid-cols-1 md:grid-cols-2`).
- Dark scheme tokens (`var(--aivent-bg)`, `var(--aivent-text)`).

## 6. Migration Checklist

1. [ ] Create `DesktopHeader` and `DesktopFooter` components.
2. [ ] Create `DesktopContactPage` integrating the header, footer, and a new `ContactForm` component.
3. [ ] Update `src/app/[locale]/(site)/contact/page.tsx` to use the new native component.
4. [ ] Verify form submission (`/api/contact`) still works.
5. [ ] Verify i18n routing and language switching works natively on this page.
6. [ ] Ensure no jQuery/legacy scripts are loaded on `/contact` route.
