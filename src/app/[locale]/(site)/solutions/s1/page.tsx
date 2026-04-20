import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../../_routing/ResponsiveRoute";
import { MobileSolutionS1Page } from "../../(mobile)/solutions/s1/MobilePage";
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
            title={t("v1.solutions.s1.title")}
            lede={t("v1.solutions.s1.body")}
            background={{
              type: "image",
              src: "/aivent/images/misc/s1.webp",
              alt: "Solution background",
            }}
            primaryCta={{ label: t("v1.cta.book"), href: withLocale(locale, routes.book) }}
            secondaryCta={{ label: t("v1.cta.contact"), href: withLocale(locale, routes.contact) }}
          />

          <PainPoints
            items={[
              { title: "获客成本上升", body: "投放越来越贵，但线索质量不稳定，团队难以预测增长。" },
              { title: "内容与页面割裂", body: "内容在“讲价值”，页面在“卖功能”，导致转化链路断裂。" },
              { title: "转化漏斗不清晰", body: "没有统一的指标与实验节奏，优化依赖直觉与经验。" },
              { title: "上线慢、迭代慢", body: "每次改动牵一发而动全身，无法形成快速试错闭环。" },
            ]}
          />

          <MethodSteps
            steps={[
              { title: "定位诊断", body: "梳理目标用户、核心场景与差异化叙事，建立清晰的价值主张。" },
              { title: "信息架构", body: "将卖点、证据、行动按钮映射到页面结构，形成可执行的内容大纲。" },
              { title: "可视化与组件化", body: "用可复用的 UI 组件搭建页面，保证品牌一致性与开发效率。" },
              { title: "数据化迭代", body: "基于埋点/回放/转化数据，持续做小步 A/B 与结构优化。" },
            ]}
          />

          <DeliverablesTable
            rows={[
              { deliverable: "落地页 IA（信息架构）", description: "从上到下的叙事与模块结构", format: "Figma / 文档" },
              { deliverable: "Hero & CTA 策略", description: "标题、卖点、行动按钮与信任元素组合", format: "文案 + 组件" },
              { deliverable: "可复用区块组件", description: "痛点、步骤、交付物、FAQ 等标准区块", format: "React/Next.js" },
              { deliverable: "基础转化埋点建议", description: "关键点击/滚动/表单事件建议", format: "清单" },
            ]}
          />

          <TimelineAndPricing
            timeline={[
              { phase: "第 1 周：诊断与结构", duration: "3-5 天", output: "结构与文案方向" },
              { phase: "第 2 周：设计与实现", duration: "5-7 天", output: "可上线页面" },
              { phase: "第 3 周：数据化迭代", duration: "按需", output: "迭代节奏与实验" },
            ]}
            pricing={[
              { tier: "快速版", price: "￥X,XXX 起", notes: "适合单页/单产品快速上线验证。" },
              { tier: "标准版", price: "￥XX,XXX 起", notes: "包含组件化、基础埋点与 1-2 轮迭代。" },
              { tier: "增长版", price: "按月/季度", notes: "持续实验、内容生产与多页面漏斗优化。" },
            ]}
          />

          <FAQ
            items={[
              { q: "需要提供哪些材料？", a: "占位回答：已有官网、品牌规范、产品资料、以往投放素材越完整越好。" },
              { q: "能否先做一个 MVP？", a: "可以。占位回答：通常从 Hero + 关键区块开始，快速上线再迭代。" },
              { q: "是否包含文案与设计？", a: "占位回答：可选。也可与内部团队协作，我们提供结构与组件化实现。" },
            ]}
          />

          <ConversionCTA
            locale={locale}
            primaryLabel={t("v1.cta.book")}
            secondaryLabel={t("v1.cta.contact")}
          />
        </V1DesktopShell>
      }
      mobile={<MobileSolutionS1Page />}
    />
  );
}

