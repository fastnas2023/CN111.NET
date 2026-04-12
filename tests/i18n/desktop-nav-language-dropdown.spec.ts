import { test, expect } from "@playwright/test";

test("desktop nav contains injected language dropdown (SSR)", async ({
  request,
}) => {
  const res = await request.get("/zh-CN/");
  expect(res.ok()).toBeTruthy();
  const html = await res.text();

  // 语言菜单 marker（插入到 #mainmenu 内）
  expect(html).toContain('data-cn111="lang-menu"');

  // 旧的浮层语言栏不应再出现在桌面 HTML
  expect(html).not.toContain("cn111-lang-switcher--desktop");
});

