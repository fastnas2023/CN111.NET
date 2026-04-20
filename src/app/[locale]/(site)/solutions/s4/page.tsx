import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../../_routing/ResponsiveRoute";
import { MobileSolutionS4Page } from "../../(mobile)/solutions/s4/MobilePage";
import { routes } from "@/lib/routes";
import { withLocale } from "@/i18n/paths";

import { V1DesktopShell } from "@/components/site/v1/V1DesktopShell";
import { Hero } from "@/components/site/solutions/Hero";
import { PainPoints } from "@/components/site/solutions/PainPoints";
import { MethodSteps } from "@/components/site/solutions/MethodSteps";
import { DeliverablesTable } from "@/components/site/solutions/DeliverablesTable";
import { TimelineAndPricing } from "@/components/site/solutions/TimelineAndPricing";
import { FAQ } from "@/components/site/solutions/FAQ";
import { ConversionCTA } from "@/components/site/solutions/ConversionCTA";

export default async function Page(props: { params: Promise<{ locale: SupportedLocale }> }) {
  const { locale } = await props.params;
  const messages = await getMessages(locale);
  const t = createT(messages);

  return (
    <ResponsiveRoute
      desktop={
        <V1DesktopShell>
          <Hero
            kicker={t("v1.kicker")}
            title={t("v1.solutions.s4.title")}
            lede={t("v1.solutions.s4.body")}
            background={{
              type: "image",
              src: "/aivent/images/misc/s4.webp",
              alt: "Solution background",
            }}
            primaryCta={{ label: t("v1.cta.book"), href: withLocale(locale, routes.book) }}
            secondaryCta={{ label: t("v1.cta.contact"), href: withLocale(locale, routes.contact) }}
          />

          <PainPoints
            items={[
              { title: "项目排期不确定", body: "占位：需求反复、沟通成本高，难以在可控范围内交付。" },
              { title: "交付标准不清晰", body: "占位：没有“验收口径”，上线后反复返工。" },
              { title: "外包/协作效率低", body: "占位：缺少规范与文档，导致协作变成救火。" },
              { title: "缺少复盘机制", body: "占位：项目做完即结束，经验无法沉淀。" },
            ]}
          />

          <MethodSteps
            steps={[
              { title: "范围与目标对齐", body: "占位：明确目标、边界与验收标准，降低返工。" },
              { title: "里程碑拆分", body: "占位：将交付拆到可验证的里程碑，按周推进。" },
              { title: "可视化协作", body: "占位：用看板/文档/原型串联协作，让信息透明可追踪。" },
              { title: "复盘与沉淀", body: "占位：每个迭代结束做复盘，沉淀模板与规范。" },
            ]}
          />

          <DeliverablesTable
            rows={[
              { deliverable: "项目计划与里程碑", description: "占位：范围、节奏、验收点", format: "文档/看板" },
              { deliverable: "需求与原型", description: "占位：可交付的需求拆解与原型", format: "Figma/文档" },
              { deliverable: "实现与上线", description: "占位：按里程碑提交可运行版本", format: "代码/部署" },
              { deliverable: "复盘报告", description: "占位：问题清单、优化建议、沉淀项", format: "文档" },
            ]}
          />

          <TimelineAndPricing
            timeline={[
              { phase: "启动：对齐与拆解", duration: "1-3 天", output: "计划与范围" },
              { phase: "交付：按周迭代", duration: "2-6 周", output: "可上线版本" },
              { phase: "收尾：复盘沉淀", duration: "1-2 天", output: "复盘与沉淀" },
            ]}
            pricing={[
              { tier: "项目制", price: "按范围报价", notes: "占位：适合明确目标与交付范围的项目。" },
              { tier: "驻场/陪跑", price: "按月", notes: "占位：适合持续迭代与跨团队协作。" },
              { tier: "顾问支持", price: "按次/按包", notes: "占位：适合关键节点把关与评审。" },
            ]}
          />

          <FAQ
            items={[
              { q: "怎么保证按期交付？", a: "占位回答：通过里程碑拆分、明确验收与透明协作降低风险。" },
              { q: "我们内部资源有限怎么办？", a: "占位回答：可按需承担更多执行工作，或提供陪跑协作方式。" },
              { q: "是否支持长期合作？", a: "占位回答：支持，可按月/季度形成持续迭代机制。" },
            ]}
          />

          <ConversionCTA
            locale={locale}
            primaryLabel={t("v1.cta.book")}
            secondaryLabel={t("v1.cta.contact")}
          />
        </V1DesktopShell>
      }
      mobile={<MobileSolutionS4Page />}
    />
  );
}

