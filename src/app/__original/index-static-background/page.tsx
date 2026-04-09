import { getAiventTemplateBaselineBodyHtml } from "@/lib/aiventTemplate";

export default async function Page() {
  const html = await getAiventTemplateBaselineBodyHtml("index-static-background.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

