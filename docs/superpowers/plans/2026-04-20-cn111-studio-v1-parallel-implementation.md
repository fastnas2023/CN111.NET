# CN111 Studio V1（基于 aivent-clone）并行实现计划

> **For agentic workers:** RECOMMENDED: multi-worktree parallel implementation (6 agents). Each agent works in an isolated git worktree to avoid conflicts. Steps use checkbox (`- [ ]`) syntax.

**Goal:** 在现有 `aivent-clone` 上实现 CN111 Studio 企业官网 V1：导航 IA、首页板块（风格 3：深色首屏 + 白底内容区）、Solutions/Services/Case Studies/Resources/About/Contact/Book，支持 zh/en（沿用现有 i18n）。

**Architecture:** 继续使用现有 `ResponsiveRoute`（desktop=V1DesktopShell + V1 组件；mobile=MobileAppShell + 移动端页面）。通过新增/扩展 V1 组件与页面内容数据（i18n 文案）完成 V1 信息架构。移动端保持 App Shell（顶部标题 + 底部 TabBar）。

**Tech Stack:** Next.js App Router, TypeScript, SCSS modules, Playwright, pnpm

---

## 0. 并行开发约束（必须遵守）

- 每个 agent 只能修改自己分配的文件路径范围（避免 merge 冲突）
- 不允许改动 repo 根配置（除非该 agent 负责“全局”任务）
- 每个 agent 完成后必须：
  - `pnpm -s lint`（如项目有）或至少 `pnpm -s build`
  - 提交 commit（feat/chore/test 皆可）

---

## 1. Worktree 划分（6 个 agent）

> 主仓库：`/workspace/aivent-clone`

1. **Agent-Home**：首页（desktop + mobile）板块补齐（Proof、Solutions、Cases、Process、Pricing、Insights、FAQ、CTA）
2. **Agent-Solutions**：Solutions 列表 + 4 个详情页（S1–S4）骨架与内容
3. **Agent-Services**：Services 套餐区间/锚点导航/结构化内容（desktop + mobile）
4. **Agent-Cases**：Case Studies 列表 + 详情页（动态路由）+ 数据结构
5. **Agent-Book-Contact**：预约咨询页（book）强化 + 联系页表单/文案一致性（desktop + mobile）
6. **Agent-I18n-Nav**：i18n（zh/en）补齐所有新增 key + 导航/TabBar/菜单文案一致性

---

## 2. 共同文件边界（参考）

### 2.1 现有关键文件
- 页面：`src/app/[locale]/(site)/**/page.tsx`
- 移动页：`src/app/[locale]/(site)/(mobile)/**/MobilePage.tsx`
- Desktop Shell：`src/components/site/v1/*` + `src/components/site/Header/*` + `src/components/site/Footer/*`
- Mobile Shell：`src/components/mobile/layout/MobileAppShell.tsx` + `src/components/mobile/nav/*`
- i18n：`src/i18n/messages/zh-CN.json`、`src/i18n/messages/en-US.json`
- 路由常量：`src/lib/routes.ts`

### 2.2 统一验收（所有 agent 完成后）
- `pnpm -s build` 通过
- 关键路由可访问（zh/en 各一遍）：
  - `/zh-CN/` `/en-US/`
  - `/zh-CN/solutions` `/en-US/solutions`
  - `/zh-CN/services` `/en-US/services`
  - `/zh-CN/case-studies` `/en-US/case-studies`
  - `/zh-CN/resources` `/en-US/resources`
  - `/zh-CN/about` `/en-US/about`
  - `/zh-CN/book` `/en-US/book`
  - `/zh-CN/contact` `/en-US/contact`

---

## 3. 每个 Agent 的任务说明（可直接复制给子 agent）

### 3.1 Agent-Home（仅改 Home 相关）
**Files (Modify/Create):**
- Modify: `src/app/[locale]/(site)/page.tsx`
- Modify: `src/app/[locale]/(site)/(mobile)/home/MobilePage.tsx`
- Modify/Create: `src/components/site/v1/*`（仅新增 Home 需要的 section 组件）
- Modify/Create: `src/components/site/v1/*.module.scss`（对应样式）

**Acceptance:**
- Desktop 首页包含：ProofStrip、Solutions 4 卡、Featured Cases 3 卡、Process 4 步、PricingPreview（区间）、InsightsPreview、FAQ、底部 CTA
- Mobile 首页：保留现有视觉，但加入 Solutions/CTA/入口更像 App，且不溢出

---

### 3.2 Agent-Solutions（Solutions 列表 + 4 详情页）
**Files:**
- Modify: `src/app/[locale]/(site)/solutions/page.tsx`
- Modify: `src/app/[locale]/(site)/(mobile)/solutions/MobilePage.tsx`
- Create: `src/app/[locale]/(site)/solutions/(detail)/s1/page.tsx`（或你选用的路由结构）
- Create: `.../s2/page.tsx` `.../s3/page.tsx` `.../s4/page.tsx`
- Create/Modify: `src/components/site/v1/DeliverablesTable.tsx` 等仅 Solutions 使用的组件

**Acceptance:**
- Solutions 列表页 4 卡分别链接到 S1–S4
- 每个详情页含：Hero、PainPoints、MethodSteps、DeliverablesTable、TimelineAndPricing、FAQ、CTA

---

### 3.3 Agent-Services（服务能力页）
**Files:**
- Modify: `src/app/[locale]/(site)/services/page.tsx`
- Modify: `src/app/[locale]/(site)/(mobile)/services/MobilePage.tsx`
- Create: `src/components/site/v1/PricingTierCard.tsx`（如需要）

**Acceptance:**
- Desktop：至少 4 类（Web/SEO&GEO/Design/AI）套餐区间展示，带锚点导航
- Mobile：可滚动阅读，套餐卡不挤压

---

### 3.4 Agent-Cases（案例列表 + 详情）
**Files:**
- Modify: `src/app/[locale]/(site)/case-studies/page.tsx`
- Modify: `src/app/[locale]/(site)/(mobile)/case-studies/MobilePage.tsx`
- Create: `src/app/[locale]/(site)/case-studies/[slug]/page.tsx`
- Create: `src/lib/caseStudies.ts`（数据结构/列表）

**Acceptance:**
- 列表页展示 6 个卡片（可先占位）
- 详情页至少 3 篇（slug：growth-landing、seo-geo、ai-mvp）可访问

---

### 3.5 Agent-Book-Contact（预约页 + 联系）
**Files:**
- Modify: `src/app/[locale]/(site)/book/page.tsx`
- Modify: `src/app/[locale]/(site)/(mobile)/book/MobilePage.tsx`
- Modify: `src/app/[locale]/(site)/contact/page.tsx`
- Modify/Create: `src/components/site/contact/*`（如需增强表单字段）

**Acceptance:**
- book 页具备：你将得到什么（4 卡）、表单/引导文案、FAQ、隐私说明入口
- contact 页：表单字段包含预算区间与目标（至少预算必填）

---

### 3.6 Agent-I18n-Nav（文案与导航一致性）
**Files:**
- Modify: `src/i18n/messages/zh-CN.json`
- Modify: `src/i18n/messages/en-US.json`
- Modify (if needed): `src/components/site/Header/DesktopHeader.tsx`、`src/components/mobile/nav/MobileTabBar.tsx`、`src/components/mobile/nav/MobileMenuDrawer.tsx`

**Acceptance:**
- 所有新增页面/section 的 key 在 zh/en 都有值（不出现 key 原样渲染）
- 导航项与 TabBar 文案统一：Home / Solutions / Services / Case Studies / Resources / About / Contact / Book(CTA)

