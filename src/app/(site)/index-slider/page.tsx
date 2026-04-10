import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "@/app/(site)/_routing/ResponsiveRoute";
import DesktopTemplateShell from "@/app/(site)/_routing/DesktopTemplateShell";
import { MobileIndexSliderPage } from "@/app/(site)/(mobile)/index-slider/MobilePage";

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
