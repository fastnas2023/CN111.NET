# CN111.NET

[English](./README.md) | 中文

## 中文说明

这是一个基于 **Next.js App Router** 的官网项目，支持同路由的 **桌面/移动端双实现**：

- **桌面端**：沿用 Aivent 模板（位于 `public/aivent`，并由服务端注入所需 CSS/JS）
- **移动端**：使用 `banli-ui` 组件体系重写（位于 `src/app/(site)/(mobile)`）
- **分流机制**：
  - `viewMode` cookie 可强制：`desktop | mobile | auto`
  - `auto` 模式下：默认按 UA 判断（仅手机 UA 走移动端；iPad 走桌面端）
  - `POST /api/view-mode`：用于开发/调试时切换 `viewMode`

## 本地开发

```bash
pnpm install
pnpm dev -p 3001
```

打开：`http://localhost:3001`

## 构建与运行（生产模式）

```bash
pnpm build
pnpm start -p 3001
```

## 可选：可视化对比 / QA

- 桌面对比（模板 vs clone）：`pnpm compare:visual`
- QA 自动化：`tests/qa/*`

