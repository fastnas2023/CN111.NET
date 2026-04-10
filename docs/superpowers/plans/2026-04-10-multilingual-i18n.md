# CN111.NET 多语言（i18n）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 CN111.NET 增加多语言能力：统一使用 `/{locale}/...` 路由前缀、`/` 302 → `/zh-CN`、支持 `zh-CN/en-US/de-DE/fr-FR/ja-JP/ko-KR/ru-RU/ar-SA`，并让桌面模板 + 移动端都可翻译。

**Architecture:** App Router 以 `[locale]` 作为一级 segment；服务端加载对应语言 messages，并通过 React Context 提供 `t()` 给移动端组件；桌面模板通过服务端对 HTML 做可控的 i18n 替换（页面级词条表），并提供统一语言切换组件。

**Tech Stack:** Next.js App Router, React 19, TypeScript, SCSS Modules, Playwright（回归）, Node JSON message catalogs

---

## File/Module Map（将新增/修改的关键文件）

**Create**
- `src/i18n/locales.ts` — locale 常量、校验、默认语言
- `src/i18n/messages/{locale}.json` — 8 种语言 message catalog（第一期核心 key）
- `src/i18n/server.ts` — server side 加载 messages + 生成 `t()`
- `src/i18n/client.tsx` — `I18nProvider` + `useT()` hook
- `src/app/page.tsx` — 302 redirect 到 `/zh-CN`
- `src/app/[locale]/layout.tsx` — i18n 注入、设置 `<html lang dir>`
- `src/app/[locale]/(site)/...` — 迁移现有站点 routes 到 locale 前缀下（桌面/移动分流保留）
- `src/components/i18n/LanguageSwitcher.tsx` — 统一语言切换（桌面 overlay + 移动菜单用）

**Modify**
- `src/lib/aiventTemplate.ts` — 增加 `rewriteI18n`（桌面模板翻译）
- `src/components/mobile/nav/MobileMenuDrawer.tsx` — 增加语言切换入口
- `src/app/(site)/*` — 将原有无前缀 routes 迁移/重定向
- `tests/qa/*` — 扩展 smoke 扫描到 locale 前缀路由

---

## Task 1: i18n 基础设施（locale + messages + t()）

**Files:**
- Create: `src/i18n/locales.ts`
- Create: `src/i18n/messages/zh-CN.json`
- Create: `src/i18n/messages/en-US.json`
- Create: `src/i18n/messages/de-DE.json`
- Create: `src/i18n/messages/fr-FR.json`
- Create: `src/i18n/messages/ja-JP.json`
- Create: `src/i18n/messages/ko-KR.json`
- Create: `src/i18n/messages/ru-RU.json`
- Create: `src/i18n/messages/ar-SA.json`
- Create: `src/i18n/server.ts`
- Create: `src/i18n/client.tsx`
- Test: `pnpm -s build`

- [ ] **Step 1: Create `src/i18n/locales.ts`**

```ts
export const DEFAULT_LOCALE = "zh-CN" as const;

export const SUPPORTED_LOCALES = [
  "zh-CN",
  "en-US",
  "de-DE",
  "fr-FR",
  "ja-JP",
  "ko-KR",
  "ru-RU",
  "ar-SA",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(v: string): v is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(v);
}

export function getHtmlDir(locale: SupportedLocale): "ltr" | "rtl" {
  return locale === "ar-SA" ? "rtl" : "ltr";
}
```

- [ ] **Step 2: Create minimal message catalogs（先覆盖导航/页脚/切换器）**

Example `src/i18n/messages/en-US.json`（其余语言同 key 结构）：

```json
{
  "brand.name": "CN111.NET",
  "nav.home": "Home",
  "nav.indexSlider": "Index Slider",
  "nav.indexStaticBackground": "Index Static Background",
  "nav.indexSliderText": "Index Slider Text",
  "nav.indexCountdown": "Index Countdown",
  "nav.tickets": "Tickets",
  "nav.tickets2": "Tickets 2",
  "nav.news": "News",
  "nav.newsSingle": "News Single",
  "nav.contact": "Contact",
  "lang.label": "Language",
  "lang.zhCN": "中文",
  "lang.enUS": "English",
  "lang.deDE": "Deutsch",
  "lang.frFR": "Français",
  "lang.jaJP": "日本語",
  "lang.koKR": "한국어",
  "lang.ruRU": "Русский",
  "lang.arSA": "العربية",
  "footer.copyright": "© {year} CN111.NET"
}
```

- [ ] **Step 3: Create server loader `src/i18n/server.ts`**

