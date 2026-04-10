import type { Metadata } from "next";
import { notFound } from "next/navigation";

import "../globals.scss";
import "banli-ui/styles.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { AppProviders } from "@/components/providers/AppProviders";
import { AiventHeadAssets } from "./(site)/AiventHeadAssets";

import { getMessages } from "@/i18n/server";
import { createT } from "@/i18n/server";
import {
  getHtmlDir,
  isSupportedLocale,
  SUPPORTED_LOCALES,
  type SupportedLocale,
} from "@/i18n/locales";
import { I18nProvider } from "@/i18n/client";

export const dynamicParams = false;

export async function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};

  const messages = await getMessages(locale);
  const t = createT(messages);
  return {
    title: t("brand.name"),
    description: `${t("brand.name")} (Next.js + banli-ui + SCSS)`,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isSupportedLocale(rawLocale)) notFound();
  const locale = rawLocale as SupportedLocale;

  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={getHtmlDir(locale)}>
      <head>
        <AiventHeadAssets />
      </head>
      <body>
        <I18nProvider locale={locale} messages={messages}>
          <AppProviders>{children}</AppProviders>
        </I18nProvider>
      </body>
    </html>
  );
}
