import { createT, getMessages } from "@/i18n/server";
import type { SupportedLocale } from "@/i18n/locales";

import ResponsiveRoute from "../../_routing/ResponsiveRoute";
import { MobileSolutionS3Page } from "../../(mobile)/solutions/s3/MobilePage";
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
            title={t("v1.solutions.s3.title")}
            lede={t("v1.solutions.s3.body")}
            background={{
              type: "image",
              src: "/aivent/images/misc/s3.webp",
              alt: "Solution background",
            }}
            primaryCta={{ label: t("v1.cta.book"), href: withLocale(locale, routes.book) }}
            secondaryCta={{ label: t("v1.cta.contact"), href: withLocale(locale, routes.contact) }}
          />

          <PainPoints
            items={[
              { title: "品牌叙事不统一", body: "占位：不同渠道表达不一致，导致用户认知分散。" },
              { title: "设计系统缺失", body: "占位：组件与样式无法复用，上线质量参差不齐。" },
              { title: "跨端体验断层", body: "占位：桌面端好看但移动端难用（或反之）。" },
              { title: "开发效率被拖累", body: "占位：缺少规范与组件库，开发/改版成本过高。" },
            ]}
          />

          <MethodSteps
            steps={[
              { title: "品牌与视觉基线", body: "占位：定义颜色、字体、间距、组件规范与语气。" },
              { title: "组件库与版式", body: "占位：沉淀可复用组件与页面版式模板。" },
              { title: "跨端响应式实现", body: "占位：桌面/移动统一信息结构，适配不同交互习惯。" },
              { title: "可持续演进", body: "占位：建立设计-开发协作流程，持续完善系统。" },
            ]}
          />

          <DeliverablesTable
            rows={[
              { deliverable: "视觉基线（Tokens）", description: "占位：颜色/字号/间距/阴影等", format: "CSS/SCSS" },
              { deliverable: "组件库", description: "占位：按钮、卡片、表单、导航等", format: "React 组件" },
              { deliverable: "页面模板", description: "占位：列表页/详情页/落地页模板", format: "Next.js 路由" },
              { deliverable: "协作规范", description: "占位：命名、分支、评审与发布流程", format: "文档" },
            ]}
          />

          <TimelineAndPricing
            timeline={[
              { phase: "第 1 周：基线与组件", duration: "5-7 天", output: "Tokens + 核心组件" },
              { phase: "第 2 周：模板与路由", duration: "5-7 天", output: "页面模板" },
              { phase: "持续：迭代与扩展", duration: "按需", output: "持续演进" },
            ]}
            pricing={[
              { tier: "启动版", price: "￥X,XXX 起", notes: "占位：先做核心组件与基础模板。" },
              { tier: "系统版", price: "￥XX,XXX 起", notes: "占位：覆盖更多组件与跨端页面。" },
              { tier: "团队版", price: "按月/季度", notes: "占位：持续扩展组件库与规范。" },
            ]}
          />

          <FAQ
            items={[
              { q: "能与现有设计稿对齐吗？", a: "占位回答：可以，优先迁移核心页面，逐步替换旧组件。" },
              { q: "需要重写整个站吗？", a: "占位回答：不一定，可采用渐进式迁移策略。" },
              { q: "组件库会不会太重？", a: "占位回答：会按实际使用裁剪，避免过度抽象。" },
            ]}
          />

          <ConversionCTA
            locale={locale}
            primaryLabel={t("v1.cta.book")}
            secondaryLabel={t("v1.cta.contact")}
          />
        </V1DesktopShell>
      }
      mobile={<MobileSolutionS3Page />}
    />
  );
}

