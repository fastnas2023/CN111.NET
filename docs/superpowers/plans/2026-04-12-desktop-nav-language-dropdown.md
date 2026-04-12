# Desktop 顶栏语言下拉（仿 Pages）Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 桌面端（≥992px）把语言切换从右侧浮层移入顶部导航栏 `#mainmenu`，做成与 Pages 同款下拉；移动端继续使用抽屉顶部 Select。

**Architecture:** 桌面端模板页面由 `getAiventTemplateBodyHtml()` 从 `/public/aivent/*.html` 读取后注入到页面；因此通过在 HTML 生成阶段对 `#mainmenu` 做一次“精确插入”即可复用模板 dropdown 样式/脚本。为避免误伤与重复插入，使用 `ul depth` 扫描定位 `#mainmenu` 的正确闭合标签，并以 `data-cn111="lang-menu"` 做 marker。

**Tech Stack:** Next.js App Router, TypeScript, Playwright

---

## File/Module Map

**Modify**
- `src/lib/aiventTemplate.ts` — 注入 desktop 语言菜单项到 `#mainmenu`
- `src/app/[locale]/(site)/_routing/DesktopTemplateShell.tsx` — 移除桌面浮层语言栏渲染
- `src/app/globals.scss` — （可选）清理/保留 desktop 浮层样式，确保不会影响其它区域

**Create**
- `tests/i18n/desktop-nav-language-dropdown.spec.ts` — 回归：SSR HTML 含 `data-cn111="lang-menu"` 且不含浮层语言栏 class

---

### Task 1: 写回归测试（RED）

**Files:**
- Create: `tests/i18n/desktop-nav-language-dropdown.spec.ts`

- [ ] **Step 1: 写 failing test**

```ts
import { test, expect } from "@playwright/test";

test("desktop nav contains injected language dropdown (SSR)", async ({ request }) => {
  const res = await request.get("/zh-CN/");
  expect(res.ok()).toBeTruthy();
  const html = await res.text();

  // 语言菜单 marker（插入到 #mainmenu 内）
  expect(html).toContain('data-cn111="lang-menu"');

  // 旧的浮层语言栏不应再出现在桌面 HTML
  expect(html).not.toContain("cn111-lang-switcher--desktop");
});
```

- [ ] **Step 2: 运行测试确认失败**

Run: `PORT=3001 pnpm exec playwright test tests/i18n/desktop-nav-language-dropdown.spec.ts`  
Expected: FAIL（因为还没注入 lang-menu，且 DesktopTemplateShell 仍渲染 desktop switcher）

- [ ] **Step 3: Commit**

```bash
git add tests/i18n/desktop-nav-language-dropdown.spec.ts
git commit -m "test: add desktop nav language dropdown spec"
```

---

### Task 2: 注入 desktop 语言菜单到 #mainmenu（GREEN）

**Files:**
- Modify: `src/lib/aiventTemplate.ts`

- [ ] **Step 1: 增加注入函数**

实现要点（代码里按此落地）：
- `findMainmenuInsertIndex(html)`：从 `<ul id="mainmenu">` 起扫描 `<ul`/`</ul>` 深度，返回 mainmenu 闭合 `</ul>` 前的位置
- `restByPageKey`：根据 `DesktopPageKey` 映射 rest（home→""、tickets→"/tickets" 等）
- 生成 HTML：
  - `<li data-cn111="lang-menu">`
  - `<a class="menu-item" ...>中文</a>`（当前语言）
  - 子 `<ul>`：每个语言 `<li><a class="menu-item" href="/{loc}{rest}">...</a></li>`

注入位置建议在 `applyDesktopI18n()` **之后**，避免被 replaceAll 误替换。

- [ ] **Step 2: 运行测试**

Run: `PORT=3001 pnpm exec playwright test tests/i18n/desktop-nav-language-dropdown.spec.ts`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/lib/aiventTemplate.ts
git commit -m "feat(i18n): inject desktop nav language dropdown"
```

---

### Task 3: 移除 desktop 浮层语言栏（GREEN）

**Files:**
- Modify: `src/app/[locale]/(site)/_routing/DesktopTemplateShell.tsx`

- [ ] **Step 1: 删除 `<LanguageSwitcher variant=\"desktop\" />`**

保留 `ViewportViewModeSync / AiventBodyClass / AiventScriptsServer` 原顺序不变。

- [ ] **Step 2: 运行测试**

Run: `PORT=3001 pnpm exec playwright test tests/i18n/desktop-nav-language-dropdown.spec.ts`  
Expected: PASS

- [ ] **Step 3: Commit**

```bash
git add src/app/[locale]/(site)/_routing/DesktopTemplateShell.tsx
git commit -m "feat(ui): move desktop language switcher into top nav"
```

---

### Task 4: 回归与推送

- [ ] **Step 1: Build**

Run: `pnpm -s build`  
Expected: PASS

- [ ] **Step 2: Push**

Run: `git push origin main`

