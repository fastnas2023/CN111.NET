import { getAiventTemplateBodyHtml } from "@/lib/aiventTemplate";

export default async function Page() {
  const html = await getAiventTemplateBodyHtml("index-slider.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
