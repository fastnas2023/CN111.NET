export type NewsPost = {
  slug: string;
  title: string;
  dateISO: string;
  author: string;
  readingMinutes: number;
  /**
   * news-single 页面正文段落（保留为数组，便于按段渲染）
   */
  content: string[];
  /**
   * 列表卡片封面图（来自 public/aivent）
   */
  imageSrc: string;
};

export type NewsComment = {
  id: string;
  author: string;
  dateISO: string;
  message: string;
  avatarSrc?: string;
  replies?: NewsComment[];
};

export const newsPosts: NewsPost[] = [
  {
    slug: "s1",
    title: "The AI Conference 2025 Set to Discuss AGI and Neural Architectures in SF",
    dateISO: "2025-05-28",
    author: "SRBThemes",
    readingMinutes: 6,
    content: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    ],
    imageSrc: "/aivent/images/news/s1.webp",
  },
  {
    slug: "s2",
    title: "Tony Blair Advocates for AI Integration in UK Healthcare and Education",
    dateISO: "2025-05-27",
    author: "SRBThemes",
    readingMinutes: 5,
    content: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
      "Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?",
    ],
    imageSrc: "/aivent/images/news/s2.webp",
  },
  {
    slug: "s3",
    title: "Apple's WWDC 2025 Faces Low Investor Expectations Over Siri AI Delay",
    dateISO: "2025-05-26",
    author: "SRBThemes",
    readingMinutes: 4,
    content: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    ],
    imageSrc: "/aivent/images/news/s3.webp",
  },
  {
    slug: "s4",
    title: "NYC Tech Week Highlights Human Skills' Value in AI-Dominated Discussions",
    dateISO: "2025-05-25",
    author: "SRBThemes",
    readingMinutes: 5,
    content: [
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
      "Totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      "Sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    ],
    imageSrc: "/aivent/images/news/s4.webp",
  },
  {
    slug: "s5",
    title: "Data + AI Summit 2025 to Explore Data Engineering and Machine Learning",
    dateISO: "2025-05-24",
    author: "SRBThemes",
    readingMinutes: 7,
    content: [
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur?",
    ],
    imageSrc: "/aivent/images/news/s5.webp",
  },
  {
    slug: "s6",
    title: "World Summit AI 2025 in Amsterdam to Focus on Generative AI Trends",
    dateISO: "2025-05-23",
    author: "SRBThemes",
    readingMinutes: 5,
    content: [
      "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.",
      "Et harum quidem rerum facilis est et expedita distinctio.",
    ],
    imageSrc: "/aivent/images/news/s6.webp",
  },
];

export const newsCommentsBySlug: Record<string, NewsComment[]> = {
  // news-single.html 的结构为固定示例；评论也按模板示例写死，便于保留 class 结构。
  s1: [
    {
      id: "c1",
      author: "Merrill Rayos",
      dateISO: "2025-05-26",
      avatarSrc: "/aivent/images/team/1.webp",
      message:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      replies: [
        {
          id: "c1-r1",
          author: "Jackqueline Sprang",
          dateISO: "2025-05-26",
          avatarSrc: "/aivent/images/team/2.webp",
          message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        },
      ],
    },
    {
      id: "c2",
      author: "Sanford Crowley",
      dateISO: "2025-05-26",
      avatarSrc: "/aivent/images/team/3.webp",
      message:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
      replies: [
        {
          id: "c2-r1",
          author: "Lyndon Pocekay",
          dateISO: "2025-05-26",
          avatarSrc: "/aivent/images/team/4.webp",
          message:
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
        },
      ],
    },
    {
      id: "c3",
      author: "Aleen Crigger",
      dateISO: "2025-05-26",
      avatarSrc: "/aivent/images/team/5.webp",
      message:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ],
};

export function getNewsPostBySlug(slug: string | undefined) {
  if (!slug) return newsPosts[0];
  return newsPosts.find((p) => p.slug === slug) ?? newsPosts[0];
}

export function getNewsCommentsBySlug(slug: string | undefined) {
  const resolved = slug ?? newsPosts[0]?.slug;
  if (!resolved) return [];
  return newsCommentsBySlug[resolved] ?? newsCommentsBySlug.s1 ?? [];
}
