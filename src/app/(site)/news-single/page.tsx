import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "@/app/(site)/_routing/ResponsiveRoute";
import DesktopTemplateShell from "@/app/(site)/_routing/DesktopTemplateShell";
import { MobileNewsSinglePage } from "@/app/(site)/(mobile)/news-single/MobilePage";

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
