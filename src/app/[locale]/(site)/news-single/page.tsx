import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileNewsSinglePage } from "../(mobile)/news-single/MobilePage";

export default async function Page(props: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  const html = await getAiventTemplateBodyHtml({
    templateFileName: "news-single.html",
    locale,
    pageKey: "news-single",
    t,
  });
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileNewsSinglePage />}
    />
  );
}
