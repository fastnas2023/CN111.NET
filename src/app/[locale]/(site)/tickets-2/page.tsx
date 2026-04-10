import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileTickets2Page } from "../(mobile)/tickets-2/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("tickets-2.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileTickets2Page />}
    />
  );
}
