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

## 部署（宝塔面板）

推荐使用：**PM2（Node 项目）+ Nginx 反向代理**。

1) 宝塔安装：Nginx、Node.js（建议 20+）、PM2 管理器  
2) 拉代码并构建：

```bash
cd /www/wwwroot/cn111.net
git clone https://github.com/fastnas2023/CN111.NET.git .
npm i -g pnpm
pnpm install
pnpm build
```

3) 用 PM2 启动（仅监听本机）：

```bash
pnpm start -p 3001 -H 127.0.0.1
```

4) Nginx 反代到 `http://127.0.0.1:3001`，然后在宝塔里配置 HTTPS（Let's Encrypt）

## 可选：可视化对比 / QA

- 桌面对比（模板 vs clone）：`pnpm compare:visual`
- QA 自动化：`tests/qa/*`
