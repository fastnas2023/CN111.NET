# CN111 Studio Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把当前 PRD V1 的“文字骨架页”升级为可上线的企业质感视觉：保留 Aivent 的赛博深色审美，但内容与结构完全按 CN111 Studio 企业服务站呈现（PC 企业官网风格、移动端 App 风格）。

**Architecture:** 以现有 `V1DesktopShell + V1Page.module.scss + V1MobilePage.module.scss` 为基础，新增一层“V1 视觉组件”（Hero / Section / Card / CTA），用可复用组件把首页与各栏目页填充为结构化内容；优先复用现有 Aivent 静态资源（背景图/视频）作为占位素材，后续可替换为自有品牌素材。

**Tech Stack:** Next.js App Router、React、SCSS Modules、banli-ui（Button/Icon）、Playwright（轻量回归）。

---

## 0) Files to Touch / Create（结构锁定）

**Modify**
- `src/app/[locale]/(site)/page.tsx`（首页：补齐 Hero 大背景 + CTA + 后续 sections）
- `src/app/[locale]/(site)/solutions/page.tsx`
- `src/app/[locale]/(site)/services/page.tsx`
- `src/app/[locale]/(site)/case-studies/page.tsx`
- `src/app/[locale]/(site)/resources/page.tsx`
- `src/app/[locale]/(site)/about/page.tsx`
- `src/app/[locale]/(site)/book/page.tsx`
- `src/app/[locale]/(site)/(mobile)/home/MobilePage.tsx`（移动端首页 Hero 视觉与 CTA）
- `src/app/[locale]/(site)/(mobile)/_shared/V1MobilePage.module.scss`（移动端视觉增强）
- `src/i18n/messages/zh-CN.json`、`src/i18n/messages/en-US.json`（补齐 v1.* 视觉文案/按钮文案）

**Create**
- `src/components/site/v1/V1Hero.tsx`
- `src/components/site/v1/V1Hero.module.scss`
- `src/components/site/v1/V1Section.tsx`
- `src/components/site/v1/V1Section.module.scss`
- `src/components/site/v1/V1Cards.tsx`
- `src/components/site/v1/V1Cards.module.scss`
- `tests/prd/v1-home-hero.spec.ts`（确保 Hero 关键 CTA 存在）

---

## Task 1: 建立 V1 视觉组件（Hero / Section / Card）

**Files:**
- Create: `src/components/site/v1/V1Hero.tsx`
- Create: `src/components/site/v1/V1Hero.module.scss`
- Create: `src/components/site/v1/V1Section.tsx`
- Create: `src/components/site/v1/V1Section.module.scss`
- Create: `src/components/site/v1/V1Cards.tsx`
- Create: `src/components/site/v1/V1Cards.module.scss`

### Step 1: 新增 V1Hero（支持视频/图片背景 + 渐变遮罩 + CTA）

```tsx
// src/components/site/v1/V1Hero.tsx
import Link from "next/link";
import Image from "next/image";
import styles from "./V1Hero.module.scss";

export type V1HeroProps = {
  kicker: string;
  title: string;
  lede: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: { type: "video"; src: string } | { type: "image"; src: string; alt: string };
};

export function V1Hero(props: V1HeroProps) {
  return (
    <section className={styles.hero}>
      {props.background?.type === "video" ? (
        <video className={styles.bgVideo} src={props.background.src} autoPlay muted loop playsInline />
      ) : props.background?.type === "image" ? (
        <Image className={styles.bgImage} src={props.background.src} alt={props.background.alt} fill priority />
      ) : null}
      <div className={styles.overlay} />
      <div className={styles.container}>
        <p className={styles.kicker}>{props.kicker}</p>
        <h1 className={styles.title}>{props.title}</h1>
        <p className={styles.lede}>{props.lede}</p>
        <div className={styles.ctaRow}>
          <Link className={styles.primaryCta} href={props.primaryCta.href}>{props.primaryCta.label}</Link>
          {props.secondaryCta ? (
            <Link className={styles.secondaryCta} href={props.secondaryCta.href}>{props.secondaryCta.label}</Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
```

```scss
/* src/components/site/v1/V1Hero.module.scss */
.hero { position: relative; overflow: hidden; padding: 96px 0 68px; }
.container { position: relative; z-index: 2; max-width: 1120px; margin: 0 auto; padding: 0 20px; }
.bgVideo, .bgImage { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.overlay {
  position: absolute; inset: 0;
  background:
    radial-gradient(900px 420px at 20% 20%, rgba(124,58,237,0.35), transparent 55%),
    radial-gradient(900px 420px at 80% 30%, rgba(34,211,238,0.22), transparent 55%),
    linear-gradient(180deg, rgba(11,16,32,0.30), rgba(11,16,32,0.92));
}
.kicker { margin: 0 0 12px; font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: rgba(255,255,255,.72); }
.title { margin: 0 0 14px; font-size: clamp(38px, 4.2vw, 64px); line-height: 1.04; }
.lede { margin: 0; max-width: 70ch; font-size: 16px; line-height: 1.8; color: rgba(255,255,255,.78); }
.ctaRow { display: flex; gap: 12px; margin-top: 22px; flex-wrap: wrap; }
.primaryCta, .secondaryCta {
  display: inline-flex; align-items: center; justify-content: center;
  height: 44px; padding: 0 16px; border-radius: 999px; text-decoration: none;
  font-weight: 800; letter-spacing: .02em;
}
.primaryCta { background: rgba(124,58,237,.92); border: 1px solid rgba(124,58,237,.65); color: #fff; }
.secondaryCta { background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.16); color: rgba(255,255,255,.92); }
@media (max-width: 900px) { .hero { padding-top: 72px; } }
```

