import { getAiventTemplateBaselineBodyHtml } from "@/lib/aiventTemplate";

export default async function Page() {
  const html = await getAiventTemplateBaselineBodyHtml("contact.html");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

