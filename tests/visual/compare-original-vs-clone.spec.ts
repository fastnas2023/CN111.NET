import { test } from "@playwright/test";
import fs from "node:fs";
import path from "node:path";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

type ViewportSpec = {
  label: string;
  width: number;
  height: number;
};

type PageSpec = {
  name: string;
  clonePath: string;
  originalPath: string;
};

/**
 * 批量截图 + 像素级 diff（原站 vs 本地 clone），并生成 Markdown 报告到：
 *   /workspace/compare/report.md
 *
 * 运行：
 *   pnpm compare:visual
 *
 * 可选环境变量：
 *   - CLONE_BASE_URL=http://localhost:3000
 *   - ORIGINAL_BASE_URL=http://localhost:3000/__original  （默认）
 *   - COMPARE_OUTPUT_DIR=/workspace/compare
 */

const OUTPUT_ROOT = process.env.COMPARE_OUTPUT_DIR ?? "/workspace/compare";
const ORIGINAL_BASE_URL =
  process.env.ORIGINAL_BASE_URL ??
  "http://localhost:3000/__original";
const CLONE_BASE_URL = process.env.CLONE_BASE_URL ?? "http://localhost:3000";

const viewports: ViewportSpec[] = [
  { label: "1440x900", width: 1440, height: 900 },
  { label: "768x1024", width: 768, height: 1024 },
  { label: "390x844", width: 390, height: 844 },
];

// 10 个页面（与 /tests/visual/aivent-pages.spec.ts 保持一致）
const pages: PageSpec[] = [
  { name: "home", clonePath: "/", originalPath: "/" },
  {
    name: "index-slider",
    clonePath: "/index-slider",
    originalPath: "/index-slider",
  },
  {
    name: "index-static-background",
    clonePath: "/index-static-background",
    originalPath: "/index-static-background",
  },
  {
    name: "index-slider-text",
    clonePath: "/index-slider-text",
    originalPath: "/index-slider-text",
  },
  {
    name: "index-countdown",
    clonePath: "/index-countdown",
    originalPath: "/index-countdown",
  },
  { name: "tickets", clonePath: "/tickets", originalPath: "/tickets" },
  {
    name: "tickets-2",
    clonePath: "/tickets-2",
    originalPath: "/tickets-2",
  },
  { name: "news", clonePath: "/news", originalPath: "/news" },
  {
    name: "news-single",
    clonePath: "/news-single",
    originalPath: "/news-single",
  },
  { name: "contact", clonePath: "/contact", originalPath: "/contact" },
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
}) {
  const { page, url, outPath } = opts;

  await page.goto(url, { waitUntil: "domcontentloaded" });
  await page.evaluate(() => window.scrollTo(0, 0));

  // 某些页面可能存在持续请求/轮播，networkidle 可能超时；因此容错处理。
  await page
    .waitForLoadState("networkidle", { timeout: 15_000 })
    .catch(() => undefined);

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

  // 给图片/字体一点缓冲，降低空白截图概率
  await page.waitForTimeout(400);

  await ensureDir(path.dirname(outPath));
  // fullPage 截图在超长页面/复杂背景上容易触发 Chromium capture 失败；
  // 像素级对齐优先用固定视口截图（与三端断点一致）。
  await page.screenshot({ path: outPath, fullPage: false });
}

function readPng(filePath: string) {
  const buf = fs.readFileSync(filePath);
  return PNG.sync.read(buf);
}

function writePng(filePath: string, png: PNG) {
  const buf = PNG.sync.write(png);
  fs.writeFileSync(filePath, buf);
}

function padToSize(src: PNG, width: number, height: number) {
  const out = new PNG({ width, height });
  // 将原图拷贝到左上角；多余区域保持透明(0,0,0,0)
  // 注意：PNG.sync.read 返回的对象在部分版本中不包含 bitblt()，这里手动逐行拷贝。
  const rowBytes = src.width * 4;
  for (let y = 0; y < src.height; y += 1) {
    const srcStart = y * rowBytes;
    const outStart = y * width * 4;
    src.data.copy(out.data, outStart, srcStart, srcStart + rowBytes);
  }
  return out;
}

