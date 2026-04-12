import fs from "node:fs/promises";
import path from "node:path";

import type { SupportedLocale } from "@/i18n/locales";
import { applyDesktopI18n, type DesktopPageKey } from "@/i18n/aiventDesktop";

type RewriteRule = { from: string; to: string };

const DESKTOP_REST_BY_PAGE: Record<DesktopPageKey, string> = {
  home: "",
  "index-slider": "/index-slider",
  "index-static-background": "/index-static-background",
  "index-slider-text": "/index-slider-text",
  "index-countdown": "/index-countdown",
  tickets: "/tickets",
  "tickets-2": "/tickets-2",
  news: "/news",
  "news-single": "/news-single",
  contact: "/contact",
};

const LOCALE_LABEL_KEY: Record<SupportedLocale, string> = {
  "zh-CN": "lang.zhCN",
  "en-US": "lang.enUS",
  "de-DE": "lang.deDE",
  "fr-FR": "lang.frFR",
  "ja-JP": "lang.jaJP",
  "ko-KR": "lang.koKR",
  "ru-RU": "lang.ruRU",
  "ar-SA": "lang.arSA",
};

const LINK_REWRITES: RewriteRule[] = [
  { from: 'href="index.html"', to: "" },
  { from: 'href="index-slider.html"', to: "/index-slider" },
  { from: 'href="index-static-background.html"', to: "/index-static-background" },
  { from: 'href="index-slider-text.html"', to: "/index-slider-text" },
  { from: 'href="index-countdown.html"', to: "/index-countdown" },
  { from: 'href="news.html"', to: "/news" },
  { from: 'href="news-single.html"', to: "/news-single" },
  { from: 'href="contact.html"', to: "/contact" },
  { from: 'href="tickets.html"', to: "/tickets" },
  { from: 'href="tickets-2.html"', to: "/tickets-2" },
];

