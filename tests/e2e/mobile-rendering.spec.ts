import { test, expect, devices } from "@playwright/test";

const MOBILE_UA = devices["iPhone 14"].userAgent;

function absUrl(baseURL: string | undefined, path: string) {
  if (!baseURL) throw new Error("Missing baseURL in Playwright config");
  return new URL(path, baseURL).toString();
}

test.describe("mobile rendering switch (UA + cookie)", () => {
  test("mobile UA renders mobile shell (no legacy wrapper)", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      userAgent: MOBILE_UA,
      viewport: { width: 390, height: 844 },
    });
    const page = await context.newPage();

    await page.goto(absUrl(baseURL, "/index-slider"), { waitUntil: "load" });
    await expect(page.locator('[data-mobile-shell="true"]')).toBeVisible();
    await expect(page.locator("#wrapper")).toHaveCount(0);

    await context.close();
  });

  test("cookie viewMode=mobile forces mobile shell on desktop UA", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      userAgent: devices["Desktop Chrome"].userAgent,
      viewport: { width: 1440, height: 900 },
    });

    await context.addCookies([
      {
        name: "viewMode",
        value: "mobile",
        url: absUrl(baseURL, "/"),
      },
    ]);

    const page = await context.newPage();
    await page.goto(absUrl(baseURL, "/index-slider"), { waitUntil: "load" });
    await expect(page.locator('[data-mobile-shell="true"]')).toBeVisible();

    await context.close();
  });

  test("cookie viewMode=desktop forces legacy wrapper on mobile UA", async ({
    browser,
    baseURL,
  }) => {
    const context = await browser.newContext({
      userAgent: MOBILE_UA,
      viewport: { width: 390, height: 844 },
    });

    await context.addCookies([
      {
        name: "viewMode",
        value: "desktop",
        url: absUrl(baseURL, "/"),
      },
    ]);

    const page = await context.newPage();
    await page.goto(absUrl(baseURL, "/index-slider"), { waitUntil: "load" });
    await expect(page.locator("#wrapper")).toBeVisible();

    await context.close();
  });
});
