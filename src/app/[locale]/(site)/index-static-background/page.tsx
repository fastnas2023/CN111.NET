import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileIndexStaticBackgroundPage } from "../(mobile)/index-static-background/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("index-static-background.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileIndexStaticBackgroundPage />}
    />
  );
}
