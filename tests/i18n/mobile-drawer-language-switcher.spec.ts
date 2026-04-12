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

  // banli-ui SelectTrigger：button + aria-haspopup=listbox
  const langTrigger = page.locator('button[aria-haspopup="listbox"]').first();
  await expect(langTrigger).toBeVisible();
});
