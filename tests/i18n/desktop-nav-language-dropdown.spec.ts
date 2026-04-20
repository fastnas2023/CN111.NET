import { test, expect } from "@playwright/test";

test("desktop nav contains injected language dropdown (SSR)", async ({
  request,
}) => {
  const res = await request.get("/zh-CN/");
  expect(res.ok()).toBeTruthy();
  const html = await res.text();

  // 当前站点桌面端使用 React Header（非模板 #mainmenu 注入）。
  // 这里做一个轻量 SSR 断言：品牌与主 CTA 出现在首屏 HTML 中。
  expect(html).toContain("CN111 Studio");
  expect(html).toContain("预约咨询");

  // 桌面端应存在语言切换入口
  expect(html).toContain("cn111-lang-switcher--desktop");
});
