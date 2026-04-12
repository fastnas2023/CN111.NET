import { test, expect, devices } from "@playwright/test";

test.use({ ...devices["Pixel 5"] });

test("mobile drawer shows language select at top", async ({ context, page }) => {
  const PORT = process.env.PORT ?? "3000";
  const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

  // 强制移动端渲染
  await context.addCookies([
    { name: "viewMode", value: "mobile", url: baseURL },
  ]);

  await page.goto(`${baseURL}/zh-CN/`, {
    waitUntil: "domcontentloaded",
  });

  await page.getByRole("button", { name: /menu|菜单/i }).click();

  const panel = page.locator("aside[aria-label]").first();

  // banli-ui SelectTrigger：button + aria-haspopup=listbox
  const langTrigger = panel.locator('button[aria-haspopup="listbox"]').first();
  await expect(langTrigger).toBeVisible();

  // 语言切换应位于导航列表之上（“大品牌”常见布局：设置条在顶部）
  const firstNav = panel.getByRole("link", { name: /首页|Home/i }).first();
  await expect(firstNav).toBeVisible();
  const a = await langTrigger.boundingBox();
  const b = await firstNav.boundingBox();
  expect(a && b).toBeTruthy();
  expect((a?.y ?? 0) < (b?.y ?? 0)).toBeTruthy();
});
