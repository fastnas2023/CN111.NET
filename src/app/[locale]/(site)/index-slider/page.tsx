import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileIndexSliderPage } from "../(mobile)/index-slider/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("index-slider.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileIndexSliderPage />}
    />
  );
}
