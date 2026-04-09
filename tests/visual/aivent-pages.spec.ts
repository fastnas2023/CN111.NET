import { test } from "@playwright/test";

/**
 * 视觉“冒烟”用例：为关键路由生成截图到 test-results（不做基线对比，避免提交大文件）。
 *
 * 运行方式：
 *  - pnpm exec playwright test
 *  - 或先启动站点后：PLAYWRIGHT_BASE_URL=http://127.0.0.1:3000 pnpm exec playwright test
 */

const pages = [
  { name: "home", path: "/" },
  { name: "index-slider", path: "/index-slider" },
  { name: "index-static-background", path: "/index-static-background" },
  { name: "index-slider-text", path: "/index-slider-text" },
  { name: "index-countdown", path: "/index-countdown" },
  { name: "tickets", path: "/tickets" },
  { name: "tickets-2", path: "/tickets-2" },
  { name: "news", path: "/news" },
  { name: "news-single", path: "/news-single" },
  { name: "contact", path: "/contact" },
] as const;

test.describe("visual smoke: aivent pages", () => {
  for (const p of pages) {
    test(`screenshot: ${p.name}`, async ({ page }, testInfo) => {
      await page.goto(p.path, { waitUntil: "domcontentloaded" });
      await page.waitForLoadState("networkidle");
      // 让首屏动画/图片有一点缓冲时间，减少空白截图概率
      await page.waitForTimeout(300);

      const screenshotPath = testInfo.outputPath(
        "visual",
        `${p.name.replaceAll("/", "_")}.png`,
      );

      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });
    });
  }
});
