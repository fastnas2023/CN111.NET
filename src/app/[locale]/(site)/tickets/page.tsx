import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileTicketsPage } from "../(mobile)/tickets/MobilePage";

export default async function Page(props: {
  params: Promise<{ locale: SupportedLocale }>;
}) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  const html = await getAiventTemplateBodyHtml({
    templateFileName: "tickets.html",
    locale,
    pageKey: "tickets",
    t,
  });
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileTicketsPage />}
    />
  );
}
