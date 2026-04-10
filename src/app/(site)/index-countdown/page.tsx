import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "@/app/(site)/_routing/ResponsiveRoute";
import DesktopTemplateShell from "@/app/(site)/_routing/DesktopTemplateShell";
import { MobileIndexCountdownPage } from "@/app/(site)/(mobile)/index-countdown/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("index-countdown.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileIndexCountdownPage />}
    />
  );
}
