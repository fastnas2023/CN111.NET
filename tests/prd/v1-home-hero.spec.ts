import { test, expect } from "@playwright/test";

test("home includes hero CTAs (SSR)", async ({ request }) => {
  const res = await request.get("/zh-CN/");
  expect(res.ok()).toBeTruthy();
  const html = await res.text();
  expect(html).toContain("/zh-CN/book");
  expect(html).toContain("/zh-CN/case-studies");
});

