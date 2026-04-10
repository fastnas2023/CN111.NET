import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "@/app/(site)/_routing/ResponsiveRoute";
import DesktopTemplateShell from "@/app/(site)/_routing/DesktopTemplateShell";
import { MobileIndexSliderTextPage } from "@/app/(site)/(mobile)/index-slider-text/MobilePage";

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
