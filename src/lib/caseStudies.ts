export type CaseStudyDetail = {
  /**
   * 详情页「背景」段落/要点（按行渲染）
   */
  background: string[];
  /**
   * 详情页「做了什么」段落/要点（按行渲染）
   */
  whatWeDid: string[];
  /**
   * 详情页「结果」段落/要点（按行渲染）
   */
  results: string[];
};

export type CaseStudy = {
  slug: string;
  /**
   * 列表页标题/摘要使用 i18n key（避免把多语言文案散落在代码里）
   */
  listTitleKey: string;
  listBodyKey: string;
  /**
   * 详情页背景图（来自 public/aivent/images/background）
   */
  heroBackgroundImageSrc: string;
  /**
   * 是否为占位详情（其余 3 个后续补齐）
   */
  isPlaceholder?: boolean;
  detail: CaseStudyDetail;
};

export const caseStudies: CaseStudy[] = [
  {
    // v1.caseStudies.items.1.*
    slug: "website-revamp",
    listTitleKey: "v1.caseStudies.items.1.title",
    listBodyKey: "v1.caseStudies.items.1.body",
    heroBackgroundImageSrc: "/aivent/images/background/1.webp",
    isPlaceholder: true,
    detail: {
      background: ["该案例详情正在整理中，先保留路由与页面结构，便于后续补齐真实内容。"],
      whatWeDid: ["占位：信息架构梳理、页面组件化、性能与埋点基础设施等。"],
      results: ["占位：上线后转化、性能与内容迭代效率的提升数据待补齐。"],
    },
  },
  {
    // v1.caseStudies.items.2.*  ✅ 至少支持
    slug: "growth-landing",
    listTitleKey: "v1.caseStudies.items.2.title",
    listBodyKey: "v1.caseStudies.items.2.body",
    heroBackgroundImageSrc: "/aivent/images/background/5.webp",
    detail: {
      background: [
        "面向出海投放的获客目标，原有落地页信息密度高但主线不清晰，导致点击后转化偏低。",
        "团队需要一套可快速迭代的「落地页实验系统」，支持多版本并行与漏斗指标对齐。",
      ],
      whatWeDid: [
        "拆解投放人群与关键承诺：明确 1 个主 CTA + 2 个次 CTA 的转化路径。",
        "基于同一套组件搭建多版本 Landing：首屏卖点、证据模块、FAQ/异议处理、表单位置可组合。",
        "补齐埋点与事件命名：曝光/点击/表单提交/关键滚动深度，形成可复盘漏斗。",
        "建立实验节奏：每周迭代 1–2 个假设，确保改动可归因、可回滚。",
      ],
      results: [
        "转化链路清晰：主 CTA 点击与表单提交率显著改善（示例数据占位）。",
        "投放成本更可控：用更少的版本覆盖更多受众与卖点假设，减少无效消耗。",
        "迭代效率提升：从“改一次等一周”到“可复用组件 + 指标闭环”的快速实验。",
      ],
    },
  },
  {
    // v1.caseStudies.items.3.* ✅ 至少支持
    slug: "seo-geo",
    listTitleKey: "v1.caseStudies.items.3.title",
    listBodyKey: "v1.caseStudies.items.3.body",
    heroBackgroundImageSrc: "/aivent/images/background/2.webp",
    detail: {
      background: [
        "目标是建立长期可持续的自然流量入口：既要覆盖传统搜索，也要提升在 AI 搜索/问答中的可见度（GEO）。",
        "现状常见问题：主题散、内容生产不可复制、页面结构缺少结构化数据与引用链路。",
      ],
      whatWeDid: [
        "搭建主题地图（Topic Map）：按业务场景/人群/阶段拆分主主题与子主题，定义优先级。",
        "沉淀内容模板：What/Why/How、对比评测、清单式指南、FAQ，统一信息结构与写作标准。",
        "技术 SEO 体检与修复：站点结构、内链策略、canonical、性能与可抓取性。",
        "GEO 加固：补齐结构化数据、引用来源与权威链接，强化可被模型检索与引用的信号。",
      ],
      results: [
        "内容生产流程标准化：从“写一篇是一次性项目”变成“可规模化复制”的产线。",
        "自然流量结构更健康：长尾覆盖更完整，核心主题的排名与曝光更稳定（示例数据占位）。",
        "AI 搜索可见度提升：更容易在问答/摘要中被引用，带来新的触点入口。",
      ],
    },
  },
  {
    // v1.caseStudies.items.4.* ✅ 至少支持
    slug: "ai-mvp",
    listTitleKey: "v1.caseStudies.items.4.title",
    listBodyKey: "v1.caseStudies.items.4.body",
    heroBackgroundImageSrc: "/aivent/images/background/7.webp",
    detail: {
      background: [
        "企业内部知识分散在文档、工单与业务系统中，检索效率低、口径不一致。",
        "目标是用可控可查的方式落地 RAG/Agent 能力：权限、引用、评测、成本与稳定性都要可验证。",
      ],
      whatWeDid: [
        "数据接入与清洗：定义数据源、更新策略与拆分粒度，保证召回质量与可维护性。",
        "权限与审计：按部门/角色做访问控制，并保留查询与命中记录便于追溯。",
        "引用与溯源：答案必须返回引用片段与来源链接，降低“幻觉”风险。",
        "评测体系：构建小规模黄金集 + 线上监控指标（命中率/满意度/成本/延迟），支持迭代。",
      ],
      results: [
        "知识检索效率提升：常见问题可以自助解决，减少重复沟通与上下文切换。",
        "风险可控：权限与引用链路让回答“可查、可证、可追溯”。",
        "可持续迭代：通过评测与监控，把模型/提示词/索引参数的调整变成工程化流程。",
      ],
    },
  },
  {
    // v1.caseStudies.items.5.*
    slug: "agent-automation",
    listTitleKey: "v1.caseStudies.items.5.title",
    listBodyKey: "v1.caseStudies.items.5.body",
    heroBackgroundImageSrc: "/aivent/images/background/3.webp",
    isPlaceholder: true,
    detail: {
      background: ["该案例详情正在整理中，先提供可访问的占位页。"],
      whatWeDid: ["占位：线索分级、客服问答、报表自动化等工作流梳理与落地。"],
      results: ["占位：人效提升与 ROI 改善数据待补齐。"],
    },
  },
  {
    // v1.caseStudies.items.6.*
    slug: "internal-tools",
    listTitleKey: "v1.caseStudies.items.6.title",
    listBodyKey: "v1.caseStudies.items.6.body",
    heroBackgroundImageSrc: "/aivent/images/background/4.webp",
    isPlaceholder: true,
    detail: {
      background: ["该案例详情正在整理中，先提供可访问的占位页。"],
      whatWeDid: ["占位：面向业务人员的后台/看板信息架构与迭代交付机制。"],
      results: ["占位：迭代周期缩短、数据可视化与运营效率提升数据待补齐。"],
    },
  },
];

export function getCaseStudyBySlug(slug: string | undefined) {
  if (!slug) return undefined;
  return caseStudies.find((c) => c.slug === slug);
}

