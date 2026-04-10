import "server-only";

import type { SupportedLocale } from "./locales";

export type Messages = Record<string, string>;

export async function getMessages(locale: SupportedLocale): Promise<Messages> {
  return (await import(`./messages/${locale}.json`)).default as Messages;
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

