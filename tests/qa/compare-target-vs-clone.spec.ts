import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

type ViewportSpec = { label: string; width: number; height: number };
type PageSpec = { name: string; clonePath: string; originalPath: string };

/**
 * 对比「目标网页（原始模板 HTML）」vs「当前 clone（Next）」并生成像素 diff 报告：
 * - 原始模板：由 `python -m http.server` 在 3010 端口提供（/public/aivent 目录）
 * - clone：Next start 在 3001 端口提供
 *
 * 输出目录：
 *   /workspace/qa/compare
 *
 * 运行：
 *   ORIGINAL_BASE_URL=http://127.0.0.1:3010 \
 *   CLONE_BASE_URL=http://127.0.0.1:3001 \
 *   COMPARE_OUTPUT_DIR=/workspace/qa/compare \
 *   pnpm exec playwright test tests/qa/compare-target-vs-clone.spec.ts
 */

const OUTPUT_ROOT = process.env.COMPARE_OUTPUT_DIR ?? "/workspace/qa/compare";
const ORIGINAL_BASE_URL = process.env.ORIGINAL_BASE_URL ?? "http://127.0.0.1:3010";
const CLONE_BASE_URL = process.env.CLONE_BASE_URL ?? "http://127.0.0.1:3001";

const viewports: ViewportSpec[] = [
  { label: "1440x900", width: 1440, height: 900 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "390x844", width: 390, height: 844 },
];

const pages: PageSpec[] = [
  { name: "home", clonePath: "/", originalPath: "/index.html" },
  { name: "index-slider", clonePath: "/index-slider", originalPath: "/index-slider.html" },
  {
    name: "index-static-background",
    clonePath: "/index-static-background",
    originalPath: "/index-static-background.html",
  },
  {
    name: "index-slider-text",
    clonePath: "/index-slider-text",
    originalPath: "/index-slider-text.html",
  },
  {
    name: "index-countdown",
    clonePath: "/index-countdown",
    originalPath: "/index-countdown.html",
  },
  { name: "tickets", clonePath: "/tickets", originalPath: "/tickets.html" },
  { name: "tickets-2", clonePath: "/tickets-2", originalPath: "/tickets-2.html" },
  { name: "news", clonePath: "/news", originalPath: "/news.html" },
  { name: "news-single", clonePath: "/news-single", originalPath: "/news-single.html" },
  { name: "contact", clonePath: "/contact", originalPath: "/contact.html" },
];

function toAbsUrl(base: string, p: string) {
  return new URL(p, base.endsWith("/") ? base : `${base}/`).toString();
}

async function ensureDir(dirPath: string) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

async function captureScreenshot(opts: {
  page: import("@playwright/test").Page;
  url: string;
  outPath: string;
  forceDesktopCookie?: boolean;
}) {
  const { page, url, outPath, forceDesktopCookie } = opts;

  if (forceDesktopCookie) {
    const u = new URL(url);
    await page.context().addCookies([
      {
        name: "viewMode",
        value: "desktop",
        url: `${u.protocol}//${u.host}/`,
      },
    ]);
  }

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);

  // 尽量减少动画/过渡导致的抖动
  await page.addStyleTag({
    content: `
      *,
      *::before,
      *::after {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
        scroll-behavior: auto !important;
        caret-color: transparent !important;
      }
    `,
  });

  await page.waitForTimeout(800);
  await page.screenshot({ path: outPath, fullPage: false });
}

function readPng(filePath: string) {
  const buf = fs.readFileSync(filePath);
  return PNG.sync.read(buf);
}

function writePng(filePath: string, png: PNG) {
  fs.writeFileSync(filePath, PNG.sync.write(png));
}

test.describe("Target vs Clone visual compare", () => {
  test("generate diff report", async ({ browser }) => {
    test.setTimeout(10 * 60_000);
    await ensureDir(OUTPUT_ROOT);
    await ensureDir(path.join(OUTPUT_ROOT, "screenshots"));
    await ensureDir(path.join(OUTPUT_ROOT, "diffs"));

    const lines: string[] = [];
    lines.push(`# 目标网页 vs Clone：像素对比报告`);
    lines.push("");
    lines.push(`- 目标网页（原始模板）：${ORIGINAL_BASE_URL}`);
    lines.push(`- Clone（Next）：${CLONE_BASE_URL}`);
    lines.push(`- 输出目录：${OUTPUT_ROOT}`);
    lines.push("");

    for (const vp of viewports) {
      lines.push(`## Viewport: ${vp.label}`);
      lines.push("");

      for (const p of pages) {
        const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
        const page = await ctx.newPage();

        const originalUrl = toAbsUrl(ORIGINAL_BASE_URL, p.originalPath);
        const cloneUrl = toAbsUrl(CLONE_BASE_URL, p.clonePath);

        const originalShot = path.join(OUTPUT_ROOT, "screenshots", `${p.name}.${vp.label}.target.png`);
        const cloneShot = path.join(OUTPUT_ROOT, "screenshots", `${p.name}.${vp.label}.clone.png`);
        const diffShot = path.join(OUTPUT_ROOT, "diffs", `${p.name}.${vp.label}.diff.png`);

        await captureScreenshot({ page, url: originalUrl, outPath: originalShot });
        await captureScreenshot({ page, url: cloneUrl, outPath: cloneShot, forceDesktopCookie: true });

        const a = readPng(originalShot);
        const b = readPng(cloneShot);
        const width = Math.min(a.width, b.width);
        const height = Math.min(a.height, b.height);

        const diff = new PNG({ width, height });
        const diffPixels = pixelmatch(
          a.data,
          b.data,
          diff.data,
          width,
          height,
          { threshold: 0.12 },
        );
        writePng(diffShot, diff);

        const totalPixels = width * height;
        const diffPct = ((diffPixels / totalPixels) * 100).toFixed(2);

        lines.push(`### ${p.name} (diff: ${diffPct}%)`);
        lines.push("");
        lines.push(`| target | clone | diff |`);
        lines.push(`|---|---|---|`);
        lines.push(
          `| ![target](screenshots/${path.basename(originalShot)}) | ![clone](screenshots/${path.basename(cloneShot)}) | ![diff](diffs/${path.basename(diffShot)}) |`,
        );
        lines.push("");

        await ctx.close();
      }
    }

    lines.push("> 说明：diff 由 pixelmatch 生成，diff% = diffPixels / (width*height)。");
    await fs.promises.writeFile(path.join(OUTPUT_ROOT, "report.md"), lines.join("\n"), "utf8");
  });
});