test.describe("visual compare: original vs clone", () => {
  // 该用例会写固定路径文件，避免并行
  test.describe.configure({ mode: "serial" });

  test("generate screenshots + diff + report", async ({ browser }) => {
    test.setTimeout(10 * 60_000);
    const results: Array<{
      page: PageSpec;
      viewport: ViewportSpec;
      originalPath: string;
      clonePath: string;
      diffPath: string;
      diffPixels: number;
      diffPercent: number;
    }> = [];

    await ensureDir(OUTPUT_ROOT);

    for (const vp of viewports) {
      const originalDir = path.join(OUTPUT_ROOT, "original", vp.label);
      const cloneDir = path.join(OUTPUT_ROOT, "clone", vp.label);
      const diffDir = path.join(OUTPUT_ROOT, "diff", vp.label);
      await Promise.all([
        ensureDir(originalDir),
        ensureDir(cloneDir),
        ensureDir(diffDir),
      ]);

      const originalContext = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });
      const cloneContext = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
      });

      const originalPage = await originalContext.newPage();
      const clonePage = await cloneContext.newPage();

      await Promise.all([
        originalPage.emulateMedia({ reducedMotion: "reduce" }),
        clonePage.emulateMedia({ reducedMotion: "reduce" }),
      ]);

      for (const p of pages) {
        const originalUrl = toAbsUrl(ORIGINAL_BASE_URL, p.originalPath);
        const cloneUrl = toAbsUrl(CLONE_BASE_URL, p.clonePath);

        const originalOut = path.join(originalDir, `${p.name}.png`);
        const cloneOut = path.join(cloneDir, `${p.name}.png`);
        const diffOut = path.join(diffDir, `${p.name}.png`);

        await captureScreenshot({
          page: originalPage,
          url: originalUrl,
          outPath: originalOut,
        });
        await captureScreenshot({
          page: clonePage,
          url: cloneUrl,
          outPath: cloneOut,
        });

        const originalPng = readPng(originalOut);
        const clonePng = readPng(cloneOut);

        const width = Math.max(originalPng.width, clonePng.width);
        const height = Math.max(originalPng.height, clonePng.height);

        const paddedOriginal = padToSize(originalPng, width, height);
        const paddedClone = padToSize(clonePng, width, height);
        const diffPng = new PNG({ width, height });

        const diffPixels = pixelmatch(
          paddedOriginal.data,
          paddedClone.data,
          diffPng.data,
          width,
          height,
          {
            threshold: 0.1,
            includeAA: true,
          },
        );

        writePng(diffOut, diffPng);

        const totalPixels = width * height;
        const diffPercent = totalPixels === 0 ? 0 : (diffPixels / totalPixels) * 100;

        results.push({
          page: p,
          viewport: vp,
          originalPath: originalOut,
          clonePath: cloneOut,
          diffPath: diffOut,
          diffPixels,
          diffPercent,
        });
      }

      await Promise.all([originalContext.close(), cloneContext.close()]);
    }

    // 生成 Markdown 报告
    const now = new Date().toISOString();
    const lines: string[] = [];
    lines.push("# Aivent 原站 vs 本地 Clone 视觉对比报告");
    lines.push("");
    lines.push(`- 生成时间：${now}`);
    lines.push(`- 原站：${ORIGINAL_BASE_URL}`);
    lines.push(`- Clone：${CLONE_BASE_URL}`);
    lines.push("");
    lines.push(
      "> 说明：diff 由 pixelmatch 生成，diff% 为 diffPixels / (width*height)。fullPage 截图高度不一致会体现在 diff 中。",
    );
    lines.push("");

    for (const vp of viewports) {
      lines.push(`## 视口 ${vp.label}`);
      lines.push("");
      lines.push("| 页面 | original | clone | diff | diffPixels | diff% |");
      lines.push("|---|---|---|---|---:|---:|");

      for (const p of pages) {
        const row = results.find(
          (r) => r.viewport.label === vp.label && r.page.name === p.name,
        );
        if (!row) continue;

        const relOriginal = path
          .relative(OUTPUT_ROOT, row.originalPath)
          .split(path.sep)
          .join("/");
        const relClone = path
          .relative(OUTPUT_ROOT, row.clonePath)
          .split(path.sep)
          .join("/");
        const relDiff = path
          .relative(OUTPUT_ROOT, row.diffPath)
          .split(path.sep)
          .join("/");

        lines.push(
          `| \`${p.name}\` <br/> ${p.clonePath} | [original](${relOriginal}) | [clone](${relClone}) | [diff](${relDiff}) | ${row.diffPixels} | ${row.diffPercent.toFixed(
            2,
          )}% |`,
        );
      }

      lines.push("");
    }

    const reportPath = path.join(OUTPUT_ROOT, "report.md");
    await fs.promises.writeFile(reportPath, lines.join("\n"), "utf8");
  });
});
