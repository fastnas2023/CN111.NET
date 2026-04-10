"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

export function LanguageSwitcher({ variant }: { variant: "desktop" | "mobile" }) {
  const pathname = usePathname() ?? "/";
  const { locale, t } = useI18n();
  const rest = stripLocale(pathname);

  const className =
    variant === "desktop"
      ? "cn111-lang-switcher cn111-lang-switcher--desktop"
      : "cn111-lang-switcher cn111-lang-switcher--mobile";

  return (
    <div className={className} aria-label={t("lang.label")}>
      {SUPPORTED_LOCALES.map((loc) => {
        const href = `/${loc}${rest === "/" ? "" : rest}`;
        const active = loc === locale;
        return (
          <Link
            key={loc}
            href={href}
            prefetch={false}
            style={{
              opacity: active ? 1 : 0.72,
              fontWeight: active ? 800 : 600,
              marginRight: 10,
            }}
          >
            {t(LABEL_KEY[loc])}
          </Link>
        );
      })}
    </div>
  );
}
