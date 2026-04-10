import { test, expect, devices } from "@playwright/test";

/**
 * 回归：剩余移动端页面文案应接入 i18n，并且跳转链接应保留 /{locale} 前缀。
 *
 * 运行（复用现有 server）：
 *   PORT=3001 pnpm exec playwright test tests/i18n/mobile-remaining-pages.spec.ts
 */

// 使用 Chromium 设备配置，避免 webkit 依赖
test.use({ ...devices["Pixel 5"] });

test("en-US index-slider mobile content is translated and locale-aware", async ({
  context,
  page,
}) => {
  await context.addCookies([
    {
      name: "viewMode",
      value: "mobile",
      url: "http://127.0.0.1:3001/",
    },
  ]);

  await page.goto("http://127.0.0.1:3001/en-US/index-slider", {
    waitUntil: "domcontentloaded",
  });

  await expect(page.locator("h1")).toContainText("Index Slider · Mobile");

  // CTA buttons should keep locale prefix via <form action="/en-US/...">
  await expect(page.locator('form[action^="/en-US/"]')).toHaveCount(2);
  await expect(page.locator('form[action="/en-US/tickets"]')).toHaveCount(1);
  await expect(page.locator('form[action="/en-US/contact"]')).toHaveCount(1);
});
