import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";
import ResponsiveRoute from "@/app/(site)/_routing/ResponsiveRoute";
import DesktopTemplateShell from "@/app/(site)/_routing/DesktopTemplateShell";
import { MobileNewsPage } from "@/app/(site)/(mobile)/news/MobilePage";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("news.html");
  return (
    <ResponsiveRoute
      desktop={
        <DesktopTemplateShell>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </DesktopTemplateShell>
      }
      mobile={<MobileNewsPage />}
    />
  );
}
