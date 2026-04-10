import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3000";
const paths = [
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

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
];

function isLikelyErrorTitle(title) {
  const t = (title ?? "").toLowerCase();
  return (
    t.includes("service unavailable") ||
    t.includes("error") ||
    t.includes("not found") ||
    t === "404"
  );
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: 1,
    });

    const page = await context.newPage();
    const consoleErrors = [];
    const failedRequests = [];
    const badResponses = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("requestfailed", (req) => {
      failedRequests.push({
        url: req.url(),
        failure: req.failure()?.errorText ?? "unknown",
      });
    });
    page.on("response", (res) => {
      const status = res.status();
      if (status >= 400) {
        badResponses.push({
          status,
          url: res.url(),
        });
      }
    });

    for (const p of paths) {
      const url = new URL(p, baseUrl).toString();
      const started = Date.now();
      let ok = true;
      let title = "";
      let status = null;
      let error = null;

      try {
        const resp = await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 45_000,
        });
        status = resp?.status() ?? null;
        await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
        await page.waitForTimeout(250);
        title = await page.title();
        if (status && status >= 400) ok = false;
        if (isLikelyErrorTitle(title)) ok = false;
      } catch (e) {
        ok = false;
        error = String(e?.message ?? e);
      }

      results.push({
        viewport: vp.name,
        path: p,
        ok,
        status,
        title,
        ms: Date.now() - started,
        error,
      });
    }

    await context.close();

    results.push({
      viewport: vp.name,
      path: "__console_errors__",
      ok: consoleErrors.length === 0,
      status: null,
      title: `${consoleErrors.length} console errors`,
      ms: 0,
      error: consoleErrors.slice(0, 20).join("\n"),
    });
    results.push({
      viewport: vp.name,
      path: "__failed_requests__",
      ok: failedRequests.length === 0,
      status: null,
      title: `${failedRequests.length} failed requests`,
      ms: 0,
      error: failedRequests
        .slice(0, 20)
        .map((r) => `${r.failure} ${r.url}`)
        .join("\n"),
    });
    results.push({
      viewport: vp.name,
      path: "__bad_responses__",
      ok: badResponses.length === 0,
      status: null,
      title: `${badResponses.length} responses >= 400`,
      ms: 0,
      error: badResponses
        .slice(0, 20)
        .map((r) => `${r.status} ${r.url}`)
        .join("\n"),
    });
  }

  await browser.close();

  const failed = results.filter((r) => r.ok === false);
  const summary = {
    baseUrl,
    totalChecks: results.length,
    failedChecks: failed.length,
  };

  console.log(JSON.stringify({ summary, failed: failed.slice(0, 50) }, null, 2));
  process.exit(failed.length ? 2 : 0);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
