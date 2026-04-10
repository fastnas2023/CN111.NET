# CN111.NET 多语言（i18n）设计方案（长期方案）

## 背景与目标

为 CN111.NET 官网加入多语言能力，支持：

- 路由前缀：所有语言都使用 `/{locale}/...`（统一、长期维护成本最低）
- 默认语言：访问 `/` **302 跳转**到 `/zh-CN`
- 语言集合（第一期）：`zh-CN`, `en-US`, `de-DE`, `fr-FR`, `ja-JP`, `ko-KR`, `ru-RU`, `ar-SA`
- 覆盖范围：**桌面模板 + 移动端**均需要翻译
- 说明：当前不上线阶段，不需要考虑 SEO 迁移成本与旧链接兼容

非目标（第一期不做或只做基础支持）：

- 不做浏览器语言自动跳转（可后续加）
- 阿拉伯语 RTL 仅保证文本正确，布局细节（方向性 icon、复杂栅格重排）可后续迭代

---

## 路由与目录结构

### URL 规范

- 统一入口：`/{locale}`（例如：`/en-US`, `/zh-CN`）
- 站点页面：`/{locale}/index-slider`、`/{locale}/tickets` 等与现有路由保持一致，仅加前缀
- 根路径：`/` → 302 → `/zh-CN`

### App Router 目录建议

- `src/app/page.tsx`：仅做 redirect 到 `/zh-CN`
- `src/app/[locale]/layout.tsx`：提供 i18n context、设置 `<html lang dir>`
- `src/app/[locale]/(site)/...`：站点页面（桌面/移动分流仍保留）
- `src/app/[locale]/api/...`：API 可保持不带 locale（推荐不加前缀），或按现状沿用不变

> 目标是：**只做一套页面实现**，通过路由参数 `locale` 驱动文案加载。

---

## i18n 数据模型与加载方式

### Locale 定义

新增 `src/i18n/locales.ts`：

- `SUPPORTED_LOCALES`：上述 8 个 locale
- `DEFAULT_LOCALE = "zh-CN"`
- helper：`isSupportedLocale()`, `normalizeLocale()`

### 文案资源组织

新增目录 `src/i18n/messages/`：

- `zh-CN.json`
- `en-US.json`
- `de-DE.json`
- `fr-FR.json`
- `ja-JP.json`
- `ko-KR.json`
- `ru-RU.json`
- `ar-SA.json`

约定：

- key 采用扁平或分层均可（推荐分层，如 `nav.home`, `footer.copyright`）
- 文案缺失时的策略：fallback 到 `zh-CN`，并在开发环境 console warn（避免上线 silent wrong）

### 运行时 API

新增 `src/i18n/index.ts`：

- `getMessages(locale)`：按 locale 读取 JSON（server side）
- `createT(messages)`：返回 `t(key, vars?)`（支持简单变量插值）
- `I18nProvider`：React context，移动端组件通过 hook 使用（`useT()`）

---

## 桌面端（Aivent 模板）翻译策略

当前桌面端来源是 `public/aivent/*.html`，通过服务端读取、rewrite 后注入页面。

### 推荐策略：可控替换（key 化）+ 页面级词条表

新增 `rewriteI18n(html, { locale, pageKey })`：

- 只对“明确可控”的静态文案做替换（导航、按钮、标题、表单 label、页脚等）
- 采用 **精确匹配**（避免误替换）
- 按页面维度维护词条（例如：`index-slider`, `tickets`, `news`…）

优点：

- 改动成本低，不需要把整套 HTML 转成 React
- 迭代方式清晰：发现遗漏 → 补充词条 → 回归截图对比

风险与缓解：

- 可能存在遗漏/变体文本：通过 QA/对比脚本补齐
- 复杂段落/富文本：第一期只覆盖核心文案，后续逐段抽取

---

## 移动端翻译策略（banli-ui 重写部分）

移动端组件全部使用 `t()`：

- 导航、按钮、提示、表单、空状态文案等均从 messages 读取
- 保持 key 一致性（避免桌面/移动重复造轮子）

---

## 语言切换（Language Switch）

第一期提供最小可用版本：

- 桌面端：header 区域增加语言切换（下拉/菜单均可）
- 移动端：在 Drawer 菜单增加语言选择

切换规则：

- 在“同一路径”下切换 locale：`/{fromLocale}/{rest}` → `/{toLocale}/{rest}`
- 若目标 locale 不存在：fallback 到 `/zh-CN`

---

## HTML 属性与 RTL

- `<html lang="{locale}">`
- `ar-SA`：`dir="rtl"`
- 第一阶段：保证文本正确；RTL 的布局细节问题按 issue 列表逐步修

---

## 测试与验收

### 验收标准（第一期）

1. `/` 访问后 302 到 `/zh-CN`
2. 8 个 locale 均可正常访问关键页面（home、index-slider、tickets、news、contact）
3. 桌面/移动端在不同语言下核心文案正确变化（导航/按钮/页脚/表单）
4. `ar-SA` 页面渲染无白屏，`dir=rtl` 生效

### 自动化建议

- 复用现有 Playwright：新增“按 locale 扫描关键路由”的 smoke（console errors / 404 资源）
- 可选：对比同页面不同语言下的截图（不做像素一致，只做加载成功 + 关键元素存在）

---

## 迁移与实施顺序（高层）

1. 建立 i18n 基础设施（locales/messages/provider）
2. 引入 `/{locale}` 路由结构 + `/` 重定向
3. 移动端全面接入 `t()`
4. 桌面模板接入 `rewriteI18n()`，先覆盖导航/页脚/按钮等核心文案
5. 增加语言切换 UI
6. QA 回归 + 补齐遗漏词条

