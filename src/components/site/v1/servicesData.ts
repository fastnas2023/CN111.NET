export type ServiceTier = {
  name: string;
  priceRange: string;
  period: string;
  deliverables: string[];
};

export type ServiceCategory = {
  id: "web" | "seo-geo" | "design" | "ai";
  label: "Web" | "SEO & GEO" | "Design" | "AI";
  subtitle: string;
  tiers: [ServiceTier, ServiceTier, ServiceTier];
};

/**
 * CN111 Studio v1: Services / Packages content.
 *
 * Note: Intentionally kept as simple data so it can be shared by both
 * desktop (Server Component tree) and mobile (Client Component tree).
 */
export const SERVICES_CATEGORIES: ServiceCategory[] = [
  {
    id: "web",
    label: "Web",
    subtitle: "品牌官网 / 营销落地页 / 交互与工程落地（响应式 + 性能）",
    tiers: [
      {
        name: "Starter（起步）",
        priceRange: "¥12,000–¥25,000",
        period: "2–3 周",
        deliverables: [
          "信息架构与页面结构（1 轮）",
          "3–5 个页面（响应式）开发与上线",
          "基础 SEO（标题/描述/OG）+ Analytics 埋点",
          "性能与可访问性基础优化（Lighthouse 指标对齐）",
        ],
      },
      {
        name: "Growth（增长）",
        priceRange: "¥25,000–¥60,000",
        period: "3–6 周",
        deliverables: [
          "6–10 个页面 + 可复用组件库（模块化内容块）",
          "设计对齐与动效实现（轻量）",
          "内容运营能力：MDX/Headless CMS（二选一）",
          "转化链路：表单/预约/邮件通知 + 事件追踪方案",
        ],
      },
      {
        name: "Scale（规模）",
        priceRange: "¥60,000–¥150,000",
        period: "6–10 周",
        deliverables: [
          "多语言与内容结构化（分类/标签/搜索）",
          "性能深度优化（图片策略、缓存、边缘加速建议）",
          "组件/设计系统化交付（可持续迭代）",
          "上线后的 30 天护航：问题响应 + 小迭代包",
        ],
      },
    ],
  },
  {
    id: "seo-geo",
    label: "SEO & GEO",
    subtitle: "搜索可见度 + 生成式搜索（LLM/引用/答案卡）能力建设",
    tiers: [
      {
        name: "Audit（诊断）",
        priceRange: "¥8,000–¥18,000",
        period: "7–10 天",
        deliverables: [
          "技术 SEO 体检：索引、抓取、结构化数据、核心 Web 指标",
          "关键词与页面映射（核心 20–50 词）",
          "GEO 机会清单：可被引用的权威内容缺口",
          "可执行清单：优先级 + 预计收益 + 排期建议",
        ],
      },
      {
        name: "Optimize（优化）",
        priceRange: "¥18,000–¥45,000",
        period: "2–4 周",
        deliverables: [
          "站内优化落地：Title/Meta/内链/结构化数据（Schema）",
          "内容结构改造：FAQ/对比/清单/How-to 模版（3–6 篇）",
          "GEO 适配：引用友好段落、数据点、可验证来源链接",
          "监控与复盘：搜索表现看板 + 迭代建议（2 次）",
        ],
      },
      {
        name: "Content Engine（内容引擎）",
        priceRange: "¥45,000–¥120,000",
        period: "4–8 周",
        deliverables: [
          "内容生产体系：选题库 + 写作规范 + 质量门槛（E-E-A-T）",
          "主题集群（Topic Cluster）与页面矩阵（10–20 篇计划）",
          "GEO 资产：权威页/数据页/行业术语库/引用入口页",
          "月度增长节奏：目标、实验、复盘与下一周期规划",
        ],
      },
    ],
  },
  {
    id: "design",
    label: "Design",
    subtitle: "品牌识别 / UI 视觉 / 组件化设计系统（Figma 可交接）",
    tiers: [
      {
        name: "Landing Kit（落地页套件）",
        priceRange: "¥10,000–¥22,000",
        period: "7–14 天",
        deliverables: [
          "1 个落地页完整视觉（首屏 + 4–6 模块）",
          "基础组件（按钮/输入/卡片/徽标）与样式规范",
          "图片与排版建议（可替换资产清单）",
          "交付：Figma 源文件 + 标注 + 导出资源",
        ],
      },
      {
        name: "Product UI（产品 UI）",
        priceRange: "¥22,000–¥60,000",
        period: "2–5 周",
        deliverables: [
          "关键流程设计：3–6 个核心页面（含状态）",
          "设计 Token（颜色/字体/间距）与组件规范",
          "可用性优化：信息层级、表单、空状态、错误态",
          "交付：组件库（Figma）+ 交互说明（1 轮）",
        ],
      },
      {
        name: "Design System（设计系统）",
        priceRange: "¥60,000–¥160,000",
        period: "4–10 周",
        deliverables: [
          "组件体系：基础/复合组件 + 变体规范",
          "布局与内容策略：栅格、版式、图表/表格规范",
          "设计与工程对齐：命名、状态、实现建议与示例",
          "交付：Design System 文档 + 迭代流程建议",
        ],
      },
    ],
  },
  {
    id: "ai",
    label: "AI",
    subtitle: "AI 产品原型 / 助手与自动化 / RAG 与评估（可落地到业务流程）",
    tiers: [
      {
        name: "AI Sprint（探索）",
        priceRange: "¥12,000–¥28,000",
        period: "1–2 周",
        deliverables: [
          "场景梳理：目标、输入输出、约束与风险",
          "Prompt/流程原型（含 10–20 条示例与模板）",
          "数据与工具清单：可接入系统、权限、成本预估",
          "可行性结论：下一步路线图与里程碑",
        ],
      },
      {
        name: "Assistant MVP（最小可用）",
        priceRange: "¥28,000–¥80,000",
        period: "3–6 周",
        deliverables: [
          "可运行 MVP：对话/表单/工作流（按场景选型）",
          "RAG 基础能力：知识库接入 + 权限与引用展示",
          "日志与监控：关键指标、失败原因、人工兜底策略",
          "上线辅导：团队使用手册 + 试运行复盘（1 次）",
        ],
      },
      {
        name: "Production（生产级）",
        priceRange: "¥80,000–¥220,000",
        period: "6–12 周",
        deliverables: [
          "多场景编排：工具调用、结构化输出、审批与回写",
          "评估体系：离线集、在线 A/B、幻觉与安全策略",
          "成本与性能优化：缓存、分流、模型策略与配额",
          "交付：架构文档 + 运维手册 + 迭代节奏建议",
        ],
      },
    ],
  },
];

