import { test, expect } from "@playwright/test";

const PATHS = [
  "/zh-CN/",
  "/zh-CN/solutions",
  "/zh-CN/services",
  "/zh-CN/case-studies",
  "/zh-CN/resources",
  "/zh-CN/about",
  "/zh-CN/book",
  "/zh-CN/contact",
];

test("PRD V1 corporate routes respond 200", async ({ request }) => {
  for (const p of PATHS) {
    const res = await request.get(p);
    expect(res.ok(), `expected ${p} to be OK`).toBeTruthy();
  }
});

test("Home SSR contains corporate nav entries", async ({ request }) => {
  const res = await request.get("/zh-CN/");
  expect(res.ok()).toBeTruthy();
  const html = await res.text();

  expect(html).toContain("/zh-CN/solutions");
  expect(html).toContain("/zh-CN/services");
  expect(html).toContain("/zh-CN/contact");
  expect(html).toContain("预约咨询");
});

