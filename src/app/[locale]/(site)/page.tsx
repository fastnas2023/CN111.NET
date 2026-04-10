import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "./_routing/ResponsiveRoute";
import DesktopTemplateShell from "./_routing/DesktopTemplateShell";
import { MobileHomePage } from "./(mobile)/home/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("index.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileHomePage />}
    />
  );
}
