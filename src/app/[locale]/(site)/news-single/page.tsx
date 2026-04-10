import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "../_routing/ResponsiveRoute";
import DesktopTemplateShell from "../_routing/DesktopTemplateShell";
import { MobileNewsSinglePage } from "../(mobile)/news-single/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("news-single.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileNewsSinglePage />}
    />
  );
}
