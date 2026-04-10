import { chromium } from "@playwright/test";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3001";

async function checkSwiper() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${baseUrl}/index-slider`, { waitUntil: "load", timeout: 60_000 });
  await page.waitForTimeout(2000);

  const initial = await page.evaluate(() => {
    const el = document.querySelector(".swiper");
    const inst = el && el.swiper ? el.swiper : null;
    const frac = document.querySelector(".swiper-pagination")?.textContent?.trim() ?? null;
    const bg = document.querySelector(".swiper-slide-active")?.getAttribute("data-bgimage") ?? null;
    return {
      hasSwiperGlobal: typeof (window).Swiper !== "undefined",
      hasInstance: !!inst,
      activeIndex: inst?.activeIndex ?? null,
      realIndex: inst?.realIndex ?? null,
      fraction: frac,
      activeBg: bg,
    };
  });

  await page.waitForTimeout(4500);

  const later = await page.evaluate(() => {
    const el = document.querySelector(".swiper");
    const inst = el && el.swiper ? el.swiper : null;
    const frac = document.querySelector(".swiper-pagination")?.textContent?.trim() ?? null;
    const bg = document.querySelector(".swiper-slide-active")?.getAttribute("data-bgimage") ?? null;
    return {
      hasInstance: !!inst,
      activeIndex: inst?.activeIndex ?? null,
      realIndex: inst?.realIndex ?? null,
      fraction: frac,
      activeBg: bg,
    };
  });

  await browser.close();
  return { initial, later };
}

async function checkCountdown() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${baseUrl}/index-countdown`, { waitUntil: "load", timeout: 60_000 });
  await page.waitForTimeout(1500);

  const t0 = await page.evaluate(
    () => document.querySelector("#defaultCountdown")?.textContent?.trim() ?? null,
  );
  await page.waitForTimeout(3000);
  const t1 = await page.evaluate(
    () => document.querySelector("#defaultCountdown")?.textContent?.trim() ?? null,
  );
  await browser.close();
  return { t0, t1 };
}

const res = {
  baseUrl,
  swiper: await checkSwiper(),
  countdown: await checkCountdown(),
};

console.log(JSON.stringify(res, null, 2));

