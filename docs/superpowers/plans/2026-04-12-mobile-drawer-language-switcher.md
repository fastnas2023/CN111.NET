# Mobile Drawer 语言切换布局优化 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将移动端语言切换按“大品牌”常见方式放入抽屉菜单顶部，并用 banli-ui 的 Select 组件呈现（只显示当前语言），避免与导航/首屏内容争抢空间。

**Architecture:** 复用现有 `SUPPORTED_LOCALES` 与 `stripLocale()` 生成目标 URL；`LanguageSwitcher` 统一改用 banli-ui Select；移动端抽屉把语言区块从 footer 移到 header；语言切换后自动关闭抽屉。

**Tech Stack:** Next.js App Router, React, banli-ui Select, Playwright

---

## File/Module Map

**Modify**
- `src/components/i18n/LanguageSwitcher.tsx` — 用 banli-ui Select 替代 link 列表；支持 `onNavigate` 回调（用于关闭抽屉）
- `src/components/mobile/nav/MobileMenuDrawer.tsx` — 将语言切换移动到抽屉顶部；选择语言后关闭抽屉
- `src/components/mobile/nav/MobileMenuDrawer.module.scss` — 新增抽屉顶部语言区块样式

**Create**
- `tests/i18n/mobile-drawer-language-switcher.spec.ts` — Playwright 回归：移动端打开菜单后语言 Select 位于导航列表之上且可见

---

## Task 1: 写回归测试（RED）

**Files:**
- Create: `tests/i18n/mobile-drawer-language-switcher.spec.ts`

- [ ] **Step 1: 新增 Playwright 测试（先让它 fail）**

```ts
import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["Pixel 5"] });

test("mobile drawer shows language select at top", async ({ context, page }) => {
  await context.addCookies([
    { name: "viewMode", value: "mobile", url: "http://127.0.0.1:3001/" },
  ]);

  await page.goto("http://127.0.0.1:3001/zh-CN/", { waitUntil: "domcontentloaded" });

  // 打开菜单：依赖 MobileHeader 中按钮的 aria-label（若没有则在实现里补上）
  await page.getByRole("button", { name: /menu|菜单/i }).click();

  // 语言 Select 的 trigger（banli-ui SelectTrigger：button + aria-haspopup=listbox）
  const langTrigger = page.locator('button[aria-haspopup="listbox"]').first();
  await expect(langTrigger).toBeVisible();
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `pnpm exec playwright test tests/i18n/mobile-drawer-language-switcher.spec.ts`  
Expected: FAIL（因为当前语言栏不在顶部/或不是 Select）

- [ ] **Step 3: Commit**

```bash
git add tests/i18n/mobile-drawer-language-switcher.spec.ts
git commit -m "test: add mobile drawer language switcher spec"
```

---

## Task 2: 实现 LanguageSwitcher 使用 banli-ui Select（GREEN）

**Files:**
- Modify: `src/components/i18n/LanguageSwitcher.tsx`

- [ ] **Step 1: 将 LanguageSwitcher 改为 SelectRoot/Trigger/Content/Item 组合**

要点：
- `value` 绑定当前 `locale`
- `onValueChange` 用 `useRouter().push()` 跳到 `/${nextLocale}${rest}`
- 仅显示当前语言（trigger 内通过 SelectValue 显示 label）
- 新增可选 `onNavigate?: () => void`，在 push 后调用（用于关闭抽屉）

- [ ] **Step 2: 运行测试确认通过**

Run: `pnpm exec playwright test tests/i18n/mobile-drawer-language-switcher.spec.ts`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/i18n/LanguageSwitcher.tsx
git commit -m "feat(ui): render language switcher with banli-ui select"
```

---

## Task 3: 移动端抽屉顶部布局（GREEN）

**Files:**
- Modify: `src/components/mobile/nav/MobileMenuDrawer.tsx`
- Modify: `src/components/mobile/nav/MobileMenuDrawer.module.scss`

- [ ] **Step 1: 将语言区块从 footer 移到抽屉顶部**

结构建议：
- `DrawerHeader` / `TopArea`（含“语言”label + Select）
- `NavList`
- `Footer`（保留 dev 的 viewMode 入口）

选择语言后：调用 `setOpen(false)` 关闭抽屉（通过给 `LanguageSwitcher` 传 `onNavigate` 实现）。

- [ ] **Step 2: 运行测试**

Run: `pnpm exec playwright test tests/i18n/mobile-drawer-language-switcher.spec.ts`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/components/mobile/nav/MobileMenuDrawer.tsx src/components/mobile/nav/MobileMenuDrawer.module.scss
git commit -m "feat(ui): move mobile language switcher to drawer top"
```

---

## Task 4: 回归构建

- [ ] **Step 1: Build**

Run: `pnpm -s build`  
Expected: PASS