```ts
import "server-only";
import type { SupportedLocale } from "./locales";

type Messages = Record<string, string>;

export async function getMessages(locale: SupportedLocale): Promise<Messages> {
  return (await import(`./messages/${locale}.json`)).default as Messages;
}

export function createT(messages: Messages) {
  return (key: string, vars?: Record<string, string | number>) => {
    const raw = messages[key] ?? key;
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
      raw,
    );
  };
}
```

- [ ] **Step 4: Create client provider `src/i18n/client.tsx`**

```tsx
"use client";

import React from "react";
import type { SupportedLocale } from "./locales";

export type Messages = Record<string, string>;
type TFn = (key: string, vars?: Record<string, string | number>) => string;

const I18nContext = React.createContext<
  { locale: SupportedLocale; t: TFn } | undefined
>(undefined);

function createT(messages: Messages): TFn {
  return (key, vars) => {
    const raw = messages[key] ?? key;
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
      raw,
    );
  };
}

export function I18nProvider(props: {
  locale: SupportedLocale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = React.useMemo(
    () => ({ locale: props.locale, t: createT(props.messages) }),
    [props.locale, props.messages],
  );
  return <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}
```

- [ ] **Step 5: Build**

Run: `pnpm -s build`  
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/i18n
git commit -m "feat(i18n): add locales and message catalogs"
```

---

## Task 2: 路由改造（全语言前缀）+ 默认 `/` 302 → `/zh-CN`

**Files:**
- Create: `src/app/page.tsx`
- Create: `src/app/[locale]/layout.tsx`
- Move: `src/app/(site)/**` → `src/app/[locale]/(site)/**`
- Modify: import 路径（涉及 `@/app/(site)` 的引用）
- Test: `pnpm -s build`

- [ ] **Step 1: Create root redirect `src/app/page.tsx`**

```tsx
import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/i18n/locales";

export default function Page() {
  // Next 的 redirect 默认 307。若必须 302，可在后续 Task 增加 middleware 控制 status。
  redirect(`/${DEFAULT_LOCALE}`);
}
```

- [ ] **Step 2: Create locale layout `src/app/[locale]/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "../globals.scss";
import "banli-ui/styles.css";

import { AppProviders } from "@/components/providers/AppProviders";
import { AiventHeadAssets } from "@/app/(site)/AiventHeadAssets";

import { getMessages, createT } from "@/i18n/server";
import { getHtmlDir, isSupportedLocale, type SupportedLocale } from "@/i18n/locales";
import { I18nProvider } from "@/i18n/client";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { locale: "zh-CN" },
    { locale: "en-US" },
    { locale: "de-DE" },
    { locale: "fr-FR" },
    { locale: "ja-JP" },
    { locale: "ko-KR" },
    { locale: "ru-RU" },
    { locale: "ar-SA" },
  ];
}

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  if (!isSupportedLocale(locale)) return {};
  const messages = await getMessages(locale);
  const t = createT(messages);
  return {
    title: t("brand.name"),
    description: `${t("brand.name")} (Next.js + banli-ui + SCSS)`,
  };
}

export default async function LocaleLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await props.params;
  if (!isSupportedLocale(rawLocale)) notFound();
  const locale = rawLocale as SupportedLocale;

  const messages = await getMessages(locale);
  return (
    <html lang={locale} dir={getHtmlDir(locale)}>
      <head>
        <AiventHeadAssets />
      </head>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          <AppProviders>{props.children}</AppProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Move route tree**

Move directory:

```bash
git mv src/app/(site) src/app/[locale]/(site)
```

Then fix broken imports where paths contain `@/app/(site)`; update them to `@/app/[locale]/(site)` **或**移动这类“与路由无关的壳组件”到 `src/components/aivent/*` 并改成 `@/components/...` 引用（推荐后者，减少路由耦合）。

- [ ] **Step 4: Build**

Run: `pnpm -s build`  
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/app
git commit -m "feat(i18n): add locale-prefixed routing and default redirect"
```

---

## Task 3: 语言切换组件（桌面 overlay + 移动菜单入口）

**Files:**
- Create: `src/components/i18n/LanguageSwitcher.tsx`
- Modify: `src/app/[locale]/(site)/_routing/DesktopTemplateShell.tsx`
- Modify: `src/components/mobile/nav/MobileMenuDrawer.tsx`
- Test: manual + `pnpm -s build`

- [ ] **Step 1: Create `LanguageSwitcher.tsx`（client）**

```tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { SUPPORTED_LOCALES, type SupportedLocale } from "@/i18n/locales";
import { useI18n } from "@/i18n/client";

const LABEL_KEY: Record<SupportedLocale, string> = {
  "zh-CN": "lang.zhCN",
  "en-US": "lang.enUS",
  "de-DE": "lang.deDE",
  "fr-FR": "lang.frFR",
  "ja-JP": "lang.jaJP",
  "ko-KR": "lang.koKR",
  "ru-RU": "lang.ruRU",
  "ar-SA": "lang.arSA",
};

function stripLocale(pathname: string) {
  for (const loc of SUPPORTED_LOCALES) {
    const prefix = `/${loc}`;
    if (pathname === prefix) return "/";
    if (pathname.startsWith(prefix + "/")) return pathname.slice(prefix.length);
  }
  return pathname;
}

export function LanguageSwitcher({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname() ?? "/";
  const { locale, t } = useI18n();
  const rest = stripLocale(pathname);

  const className =
    variant === "desktop"
      ? "cn111-lang-switcher cn111-lang-switcher--desktop"
      : "cn111-lang-switcher cn111-lang-switcher--mobile";

  return (
    <div className={className} aria-label={t("lang.label")}>
      {SUPPORTED_LOCALES.map((loc) => {
        const href = `/${loc}${rest === "/" ? "" : rest}`;
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={href}
            prefetch={false}
            style={{
              opacity: active ? 1 : 0.72,
              fontWeight: active ? 800 : 600,
              marginRight: 10,
            }}
          >
            {t(LABEL_KEY[loc])}
          </Link>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Add desktop overlay（不侵入模板 DOM）**

In `DesktopTemplateShell.tsx` add:

```tsx
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
```

and render it near top:

```tsx
<LanguageSwitcher variant="desktop" />
```

Also add minimal CSS（建议放到 `src/app/globals.scss`）：

```scss
.cn111-lang-switcher--desktop {
  position: fixed;
  z-index: 9999;
  top: 12px;
  right: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(17, 22, 43, 0.75);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```

- [ ] **Step 3: Mobile drawer 增加语言入口**

In `MobileMenuDrawer.tsx` import and render in footer:

```tsx
import { LanguageSwitcher } from "@/components/i18n/LanguageSwitcher";
```

```tsx
<div className={styles.footer}>
  <div className={styles.devLabel}>{t("lang.label")}</div>
  <LanguageSwitcher variant="mobile" />
  {/* existing View Mode (dev) UI can stay below or behind isDev */}
