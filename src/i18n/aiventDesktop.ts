import type { SupportedLocale } from "./locales";

export type DesktopPageKey =
  | "home"
  | "index-slider"
  | "index-static-background"
  | "index-slider-text"
  | "index-countdown"
  | "tickets"
  | "tickets-2"
  | "news"
  | "news-single"
  | "contact";

/**
 * 桌面端模板的 i18n 采用“精确可控替换”策略：
 * - 只替换已知且稳定的文案片段（from）
 * - 由页面级配置决定替换范围，避免误伤模板里的其它相同文本
 *
 * 后续按 QA / 截图补齐更多 from/key 对。
 */
export const DESKTOP_REPLACEMENTS: Record<
  DesktopPageKey,
  Array<{ from: string; key: string }>
> = {
  home: [
    { from: "Home", key: "nav.home" },
    { from: "Tickets", key: "nav.tickets" },
    { from: "News", key: "nav.news" },
    { from: "Contact", key: "nav.contact" },
  ],
  "index-slider": [{ from: "Home", key: "nav.home" }],
  "index-static-background": [{ from: "Home", key: "nav.home" }],
  "index-slider-text": [{ from: "Home", key: "nav.home" }],
  "index-countdown": [{ from: "Home", key: "nav.home" }],
  tickets: [{ from: "Tickets", key: "nav.tickets" }],
  "tickets-2": [{ from: "Tickets", key: "nav.tickets2" }],
  news: [{ from: "News", key: "nav.news" }],
  "news-single": [{ from: "News", key: "nav.newsSingle" }],
  contact: [{ from: "Contact", key: "nav.contact" }],
};

export function applyDesktopI18n(opts: {
  html: string;
  page: DesktopPageKey;
  t: (k: string) => string;
  locale: SupportedLocale;
}) {
  let out = opts.html;
  for (const r of DESKTOP_REPLACEMENTS[opts.page] ?? []) {
    out = out.replaceAll(r.from, opts.t(r.key));
  }
  return out;
}

