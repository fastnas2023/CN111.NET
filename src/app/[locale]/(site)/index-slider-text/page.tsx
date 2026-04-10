import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileIndexSliderTextPage } from "../(mobile)/index-slider-text/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("index-slider-text.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileIndexSliderTextPage />}
    />
  );
}
