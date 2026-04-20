import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../../_routing/ResponsiveRoute";
import { MobileSolutionS2Page } from "../../(mobile)/solutions/s2/MobilePage";
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
            title={t("v1.solutions.s2.title")}
            lede={t("v1.solutions.s2.body")}
            background={{
              type: "image",
              src: "/aivent/images/misc/s2.webp",
              alt: "Solution background",
            }}
            primaryCta={{ label: t("v1.cta.book"), href: withLocale(locale, routes.book) }}
            secondaryCta={{ label: t("v1.cta.contact"), href: withLocale(locale, routes.contact) }}
          />

          <PainPoints
            items={[
              { title: "资源分散", body: "占位：知识、模板、素材散落在多个工具中，难以复用与协作。" },
              { title: "复用成本高", body: "占位：每次从零开始整理，无法形成“可复制的增长资产”。" },
              { title: "风格不一致", body: "占位：内容与视觉缺少统一规范，影响专业度与信任感。" },
              { title: "搜索与检索困难", body: "占位：没有结构化分类与标签体系，找资料靠记忆。" },
            ]}
          />

          <MethodSteps
            steps={[
              { title: "资产盘点", body: "占位：梳理现有内容/素材/案例，按业务目标归类。" },
              { title: "结构化与标签", body: "占位：定义分类、标签、命名规则与复用策略。" },
              { title: "模板化生产", body: "占位：沉淀可复用模板（文章、页面区块、图文组件）。" },
              { title: "发布与运营", body: "占位：制定发布节奏与指标，持续迭代内容体系。" },
            ]}
          />

          <DeliverablesTable
            rows={[
              { deliverable: "资源库结构", description: "占位：目录/标签/命名体系", format: "文档" },
              { deliverable: "模板套件", description: "占位：内容与视觉模板集合", format: "Figma / Notion" },
              { deliverable: "组件化区块", description: "占位：可复用页面区块实现", format: "React/Next.js" },
              { deliverable: "运营节奏建议", description: "占位：生产-发布-复盘闭环", format: "清单" },
            ]}
          />

          <TimelineAndPricing
            timeline={[
              { phase: "第 1 周：盘点与结构", duration: "3-5 天", output: "分类与规范" },
              { phase: "第 2 周：模板化与实现", duration: "5-7 天", output: "模板与组件" },
              { phase: "持续：运营与迭代", duration: "按需", output: "内容增长" },
            ]}
            pricing={[
              { tier: "基础版", price: "￥X,XXX 起", notes: "占位：适合小团队快速搭建资源库结构。" },
              { tier: "标准版", price: "￥XX,XXX 起", notes: "占位：包含模板化与基础组件落地。" },
              { tier: "运营版", price: "按月/季度", notes: "占位：持续内容生产、复盘与迭代。" },
            ]}
          />

          <FAQ
            items={[
              { q: "资源库用什么工具？", a: "占位回答：可用 Notion/飞书文档/自建站等，按团队习惯选择。" },
              { q: "能不能和现有网站集成？", a: "占位回答：可以，我们会以组件/页面形式融入现有 Next.js 站点。" },
              { q: "是否需要专人维护？", a: "占位回答：建议至少 1 人负责节奏，我们也可提供代运营支持。" },
            ]}
          />

          <ConversionCTA
            locale={locale}
            primaryLabel={t("v1.cta.book")}
            secondaryLabel={t("v1.cta.contact")}
          />
        </V1DesktopShell>
      }
      mobile={<MobileSolutionS2Page />}
    />
  );
}

