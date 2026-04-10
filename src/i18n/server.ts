import "server-only";

import { DEFAULT_LOCALE, type SupportedLocale } from "./locales";

export type Messages = Record<string, string>;

export async function getMessages(locale: SupportedLocale): Promise<Messages> {
  // 长期方案：优先使用目标语言；缺失 key 时回退到英文，再回退到中文
  // （避免出现 UI 上展示 key 的情况）
  const zh = (await import(`./messages/${DEFAULT_LOCALE}.json`)).default as Messages;
  if (locale === DEFAULT_LOCALE) return zh;

  const en = (await import(`./messages/en-US.json`)).default as Messages;
  const loc = (await import(`./messages/${locale}.json`)).default as Messages;
  return { ...zh, ...en, ...loc };
}

export function createT(messages: Messages) {
  return (key: string, vars?: Record<string, string | number>) => {
    const raw = messages[key] ?? key;
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
      raw,
    );
  };
}
