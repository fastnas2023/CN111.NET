import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "@/app/(site)/_routing/ResponsiveRoute";
import DesktopTemplateShell from "@/app/(site)/_routing/DesktopTemplateShell";
import { MobileIndexStaticBackgroundPage } from "@/app/(site)/(mobile)/index-static-background/MobilePage";

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
