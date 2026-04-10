import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileContactPage } from "../(mobile)/contact/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("contact.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileContactPage />}
    />
  );
}