### Step 2: 新增 V1Section / V1Cards（统一 section 标题、卡片样式）

```tsx
// src/components/site/v1/V1Section.tsx
import type { ReactNode } from "react";
import styles from "./V1Section.module.scss";

export function V1Section(props: { title?: string; children: ReactNode }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {props.title ? <h2 className={styles.title}>{props.title}</h2> : null}
        {props.children}
      </div>
    </section>
  );
}
```

```scss
/* src/components/site/v1/V1Section.module.scss */
.section { padding: 34px 0 70px; }
.container { max-width: 1120px; margin: 0 auto; padding: 0 20px; }
.title { margin: 0 0 14px; font-size: 18px; letter-spacing: .02em; }
```

```tsx
// src/components/site/v1/V1Cards.tsx
import Link from "next/link";
import styles from "./V1Cards.module.scss";

export function V1Card(props: { title: string; body: string; href?: string; ctaLabel?: string }) {
  const Inner = (
    <>
      <h3 className={styles.cardTitle}>{props.title}</h3>
      <p className={styles.cardBody}>{props.body}</p>
      {props.href && props.ctaLabel ? <span className={styles.cardCta}>{props.ctaLabel}</span> : null}
    </>
  );
  return props.href ? (
    <Link className={styles.card} href={props.href}>{Inner}</Link>
  ) : (
    <div className={styles.card}>{Inner}</div>
  );
}

export function V1Grid(props: { children: React.ReactNode }) {
  return <div className={styles.grid}>{props.children}</div>;
}
```

```scss
/* src/components/site/v1/V1Cards.module.scss */
.grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.card {
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(255,255,255,.04);
  padding: 18px 18px 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
}
.card:hover { transform: translateY(-1px); background: rgba(255,255,255,.06); border-color: rgba(124,58,237,.30); }
.cardTitle { margin: 0 0 10px; font-size: 16px; }
.cardBody { margin: 0; color: rgba(255,255,255,.72); line-height: 1.7; }
.cardCta { display: inline-flex; margin-top: 14px; font-weight: 800; color: rgba(255,255,255,.92); }
@media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
```

### Step 3: 构建验证

Run:
```bash
pnpm -s build
```
Expected: PASS（允许 Sass @import deprecation warning）。

### Step 4: Commit

```bash
git add src/components/site/v1/V1Hero.tsx src/components/site/v1/V1Hero.module.scss src/components/site/v1/V1Section.tsx src/components/site/v1/V1Section.module.scss src/components/site/v1/V1Cards.tsx src/components/site/v1/V1Cards.module.scss
git commit -m "feat(v1): add reusable hero/section/card components"
```

---

## Task 2: 首页（Home）补齐企业视觉与核心 sections

**Files:**
- Modify: `src/app/[locale]/(site)/page.tsx`
- Modify: `src/app/[locale]/(site)/(mobile)/home/MobilePage.tsx`
- Modify: `src/i18n/messages/zh-CN.json`
- Modify: `src/i18n/messages/en-US.json`

### Step 1: Home Desktop 使用 V1Hero（背景优先复用现有视频）
使用现有资源（任选其一）：
- 视频：`/assets/videos/hero.mp4`
- 图片：`/aivent/images/background/3.webp`（或其它 background）

代码示例（替换 page.tsx 里的 `styles.hero` section）：
```tsx
import { V1Hero } from "@/components/site/v1/V1Hero";
import { V1Section } from "@/components/site/v1/V1Section";
import { V1Card, V1Grid } from "@/components/site/v1/V1Cards";

<V1Hero
  kicker={t("v1.kicker")}
  title={t("v1.home.heroA.title")}
  lede={t("v1.home.heroA.lede")}
  background={{ type: "video", src: "/assets/videos/hero.mp4" }}
  primaryCta={{ label: t("v1.cta.book"), href: withLocale(locale, routes.book) }}
  secondaryCta={{ label: t("v1.cta.caseStudies"), href: withLocale(locale, routes.caseStudies) }}
/>
```

