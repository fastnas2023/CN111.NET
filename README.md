# CN111.NET

English | [中文](./README.zh-CN.md)

## Overview

CN111.NET is a marketing/landing website built with **Next.js App Router**, with **desktop + mobile implementations under the same routes**:

- **Desktop**: legacy Aivent template served from `public/aivent` (CSS/JS injected by the app).
- **Mobile**: rebuilt with the `banli-ui` component system under `src/app/(site)/(mobile)`.
- **Routing / mode selection**
  - `viewMode` cookie overrides: `desktop | mobile | auto`
  - In `auto` mode, we detect by **User-Agent** (phones → mobile, iPad → desktop)
  - `POST /api/view-mode` for local/dev switching

## Getting started

### Development

```bash
pnpm install
pnpm dev -p 3001
```

Open: http://localhost:3001

### Production build

```bash
pnpm build
pnpm start -p 3001
```

## Deployment (BaoTa / BT Panel)

Recommended setup: **PM2 (Node app) + Nginx reverse proxy**.

1) **Install** in BT Panel: Nginx, Node.js (20+), PM2 Manager
2) **Clone** and build:

```bash
cd /www/wwwroot/cn111.net
git clone https://github.com/fastnas2023/CN111.NET.git .
npm i -g pnpm
pnpm install
pnpm build
```

3) **Start** with PM2 (bind to localhost only):

```bash
pnpm start -p 3001 -H 127.0.0.1
```

4) **Nginx reverse proxy** to `http://127.0.0.1:3001` (then enable HTTPS in BT Panel)

## Optional: Visual compare / QA

- Desktop visual diff: `pnpm compare:visual`
- QA automation: `tests/qa/*`

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
