export const DEFAULT_LOCALE = "zh-CN" as const;

export const SUPPORTED_LOCALES = [
  "zh-CN",
  "en-US",
  "de-DE",
  "fr-FR",
  "ja-JP",
  "ko-KR",
  "ru-RU",
  "ar-SA",
] as const;

export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isSupportedLocale(v: string): v is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(v);
}

export function getHtmlDir(locale: SupportedLocale): "ltr" | "rtl" {
  return locale === "ar-SA" ? "rtl" : "ltr";
}

