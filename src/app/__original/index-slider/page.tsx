import { getAiventTemplateBaselineBodyHtml } from "@/lib/aiventTemplate";

export default async function Page() {
  const html = await getAiventTemplateBaselineBodyHtml("index-slider.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

