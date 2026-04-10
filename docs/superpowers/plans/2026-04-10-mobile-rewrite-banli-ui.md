# Mobile Rewrite (<= 992px) with banli-ui — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** For all existing routes, render a fully React/banli-ui “app-like” mobile experience when viewport <= 992px, while preserving the current pixel-perfect legacy template HTML for desktop.

**Architecture:** For each route, implement a “route shell” that decides Desktop vs Mobile rendering. Desktop continues to use the existing `getAiventTemplateBodyHtml()` output + template CSS/JS injection. Mobile uses new React components (banli-ui + custom CSS modules) and does **not** load template JS to avoid side effects.

**Tech Stack:** Next.js App Router (React 19), TypeScript, banli-ui, SCSS modules, Playwright (for smoke/e2e), optional next/image.

---

## Current Codebase Map (relevant parts)

**Legacy desktop rendering**
- `src/lib/aiventTemplate.ts` — `getAiventTemplateBodyHtml()` returns template DOM (rewrites assets/links/logo)
- `src/app/(site)/*/page.tsx` — currently returns `<div dangerouslySetInnerHTML ...>` with the legacy HTML
- `src/app/layout.tsx` — injects `<AiventHeadAssets />` into `<head>` (Aivent CSS + small overrides)
- `src/app/(site)/layout.tsx` — injects `<AiventScriptsServer />` into body (legacy template JS)

**Routes (must be supported)**
- `/`
- `/index-slider`
- `/index-static-background`
- `/index-slider-text`
- `/index-countdown`
- `/tickets`
- `/tickets-2`
- `/news`
- `/news-single`
- `/contact`

---

## Decision & Constraints

1. **Mobile breakpoint**: use `<= 992px` (as confirmed).
2. **No double-DOM**: never render legacy template DOM hidden behind CSS; choose either Desktop or Mobile at render time.
3. **Mobile should be “app-like”**: larger touch targets, simplified hero, single-column layout, reduced motion where appropriate.
4. **Keep existing desktop pixel-perfect and its template JS**.

---

## New Files / Modules (planned)

### Mobile device detection
- Create: `src/lib/device.ts`
  - `isMobileRequest(headers, cookies)`: server-side heuristic (UA) + override cookie
  - `MOBILE_BREAKPOINT = 992`
- Create: `src/components/mobile/MobileOnly.client.tsx`
  - client helper for viewport checks + optional “switch to desktop/mobile” action

### Shared route shells
- Create: `src/app/(site)/_routing/ResponsiveRoute.tsx`
  - Server component that receives:
    - `desktop: ReactNode`
    - `mobile: ReactNode`
    - `routeKey: string` (for cookie override)
  - Picks which node to render based on request UA + cookie override; optionally injects a tiny marker for debugging.

### Mobile layout + components
- Create: `src/components/mobile/layout/MobileAppShell.tsx`
- Create: `src/components/mobile/nav/MobileHeader.tsx`
- Create: `src/components/mobile/nav/MobileMenuDrawer.tsx`
- Create: `src/components/mobile/hero/MobileHero.tsx`
- Create: `src/components/mobile/sections/*` (per-section components)

### Mobile pages (one per route)
- Create: `src/app/(site)/(mobile)/home/MobileHomePage.tsx`
- Create: `src/app/(site)/(mobile)/index-slider/MobileIndexSliderPage.tsx`
- Create: `src/app/(site)/(mobile)/index-static-background/MobileIndexStaticBackgroundPage.tsx`
- Create: `src/app/(site)/(mobile)/index-slider-text/MobileIndexSliderTextPage.tsx`
- Create: `src/app/(site)/(mobile)/index-countdown/MobileIndexCountdownPage.tsx`
- Create: `src/app/(site)/(mobile)/tickets/MobileTicketsPage.tsx`
- Create: `src/app/(site)/(mobile)/tickets-2/MobileTickets2Page.tsx`
- Create: `src/app/(site)/(mobile)/news/MobileNewsPage.tsx`
- Create: `src/app/(site)/(mobile)/news-single/MobileNewsSinglePage.tsx`
- Create: `src/app/(site)/(mobile)/contact/MobileContactPage.tsx`

### Styling
- Create: `src/styles/mobile/tokens.scss`
- Create: `src/styles/mobile/mobile.scss` (or per-component SCSS modules)

### Tests
- Modify/Create: `tests/e2e/mobile-rendering.spec.ts`
- Modify: `scripts/smoke_test.mjs` (optional: add mobile user-agent run)

---