function rewriteAssetPaths(html: string) {
  let out = html;

  // Simple attribute prefix rewrites.
  out = out.replace(/(src|href)=("|\')images\//g, `$1=$2/aivent/images/`);
  out = out.replace(/(src|href)=("|\')js\//g, `$1=$2/aivent/js/`);
  out = out.replace(/(src|href)=("|\')css\//g, `$1=$2/aivent/css/`);
  out = out.replace(/(src|poster)=("|\')video\//g, `$1=$2/aivent/video/`);

  // CSS-like url(...) occurrences (style attr, data-bgimage, inline CSS).
  out = out.replace(/url\((['"]?)images\//g, "url($1/aivent/images/");
  out = out.replace(/url\((['"]?)video\//g, "url($1/aivent/video/");

  // Jarallax / template convention: mp4:video/xxx.mp4
  out = out.replace(/data-video-src=("|\')mp4:video\//g, `data-video-src=$1mp4:/aivent/video/`);

  return out;
}

function rewriteLinks(html: string, locale: SupportedLocale) {
  const prefix = `/${locale}`;
  return LINK_REWRITES.reduce(
    (acc, r) => acc.replaceAll(r.from, `href="${prefix}${r.to}"`),
    html,
  );
}

function rewriteLogo(html: string) {
  // 原模板 header 与 footer 都使用 images/logo.webp。
  // 按需求：logo 使用 banli-ui 自带资源（/assets/images/logo.webp）。
  return html.replaceAll('src="/aivent/images/logo.webp"', 'src="/assets/images/logo.webp"');
}

function rewriteContactFormAction(html: string) {
  // 让 contact 表单提交走 Next 的 mock API，避免依赖 contact.php / email.php。
  // 覆盖常见的 action 值（演示站可能不同版本）。
  return html
    .replaceAll('action="contact.php"', 'action="/api/contact"')
    .replaceAll('action="email.php"', 'action="/api/contact"')
    .replaceAll('action="form.php"', 'action="/api/contact"')
    // 我们下载的版本里 action 是 "#"（同页提交），也需要替换。
    .replaceAll('action="#"', 'action="/api/contact"')
    .replaceAll("action='#'", 'action="/api/contact"')
    .replaceAll('action=""', 'action="/api/contact"');
}

function findMainmenuInsertIndex(html: string): number | null {
  const start = html.indexOf('<ul id="mainmenu">');
  if (start === -1) return null;

  let i = start;
  let depth = 0;
  while (i < html.length) {
    const nextOpen = html.indexOf("<ul", i);
    const nextClose = html.indexOf("</ul>", i);
    if (nextClose === -1) return null;

    if (nextOpen !== -1 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 3;
      continue;
    }

    depth -= 1;
    if (depth === 0) {
      return nextClose;
    }
    i = nextClose + 5;
  }
  return null;
}

function injectDesktopLanguageMenu(opts: {
  html: string;
  locale: SupportedLocale;
  pageKey: DesktopPageKey;
  t: (k: string) => string;
}) {
  // Avoid double injection.
  if (opts.html.includes('data-cn111="lang-menu"')) return opts.html;

  const insertAt = findMainmenuInsertIndex(opts.html);
  if (insertAt == null) return opts.html;

  const rest = DESKTOP_REST_BY_PAGE[opts.pageKey] ?? "";
  const label = opts.t(LOCALE_LABEL_KEY[opts.locale]);

  const items = (Object.keys(LOCALE_LABEL_KEY) as SupportedLocale[])
    .map((loc) => {
      const href = `/${loc}${rest}`;
      const active = loc === opts.locale ? " active" : "";
      return `<li><a class="menu-item${active}" href="${href}">${opts.t(LOCALE_LABEL_KEY[loc])}</a></li>`;
    })
    .join("");

  const menuHtml = `
<li data-cn111="lang-menu">
  <a class="menu-item" href="/${opts.locale}${rest}">${label}</a>
  <ul>
    ${items}
  </ul>
</li>
`.trim();

  return opts.html.slice(0, insertAt) + menuHtml + opts.html.slice(insertAt);
}

/**
 * Read legacy template HTML from /public/aivent and extract body content (without <script> tags):
 * - Keep wrapper + footer (footer sits outside wrapper in this template)
 * - Stop before legacy script tags
 * - Rewrite asset paths to /aivent/...
 * - Rewrite in-site links (.html -> Next routes)
 * - Rewrite logo src to banli-ui logo path
 */
export async function getAiventTemplateBodyHtml(opts: {
  templateFileName: string;
  locale: SupportedLocale;
  pageKey: DesktopPageKey;
  t: (k: string) => string;
}) {
  const filePath = path.join(process.cwd(), "public", "aivent", opts.templateFileName);
  const raw = await fs.readFile(filePath, "utf8");

  const wrapperStart = raw.indexOf('<div id="wrapper">');
  if (wrapperStart === -1) {
    throw new Error(
      `Template "${opts.templateFileName}" missing <div id="wrapper">`,
    );
  }

  // Scripts begin after this marker in all template pages we downloaded.
  const scriptsMarker = raw.indexOf("<!-- Javascript Files");
  const bodyEndMarker = raw.indexOf("</body>");
  const sliceEnd =
    scriptsMarker !== -1
      ? scriptsMarker
      : bodyEndMarker !== -1
        ? bodyEndMarker
        : raw.length;

  let html = raw.slice(wrapperStart, sliceEnd).trim();

  html = rewriteAssetPaths(html);
  html = rewriteLinks(html, opts.locale);
  html = rewriteLogo(html);
  if (opts.templateFileName === "contact.html") {
    html = rewriteContactFormAction(html);
  }
  html = applyDesktopI18n({
    html,
    page: opts.pageKey,
    t: opts.t,
    locale: opts.locale,
  });

  // 桌面端（模板）语言入口：放入顶栏导航，样式与 Pages 同款下拉
  html = injectDesktopLanguageMenu({
    html,
    locale: opts.locale,
    pageKey: opts.pageKey,
    t: opts.t,
  });
  return html;
}

/**
 * Baseline HTML for visual diff:
 * - Same as template page, but:
 *   - DOES NOT rewrite links (keeps .html)
 *   - DOES NOT replace logo (keeps template logo)
 * - Still rewrites asset paths to /aivent/... so it can be served under any route.
 */
export async function getAiventTemplateBaselineBodyHtml(templateFileName: string) {
  const filePath = path.join(process.cwd(), "public", "aivent", templateFileName);
  const raw = await fs.readFile(filePath, "utf8");

  const wrapperStart = raw.indexOf('<div id="wrapper">');
  if (wrapperStart === -1) {
    throw new Error(`Template "${templateFileName}" missing <div id="wrapper">`);
  }

  const scriptsMarker = raw.indexOf("<!-- Javascript Files");
  const bodyEndMarker = raw.indexOf("</body>");
  const sliceEnd =
    scriptsMarker !== -1
      ? scriptsMarker
      : bodyEndMarker !== -1
        ? bodyEndMarker
        : raw.length;

  let html = raw.slice(wrapperStart, sliceEnd).trim();
  html = rewriteAssetPaths(html);
  // baseline 保留原链接与 logo
  return html;
}