### Step 2: Home 的 4 个 Solutions 卡 + 精选案例 3 卡 + 流程 4 步
```tsx
<V1Section title={t("v1.home.solutions.title")}>
  <V1Grid>
    <V1Card title={t("v1.solutions.s1.title")} body={t("v1.solutions.s1.body")} href={withLocale(locale, routes.solutions)} ctaLabel={t("v1.cta.learnMore")} />
    <V1Card title={t("v1.solutions.s2.title")} body={t("v1.solutions.s2.body")} href={withLocale(locale, routes.solutions)} ctaLabel={t("v1.cta.learnMore")} />
    <V1Card title={t("v1.solutions.s3.title")} body={t("v1.solutions.s3.body")} href={withLocale(locale, routes.solutions)} ctaLabel={t("v1.cta.learnMore")} />
  </V1Grid>
</V1Section>
```

（注：第 4 卡可在 grid 下方补一行，或把 grid 改为 2x2；按实现者偏好。）

### Step 3: Mobile Home 也切换为“带背景 Hero + CTA”
移动端可以先用图片背景（性能更稳），例如：
```tsx
// (mobile)/home/MobilePage.tsx
<header className={styles.heroVisual}>
  <div className={styles.heroOverlay} />
  <p className={styles.kicker}>{t("v1.kicker")}</p>
  <h1 className={styles.h1}>{t("v1.home.heroA.title")}</h1>
  <p className={styles.lede}>{t("v1.home.heroA.lede")}</p>
</header>
```

### Step 4: i18n（仅补齐 zh-CN/en-US 的 v1.home.*）
最小 key 集合（示例）：
- `v1.home.heroA.title / lede`
- `v1.cta.book / v1.cta.caseStudies / v1.cta.learnMore`
- `v1.home.solutions.title`
- `v1.solutions.s1/s2/s3/s4.title/body`

### Step 5: 构建验证 + Commit
Run:
```bash
pnpm -s build
```
Commit:
```bash
git add src/app/[locale]/(site)/page.tsx src/app/[locale]/(site)/(mobile)/home/MobilePage.tsx src/app/[locale]/(site)/(mobile)/_shared/V1MobilePage.module.scss src/i18n/messages/zh-CN.json src/i18n/messages/en-US.json
git commit -m "feat(v1): restore visual hero and populate home sections"
```

---

## Task 3: Solutions / Services / Case Studies / Resources / About / Book 页面视觉填充（去掉 placeholder）

**Files:**
- Modify: `src/app/[locale]/(site)/solutions/page.tsx`
- Modify: `src/app/[locale]/(site)/services/page.tsx`
- Modify: `src/app/[locale]/(site)/case-studies/page.tsx`
- Modify: `src/app/[locale]/(site)/resources/page.tsx`
- Modify: `src/app/[locale]/(site)/about/page.tsx`
- Modify: `src/app/[locale]/(site)/book/page.tsx`
- Modify: 对应 `(mobile)/*/MobilePage.tsx`

### Step 1: 每页顶部统一用 V1Hero（图片背景即可）
示例（solutions）：
```tsx
<V1Hero
  kicker={t("v1.kicker")}
  title={t("v1.solutions.title")}
  lede={t("v1.solutions.lede")}
  background={{ type: "image", src: "/aivent/images/background/2.webp", alt: "Background" }}
  primaryCta={{ label: t("v1.cta.book"), href: withLocale(locale, routes.book) }}
/>
```

### Step 2: Solutions 页用 4 卡列出 S1–S4
Services 页用“分类 + 套餐区间”用卡片呈现（每类 3 档）。

### Step 3: Case Studies/Resources 列表用卡片 + 缩略图占位
先用现有 `public/aivent/images/demo/homepage-*.webp` 做占位缩略图（后续替换真实案例图）。

### Step 4: Book 页做“强转化”视觉（大标题 + 你将得到什么 + 主 CTA）
主 CTA 仍跳转 `/contact` 表单（如未来接日历，再替换）。

### Step 5: 构建验证 + Commit
Run:
```bash
pnpm -s build
```
Commit:
```bash
git add src/app/[locale]/(site)/*/page.tsx src/app/[locale]/(site)/(mobile)/*/MobilePage.tsx
git commit -m "feat(v1): populate corporate pages with cards and CTAs"
```

---

## Task 4: 回归测试（确保首页 Hero 与关键 CTA 不再“只剩文字”）

**Files:**
- Create: `tests/prd/v1-home-hero.spec.ts`

### Step 1: 写测试（SSR 断言 Hero CTA 链接存在）
```ts
import { test, expect } from "@playwright/test";

test("home includes hero CTAs (SSR)", async ({ request }) => {
  const res = await request.get("/zh-CN/");
  expect(res.ok()).toBeTruthy();
  const html = await res.text();
  expect(html).toContain("/zh-CN/book");
  expect(html).toContain("/zh-CN/case-studies");
});
```

### Step 2: 运行测试
Run:
```bash
PORT=3001 pnpm exec playwright test tests/prd/v1-home-hero.spec.ts
```
Expected: PASS

### Step 3: Commit
```bash
git add tests/prd/v1-home-hero.spec.ts
git commit -m "test(prd): ensure home hero CTAs exist"
```

---

## Task 5: 推送与预览

- [ ] Step 1: 推送 main
```bash
git push origin main
```
- [ ] Step 2: 启动预览
```bash
pnpm -s dev -p 3001 -H 0.0.0.0
```

