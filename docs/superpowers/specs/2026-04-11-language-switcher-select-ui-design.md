# 语言栏美化（banli-ui Select）设计说明

## 目标

将当前语言切换栏从“多语言链接列表”升级为 **banli-ui 的 Select 下拉**，提升美观与可用性（尤其是语言数量较多时）。

## 交互与展示

### 桌面端（右上角浮层）

- 位置不变：仍在页面右上角固定浮层
- 展示方式：仅显示 **当前语言**（例如：`中文 ▾`、`English ▾`）
- 点击触发：展开下拉列表，选择后切换语言
- 切换规则：保持当前路径不变，仅切换 locale 前缀
  - `/{currentLocale}/{rest}` → `/{nextLocale}/{rest}`
  - 若当前路径不含 locale 前缀（理论上不会发生），则按 `/{nextLocale}` 处理

### 移动端（抽屉菜单底部）

- 保持现有“语言”区块位置
- 使用全宽 Select（更适合触控）

## 技术实现（仅 UI 变更，不改路由与 i18n 逻辑）

### 现状

- `src/components/i18n/LanguageSwitcher.tsx`：以 `<Link>` 列表渲染语言项
- `src/i18n/locales.ts`：提供 `SUPPORTED_LOCALES`
- `src/i18n/paths.ts`：提供 `stripLocale()`
- `src/i18n/messages/*`：提供 `lang.*` 的多语言 label

### 改造点

1. `LanguageSwitcher` 改为 client 组件内使用 `banli-ui` 的 `Select`：
   - `options`：由 `SUPPORTED_LOCALES` 生成，label 使用 `t(lang.xx)`
   - `value`：当前 `locale`
   - `onChange(nextLocale)`：通过 `next/navigation` 的 `useRouter().push(href)` 完成跳转

2. CSS 微调：
   - 桌面浮层容器保留（半透明背景），但内部不再需要多语言 link 的 flex wrap
   - 为 Select trigger 设置更紧凑的宽度（例如 `min-width: 140px`）和更符合 overlay 的视觉（可通过 className）

## 验收标准

- 桌面端右上角显示一个 Select，默认显示当前语言；点击展开可选择其它语言
- 移动端抽屉底部显示 Select，能正常切换语言
- 切换后 URL 始终保留 `/{locale}` 前缀，且页面路径保持一致（例如 `/en-US/index-slider` → `/zh-CN/index-slider`）

