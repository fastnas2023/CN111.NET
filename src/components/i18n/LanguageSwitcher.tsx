"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValue,
} from "banli-ui";

import { SUPPORTED_LOCALES, type SupportedLocale } from "@/i18n/locales";
import { useI18n } from "@/i18n/client";
import { stripLocale } from "@/i18n/paths";

const LABEL_KEY: Record<SupportedLocale, string> = {
  "zh-CN": "lang.zhCN",
  "en-US": "lang.enUS",
  "de-DE": "lang.deDE",
  "fr-FR": "lang.frFR",
  "ja-JP": "lang.jaJP",
  "ko-KR": "lang.koKR",
  "ru-RU": "lang.ruRU",
  "ar-SA": "lang.arSA",
};

export function LanguageSwitcher({
  variant,
  onNavigate,
}: {
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const { locale, t } = useI18n();
  const rest = stripLocale(pathname);

  const className =
    variant === "desktop"
      ? "cn111-lang-switcher cn111-lang-switcher--desktop"
      : "cn111-lang-switcher cn111-lang-switcher--mobile";

  const onValueChange = React.useCallback(
    (nextLocale: string) => {
      // Select 组件 value 类型是 string，这里做一次 runtime 校验
      if (!SUPPORTED_LOCALES.includes(nextLocale as SupportedLocale)) return;
      if (nextLocale === locale) return;
      const href = `/${nextLocale}${rest === "/" ? "" : rest}`;
      router.push(href);
      onNavigate?.();
    },
    [locale, onNavigate, rest, router],
  );

  const triggerStyle: React.CSSProperties =
    variant === "desktop"
      ? { minWidth: 140 }
      : { width: "100%", minWidth: 0 };

  return (
    <div className={className} aria-label={t("lang.label")}>
      <SelectRoot value={locale} onValueChange={onValueChange} className="w-full">
        <SelectTrigger aria-label={t("lang.label")} style={triggerStyle}>
          <SelectValue />
          <span aria-hidden="true" className="text-white/60">
            ▾
          </span>
        </SelectTrigger>
        <SelectContent aria-label={t("lang.label")}>
          {SUPPORTED_LOCALES.map((loc) => (
            <SelectItem key={loc} value={loc}>
              {t(LABEL_KEY[loc])}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </div>
  );
}
