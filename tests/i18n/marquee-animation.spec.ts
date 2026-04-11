import { test, expect } from "@playwright/test";

/**
 * 回归：桌面端 marquee（de-marquee-list-1/2）应正确初始化并启用 CSS 动画。
 */

test("desktop marquee is animated (zh-CN)", async ({ page }) => {
  await page.goto("http://127.0.0.1:3001/zh-CN/", { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("load");

  const wrapper = page.locator(".de-marquee-list-1 .js-marquee-wrapper");
  await expect(wrapper).toHaveCount(1);

  const animName = await wrapper.evaluate((el) => getComputedStyle(el).animationName);
  expect(animName).not.toBe("none");
});