## Task 1: Add mobile detection + override cookie

**Files:**
- Create: `src/lib/device.ts`
- Create: `src/app/api/view-mode/route.ts`

- [ ] **Step 1: Write failing test for detection helper**

Create `src/lib/device.test.ts` (use whatever unit test framework exists; if none, skip unit tests and cover via Playwright in Task 6).

If no unit-test infra exists, instead create Playwright test in Task 6; mark this step as skipped.

- [ ] **Step 2: Implement `isMobileRequest`**

```ts
// src/lib/device.ts
export const MOBILE_BREAKPOINT = 992;

export type ViewMode = "auto" | "mobile" | "desktop";

export function parseViewModeCookie(cookieValue?: string): ViewMode {
  if (cookieValue === "mobile" || cookieValue === "desktop") return cookieValue;
  return "auto";
}

export function isMobileUserAgent(ua: string): boolean {
  const u = ua.toLowerCase();
  return /iphone|android|mobile|ipad|tablet/.test(u);
}
```

- [ ] **Step 3: Add API route to set cookie override**

```ts
// src/app/api/view-mode/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { mode } = await req.json(); // "mobile" | "desktop" | "auto"
  const res = NextResponse.json({ ok: true });
  res.cookies.set("viewMode", mode, { path: "/", sameSite: "lax" });
  return res;
}
```

- [ ] **Step 4: Manual test**

Run:
```bash
pnpm dev
```
Then in browser console:
```js
fetch("/api/view-mode", {method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify({mode:"mobile"})})
```
Refresh and confirm mobile layout is forced (once implemented).

- [ ] **Step 5: Commit**

```bash
git add src/lib/device.ts src/app/api/view-mode/route.ts
git commit -m "feat(mobile): add view-mode cookie override"
```

---

## Task 2: Build `ResponsiveRoute` server component

**Files:**
- Create: `src/app/(site)/_routing/ResponsiveRoute.tsx`

- [ ] **Step 1: Implement route chooser**

```tsx
import { cookies, headers } from "next/headers";
import type { ReactNode } from "react";
import { isMobileUserAgent, parseViewModeCookie } from "@/lib/device";

export function ResponsiveRoute(props: {
  desktop: ReactNode;
  mobile: ReactNode;
  routeKey: string;
}) {
  const ua = headers().get("user-agent") ?? "";
  const viewMode = parseViewModeCookie(cookies().get("viewMode")?.value);

  const isMobile = viewMode === "mobile" ? true : viewMode === "desktop" ? false : isMobileUserAgent(ua);
  return <>{isMobile ? props.mobile : props.desktop}</>;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/(site)/_routing/ResponsiveRoute.tsx
git commit -m "feat(mobile): add responsive route switcher"
```

---

## Task 3: Introduce mobile-only layout shell (banli-ui)

**Files:**
- Create: `src/components/mobile/layout/MobileAppShell.tsx`
- Create: `src/components/mobile/nav/MobileHeader.tsx`
- Create: `src/components/mobile/nav/MobileMenuDrawer.tsx`
- Create: `src/styles/mobile/tokens.scss`
- Create: `src/styles/mobile/mobile.module.scss` (or similar)

- [ ] **Step 1: Implement minimal shell**

Requirements:
- sticky header (top)
- hamburger opens drawer
- drawer contains nav items for the 10 routes
- touch targets >= 44px height

Use banli-ui components where appropriate; if banli-ui doesn’t provide drawer, use a simple fixed-position panel + overlay.

- [ ] **Step 2: Add “view mode” switch (debug)**

Add small “Desktop / Mobile / Auto” buttons in drawer footer (only in development):
- calls `/api/view-mode` to set cookie
- reloads page

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile src/styles/mobile
git commit -m "feat(mobile): add mobile app shell + drawer nav"
```

---

## Task 4: Implement mobile pages (route-by-route)

**Files:**
- Create: `src/app/(site)/(mobile)/**` pages listed above
- Modify: each `src/app/(site)/*/page.tsx` to use `ResponsiveRoute`

### 4.1 Home `/`

- [ ] **Step 1: Implement `MobileHomePage`**
Content strategy (app-like):
- condensed hero: title + date/location + 2 CTA buttons
- key sections: “Why Attend”, “Speakers (carousel or horizontal scroll)”, “Schedule preview”, “Tickets CTA”
- single-column, consistent paddings

- [ ] **Step 2: Wire route shell**

Modify `src/app/(site)/page.tsx`:
```tsx
import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import { ResponsiveRoute } from "./_routing/ResponsiveRoute";
import { MobileHomePage } from "./(mobile)/home/MobileHomePage";