</div>
```

（若 `MobileMenuDrawer` 当前未使用 `useI18n()`，需引入 `const { t } = useI18n();`）

- [ ] **Step 4: Build + sanity check**

Run: `pnpm -s build`  
Manual:
- open `/zh-CN/index-slider` and switch to `/en-US/index-slider`
- open mobile menu and switch locale

- [ ] **Step 5: Commit**

```bash
git add src/components/i18n src/app src/components/mobile src/app/globals.scss
git commit -m "feat(i18n): add language switcher for desktop and mobile"
```

---

## Task 4: 桌面模板翻译（rewriteI18n）

**Files:**
- Modify: `src/lib/aiventTemplate.ts`
- Create: `src/i18n/aiventDesktop.ts`（桌面模板词条表）
- Modify: `src/app/[locale]/(site)/*/page.tsx`（传入 locale）
- Test: `pnpm -s build`, manual compare 2 languages

- [ ] **Step 1: Create desktop dictionary `src/i18n/aiventDesktop.ts`**

```ts
import type { SupportedLocale } from "./locales";

export type DesktopPageKey =
  | "home"
  | "index-slider"
  | "index-static-background"
  | "index-slider-text"
  | "index-countdown"
  | "tickets"
  | "tickets-2"
  | "news"
  | "news-single"
  | "contact";

// 只做“精确可控替换”的核心文案（后续按 QA/截图补齐）
export const DESKTOP_REPLACEMENTS: Record<
  DesktopPageKey,
  Array<{ from: string; key: string }>
> = {
  "home": [
    { from: "Home", key: "nav.home" },
    { from: "Tickets", key: "nav.tickets" },
    { from: "News", key: "nav.news" },
    { from: "Contact", key: "nav.contact" }
  ],
  "index-slider": [{ from: "Home", key: "nav.home" }],
  "index-static-background": [{ from: "Home", key: "nav.home" }],
  "index-slider-text": [{ from: "Home", key: "nav.home" }],
  "index-countdown": [{ from: "Home", key: "nav.home" }],
  "tickets": [{ from: "Tickets", key: "nav.tickets" }],
  "tickets-2": [{ from: "Tickets", key: "nav.tickets2" }],
  "news": [{ from: "News", key: "nav.news" }],
  "news-single": [{ from: "News", key: "nav.newsSingle" }],
  "contact": [{ from: "Contact", key: "nav.contact" }]
};

export function applyDesktopI18n(opts: {
  html: string;
  page: DesktopPageKey;
  t: (k: string) => string;
  locale: SupportedLocale;
}) {
  let out = opts.html;
  for (const r of DESKTOP_REPLACEMENTS[opts.page] ?? []) {
    out = out.replaceAll(r.from, opts.t(r.key));
  }
  return out;
}
```

- [ ] **Step 2: Update `getAiventTemplateBodyHtml` signature**

In `src/lib/aiventTemplate.ts`:
- change export to accept `{ locale, t, pageKey }`
- call `applyDesktopI18n(...)` before return

Example patch sketch:

```ts
export async function getAiventTemplateBodyHtml(opts: {
  templateFileName: string;
  locale: SupportedLocale;
  pageKey: DesktopPageKey;
  t: (k: string) => string;
}) {
  // ... existing read + rewriteAssetPaths + rewriteLinks + rewriteLogo
  html = applyDesktopI18n({ html, page: opts.pageKey, t: opts.t, locale: opts.locale });
  return html;
}
```

- [ ] **Step 3: Update each page to pass locale+t**

Example `src/app/[locale]/(site)/index-slider/page.tsx`:

```tsx
import { getMessages, createT } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

export default async function Page(props: { params: Promise<{ locale: SupportedLocale }> }) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  const html = await getAiventTemplateBodyHtml({
    templateFileName: "index-slider.html",
    locale,
    pageKey: "index-slider",
    t,
  });
  // ... existing ResponsiveRoute
}
```

- [ ] **Step 4: Build + spot-check**

Run: `pnpm -s build`  
Manual:
- `/zh-CN/index-slider` vs `/en-US/index-slider`：导航项（至少）有变化

- [ ] **Step 5: Commit**

```bash
git add src/lib/aiventTemplate.ts src/i18n/aiventDesktop.ts src/app
git commit -m "feat(i18n): translate desktop template via controlled replacements"
```

---

## Task 5: 移动端文案全面接入 t()（按页面收敛）

**Files:**
- Modify: `src/app/[locale]/(site)/(mobile)/**`（各 MobilePage）
- Modify: `src/components/mobile/**`
- Test: `pnpm -s build`

- [ ] **Step 1: 更新移动端导航 label 使用 t()**

`MobileMenuDrawer.tsx` 的 NAV_ITEMS 改为 key 驱动：

```ts
type NavItem = { labelKey: string; href: string };
const NAV_ITEMS: NavItem[] = [
  { labelKey: "nav.home", href: routes.home },
  // ...
];
```

渲染：

```tsx
const { t } = useI18n();
<span>{t(item.labelKey)}</span>
```

- [ ] **Step 2: 将页面内硬编码文案逐页替换为 t()**

逐个页面推进（每页一个 commit）：
- Home
- Tickets / Tickets-2
- News / News-single
- Contact
- Index 系列

- [ ] **Step 3: 每完成一个页面，补齐 messages 的 key**

（每页的 key 与中文/英文先补齐，其他语言可先用英文或对应语言的基础翻译；后续再精修。）

- [ ] **Step 4: Build**

Run: `pnpm -s build`  
Expected: PASS

- [ ] **Step 5: Commit（建议按页面拆分）**

```bash
git add src/app src/components/mobile src/i18n/messages
git commit -m "feat(i18n): translate mobile <page>"
```

---

## Task 6: QA 回归（locale 扫描 + 资源 404/console）

**Files:**
- Modify: `tests/qa/smoke-audit.spec.ts`
- Test: `pnpm exec playwright test tests/qa/smoke-audit.spec.ts`

- [ ] **Step 1: 扩展 ROUTES 为 locale 前缀**

将扫描基准改为（示例只扫 2 种 locale 以控制时间）：
- `/zh-CN/*`
- `/en-US/*`

- [ ] **Step 2: 运行 smoke**

Run:

```bash
PORT=3001 CLONE_BASE_URL=http://127.0.0.1:3001 QA_OUT_DIR=/workspace/qa pnpm exec playwright test tests/qa/smoke-audit.spec.ts
```

Expected: PASS（若有 404/ERR_ABORTED，记录并逐项修）

- [ ] **Step 3: Commit**

```bash
git add tests/qa
git commit -m "test: add locale-prefixed smoke audit"
```

