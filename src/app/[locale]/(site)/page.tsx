import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";
import ResponsiveRoute from "./_routing/ResponsiveRoute";
import DesktopTemplateShell from "./_routing/DesktopTemplateShell";
import { MobileHomePage } from "./(mobile)/home/MobilePage";

export default async function Page(props: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  const html = await getAiventTemplateBodyHtml({
    templateFileName: "index.html",
    locale,
    pageKey: "home",
    t,
  });
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          {/* 模板脚本会在 hydration 前改动 DOM（jarallax/skrollr），避免 dev hydration mismatch 提示 */}
          <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileHomePage />}
    />
  );
}
