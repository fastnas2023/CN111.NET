"use client";

import React from "react";

import type { SupportedLocale } from "./locales";

export type Messages = Record<string, string>;
type TFn = (key: string, vars?: Record<string, string | number>) => string;

const I18nContext = React.createContext<
  { locale: SupportedLocale; t: TFn } | undefined
>(undefined);

function createT(messages: Messages): TFn {
  return (key, vars) => {
    const raw = messages[key] ?? key;
    if (!vars) return raw;
    return Object.entries(vars).reduce(
      (acc, [k, v]) => acc.replaceAll(`{${k}}`, String(v)),
      raw,
    );
  };
}

export function I18nProvider(props: {
  locale: SupportedLocale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = React.useMemo(
    () => ({ locale: props.locale, t: createT(props.messages) }),
    [props.locale, props.messages],
  );
  return (
    <I18nContext.Provider value={value}>{props.children}</I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = React.useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within <I18nProvider>");
  return ctx;
}

