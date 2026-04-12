import { test, expect } from "@playwright/test";

test("SSR HTML includes dark-scheme body class (avoid white flash)", async ({
  request,
}) => {
  const res = await request.get("/zh-CN/");
  expect(res.ok()).toBeTruthy();
  const html = await res.text();

  // 关键：首次 HTML 就应该带上 dark-scheme，避免 marquee 背后“露白”
  expect(html).toMatch(/<body[^>]*class=(["'])[^"']*dark-scheme[^"']*\1/i);
});

