import { test, devices, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const OUT_DIR = process.env.QA_OUT_DIR ?? "/workspace/qa";
const BASE_URL = process.env.CLONE_BASE_URL ?? "http://127.0.0.1:3001";

const ROUTES = [
  "/",
  "/index-slider",
  "/index-static-background",
  "/index-slider-text",
  "/index-countdown",
  "/tickets",
  "/tickets-2",
  "/news",
  "/news-single",
  "/contact",
];

type Mode = "desktop" | "mobile";

function absUrl(p: string) {
  return new URL(p, BASE_URL).toString();
}

async function ensureDirs() {
  await fs.mkdir(path.join(OUT_DIR, "screenshots"), { recursive: true });
}

test.describe("QA smoke audit (console/network/critical UI)", () => {
  test("scan key routes", async ({ browser }) => {
    await ensureDirs();

    const findings: Array<{
      mode: Mode;
      route: string;
      url: string;
      consoleErrors: string[];
      failedRequests: Array<{ url: string; status?: number; errorText?: string }>;
      screenshot: string;
    }> = [];

    for (const mode of ["desktop", "mobile"] as const) {
      const ctx = await browser.newContext(
        mode === "mobile"
          ? {
              ...devices["iPhone 14"],
              baseURL: BASE_URL,
            }
          : {
              viewport: { width: 1440, height: 900 },
              baseURL: BASE_URL,
            },
      );

      // 强制渲染模式（与线上一致：cookie 覆盖）
      await ctx.addCookies([
        {
          name: "viewMode",
          value: mode,
          url: absUrl("/"),
        },
      ]);

      for (const route of ROUTES) {
        const page = await ctx.newPage();
        const url = absUrl(route);

        const consoleErrors: string[] = [];
        const failedRequests: Array<{ url: string; status?: number; errorText?: string }> = [];

        page.on("console", (msg) => {
          if (msg.type() === "error") consoleErrors.push(msg.text());
        });

        page.on("response", async (resp) => {
          const status = resp.status();
          if (status >= 400) failedRequests.push({ url: resp.url(), status });
        });
        page.on("requestfailed", (req) => {
          failedRequests.push({ url: req.url(), errorText: req.failure()?.errorText });
        });

        await page.goto(url, { waitUntil: "domcontentloaded" });
        await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => undefined);
        await page.waitForTimeout(500);

        // 关键验收：桌面 index-slider 需要左右箭头存在且可见
        if (mode === "desktop" && route === "/index-slider") {
          await expect(page.locator(".swiper-button-prev")).toBeVisible();
          await expect(page.locator(".swiper-button-next")).toBeVisible();
        }

        const file = `qa-${mode}-${route === "/" ? "home" : route.slice(1)}.png`;
        const screenshotRel = `screenshots/${file}`;
        await page.screenshot({ path: path.join(OUT_DIR, screenshotRel), fullPage: false });

        findings.push({
          mode,
          route,
          url,
          consoleErrors,
          failedRequests,
          screenshot: screenshotRel,
        });

        await page.close();
      }

      await ctx.close();
    }

    // Write Markdown report
    const lines: string[] = [];
    lines.push(`# QA 测试报告（自动化 Smoke + 差异对比入口）`);
    lines.push("");
    lines.push(`- Clone: ${BASE_URL}`);
    lines.push(`- 目标网页（原始模板）: http://127.0.0.1:3010 (临时静态服务)`);
    lines.push("");
    lines.push(`## 快速结论`);
    lines.push("");

    const totalConsoleErrors = findings.reduce((n, f) => n + f.consoleErrors.length, 0);
    const totalFailedReq = findings.reduce((n, f) => n + f.failedRequests.length, 0);
    lines.push(`- Console errors（总计）: **${totalConsoleErrors}**`);
    lines.push(`- Failed requests（总计）: **${totalFailedReq}**`);
    lines.push("");
    lines.push(`## 明细（按页面）`);
    lines.push("");

    for (const f of findings) {
      lines.push(`### ${f.mode.toUpperCase()} ${f.route}`);
      lines.push(`- URL: ${f.url}`);
      lines.push(`- Screenshot: ![${f.mode} ${f.route}](${f.screenshot})`);
      lines.push(`- Console errors: ${f.consoleErrors.length}`);
      if (f.consoleErrors.length) {
        lines.push("```");
        lines.push(f.consoleErrors.slice(0, 10).join("\n"));
        if (f.consoleErrors.length > 10) lines.push(`... (${f.consoleErrors.length - 10} more)`);
        lines.push("```");
      }
      lines.push(`- Failed requests: ${f.failedRequests.length}`);
      if (f.failedRequests.length) {
        lines.push("```");
        lines.push(
          f.failedRequests
            .slice(0, 20)
            .map((r) => `${r.status ?? ""} ${r.errorText ?? ""} ${r.url}`.trim())
            .join("\n"),
        );
        if (f.failedRequests.length > 20) lines.push(`... (${f.failedRequests.length - 20} more)`);
        lines.push("```");
      }
      lines.push("");
    }

    lines.push(`## 像素级差异对比`);
    lines.push("");
    lines.push(`请查看：/workspace/qa/compare/report.md（由 compare-target-vs-clone.spec.ts 生成）`);
    lines.push("");

    await fs.writeFile(path.join(OUT_DIR, "report.md"), lines.join("\n"), "utf8");
  });
});

