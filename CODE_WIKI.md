# CN111.NET Code Wiki

本文档旨在全面介绍 `cn111-website` 项目的代码架构、核心模块职责、关键类与函数说明、依赖关系以及项目的运行和测试方式。本项目是一个基于 **Next.js App Router** 构建的营销落地页网站。

## 项目整体架构

项目采用了**混合渲染策略 (Hybrid Rendering Strategy)**，在同一路由下同时提供桌面端和移动端体验：

1. **桌面端 (Desktop)**：复用遗留的 Aivent 静态 HTML 模板。桌面端并不使用纯 React 组件从头构建，而是在服务端读取 `public/aivent` 下的 HTML 文件，经过路径重写后，将其作为内容注入到 Next.js 页面中。
2. **移动端 (Mobile)**：由于原模板在移动端表现不佳，项目使用 React 19 和本地内部组件库 `banli-ui` 从头重写了移动端界面。
3. **路由与设备检测**：利用 `ResponsiveRoute` 组件在服务端通过读取 `viewMode` Cookie 和请求头中的 `User-Agent`，动态决定下发桌面端 HTML 还是渲染移动端 React 组件。iPad 和桌面浏览器会命中桌面端逻辑，而手机端 UA 会命中移动端逻辑。

---

## 主要模块职责

### 目录结构概览

- **`src/app/(site)/`**：应用的主路由组，包含了所有的前端页面路由。
- **`src/app/(site)/(mobile)/`**：移动端专用的 React 页面组件存放目录（例如 `MobilePage.tsx`）。
- **`src/app/(site)/_routing/`**：响应式路由核心逻辑，包含设备检测和模板外壳组件。
- **`src/app/api/`**：包含 Next.js Route Handlers。如 `contact`（表单提交 Mock）和 `view-mode`（切换视图模式）。
- **`src/components/mobile/`**：移动端专用的公共组件（如布局、导航、抽屉菜单等）。
- **`src/components/site/`**：站点级别或桌面端/公共区域的 React 组件。
- **`src/lib/`**：核心工具函数。包含设备判断逻辑 (`device.ts`)、原模板解析重写逻辑 (`aiventTemplate.ts`) 等。
- **`vendor/banli-ui/`**：本地内部组件库，基于 Radix UI 和 Tailwind CSS 封装，提供了基础 UI 积木，在移动端重构中被大量使用。
- **`public/aivent/`**：存放原版的 Aivent 静态模板文件（HTML/CSS/JS/Images/Video）。
- **`tests/visual/`**：Playwright 视觉回归测试目录，用于对比重构版本与原版模板的像素级差异。

---

## 关键类与函数说明

### 路由与设备检测层

- **`ResponsiveRoute`** ([src/app/(site)/_routing/ResponsiveRoute.tsx](file:///Users/zhangjianhua/CN111.local/src/app/(site)/_routing/ResponsiveRoute.tsx))
  **职责**：Server Component，根据 Cookie 和 UA 解析出当前的视图模式（`desktop` 或 `mobile`），并返回传入的 `desktop` 或 `mobile` React 节点。
- **`DesktopTemplateShell`** ([src/app/(site)/_routing/DesktopTemplateShell.tsx](file:///Users/zhangjianhua/CN111.local/src/app/(site)/_routing/DesktopTemplateShell.tsx))
  **职责**：桌面端专用外壳组件。负责注入 Aivent 模板所需的特定 `<body class="...">` 和模板底部的 Script 标签，以确保原模板的 JS 正常运行。
- **`resolveViewMode`** ([src/lib/device.ts](file:///Users/zhangjianhua/CN111.local/src/lib/device.ts))
  **职责**：核心设备判断逻辑。支持 `auto`, `mobile`, `desktop` 三种模式。在 `auto` 模式下，会判断 `User-Agent`（注意：代码中明确排除了 iPad，使其走桌面端逻辑）。

### 桌面端模板处理层

- **`getAiventTemplateBodyHtml`** ([src/lib/aiventTemplate.ts](file:///Users/zhangjianhua/CN111.local/src/lib/aiventTemplate.ts))
  **职责**：在构建或请求时读取 `public/aivent` 下的原始 HTML 文件，提取出 `<body>` 中的主要内容，并执行正则表达式替换：
  - 将相对路径（`images/`, `css/` 等）重写为 `/aivent/images/`。
  - 拦截站内 `.html` 链接并替换为 Next.js 的无后缀路由。
  - 将表单 `action` 重写为走 `/api/contact` 的 Next.js 接口。
  - 替换 Logo 路径为内部 UI 库资源。

### 移动端页面层

- **`MobileHomePage`** (例如 [src/app/(site)/(mobile)/home/MobilePage.tsx](file:///Users/zhangjianhua/CN111.local/src/app/(site)/(mobile)/home/MobilePage.tsx))
  **职责**：移动端首页的具体实现。不使用任何旧版 HTML，完全基于 `banli-ui` 和 SCSS Modules (如 `MobileLanding.module.scss`) 构建，实现轻量级、针对小屏优化的布局。

---

## 依赖关系

### 核心生产依赖 (Dependencies)
- **`next (16.2.3)`** & **`react (19.2.4)`**：前端核心框架。注意这是一个使用了较新版本（React 19 和 Next 16）的前沿堆栈。
- **`banli-ui`**：通过 `file:vendor/banli-ui` 引入的本地依赖，项目专属的内部 UI 组件库。
- **`framer-motion`**：用于移动端或 React 组件的复杂动画。
- **`swiper`** & **`react-fast-marquee`**：用于实现轮播图和跑马灯等交互效果。

### 开发与测试依赖 (DevDependencies)
- **`@playwright/test`**：端到端与视觉回归测试框架。
- **`pixelmatch`** & **`pngjs`**：用于视觉回归测试时，对页面截图进行像素级别的差异比对（diff）。
- **`sass`**：用于编译项目中的 `.module.scss` 文件。
- **`eslint`** & **`typescript`**：代码质量与类型检查工具。

---

## 项目运行方式

### 1. 安装依赖
由于包含本地 Workspace 依赖，请使用 `pnpm` 进行安装：
```bash
pnpm install
```

### 2. 开发模式
启动本地开发服务器，默认在 `3001` 端口运行（可通过参数修改）：
```bash
pnpm dev -p 3001
```
打开浏览器访问 [http://localhost:3001](http://localhost:3001) 预览。

### 3. 生产环境构建与运行
构建生产优化的代码并启动：
```bash
pnpm build
pnpm start -p 3001
```

### 4. 视觉对比测试 (QA)
项目内置了基于 Playwright 的自动化视觉对比测试脚本，用于验证 Next.js 移植版与原版 Aivent 模板的视觉一致性：
```bash
pnpm compare:visual
```
执行后，脚本将自动捕获各个视口尺寸下的页面截图并生成对比报告（报告路径通常在 `/workspace/compare/report.md`）。

---
_注：如需修改移动端组件库代码，请直接在 `vendor/banli-ui` 目录下进行修改并确保执行其构建脚本。_