export default async function Page() {
  const desktopHtml = await getAiventTemplateBodyHtml("index.html");
  return (
    <ResponsiveRoute
      routeKey="home"
      desktop={<div dangerouslySetInnerHTML={{ __html: desktopHtml }} />}
      mobile={<MobileHomePage />}
    />
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/app/(site)/page.tsx src/app/(site)/(mobile)/home
git commit -m "feat(mobile): add mobile home page"
```

### 4.2 Repeat for remaining routes

For each route, replicate the same pattern:
- Desktop: keep `getAiventTemplateBodyHtml("<template>.html")`
- Mobile: new React page component under `src/app/(site)/(mobile)/<route>/...`
- Commit per route to keep diffs reviewable.

Routes mapping:
- `/index-slider` -> `index-slider.html`
- `/index-static-background` -> `index-static-background.html`
- `/index-slider-text` -> `index-slider-text.html`
- `/index-countdown` -> `index-countdown.html`
- `/tickets` -> `tickets.html`
- `/tickets-2` -> `tickets-2.html`
- `/news` -> `news.html`
- `/news-single` -> `news-single.html`
- `/contact` -> `contact.html`

---

## Task 5: Ensure legacy template JS/CSS do not affect mobile

**Files:**
- Modify: `src/app/(site)/layout.tsx`
- Create: `src/components/mobile/layout/MobileBodyClass.client.tsx` (optional)

- [ ] **Step 1: Make template scripts conditional**

Goal: do not include `<AiventScriptsServer />` when mobile route is rendered.

Implementation approach:
- Move template script injection from `(site)/layout.tsx` into the desktop render branch (desktop-only wrapper component), so mobile never loads those scripts.

Example:
- Create desktop wrapper: `src/app/(site)/_routing/DesktopTemplateShell.tsx` that renders children + `<AiventScriptsServer />`
- Update desktop branches to wrap legacy HTML with that shell.

- [ ] **Step 2: Verify**
On mobile UA / viewMode=mobile:
- confirm `/aivent/js/vendors.js` not requested
- confirm no template “menu-btn” etc DOM exists

- [ ] **Step 3: Commit**

```bash
git add src/app/(site)/layout.tsx src/app/(site)/_routing
git commit -m "fix(mobile): prevent legacy template scripts on mobile"
```

---

## Task 6: Tests — mobile vs desktop rendering

**Files:**
- Create: `tests/e2e/mobile-rendering.spec.ts`
- Modify: `package.json` (if needed to add test script)

- [ ] **Step 1: Add Playwright test**

Test cases:
1) Desktop UA loads legacy wrapper marker (e.g., `#wrapper` exists)
2) Mobile UA loads mobile header marker (e.g., `[data-mobile-shell=true]` exists) and `#wrapper` does not
3) Cookie override forces mode irrespective of UA

Example (skeleton):
```ts
import { test, expect } from "@playwright/test";

test("mobile UA renders mobile shell", async ({ page }) => {
  await page.setExtraHTTPHeaders({ "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)" });
  await page.goto("http://localhost:3000/index-slider");
  await expect(page.locator("[data-mobile-shell='true']")).toBeVisible();
});
```

- [ ] **Step 2: Run**

```bash
pnpm dev
pnpm exec playwright test tests/e2e/mobile-rendering.spec.ts
```

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/mobile-rendering.spec.ts
git commit -m "test(mobile): add UA/cookie rendering coverage"
```

---

## Task 7: Performance passes (mobile)

**Files:**
- Modify: mobile pages/components

- [ ] **Step 1: Replace critical images with next/image**
Rules:
- Hero image: `priority`
- Others: `loading="lazy"`
- Use `sizes="(max-width: 992px) 100vw, 992px"`

- [ ] **Step 2: Reduce JS**
Goal: mobile shouldn’t ship template JS; verify with network inspector.

- [ ] **Step 3: Commit**

```bash
git add src/app/(site)/(mobile) src/components/mobile
git commit -m "perf(mobile): optimize images and reduce JS"
```

---

## Self-Review Checklist (run before execution)

1) **Coverage**: all 10 routes have `ResponsiveRoute` wiring and a `Mobile*Page`.
2) **No placeholders**: search in plan for “TBD/TODO”.
3) **Desktop unchanged**: run `pnpm compare:visual` with desktop viewport to ensure diffs remain ~0.
4) **Mobile tests pass**: Playwright mobile-rendering spec passes.

