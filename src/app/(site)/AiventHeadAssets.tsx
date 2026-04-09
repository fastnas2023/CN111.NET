/**
 * AIVENT HTML 模板（/public/aivent/index.html）里 head 的静态资源（CSS/字体）。
 *
 * 说明：
 * - App Router 下推荐用 segment 的 `head.tsx` 注入 <link>，这里把内容抽成组件便于复用/维护。
 * - 字体资源由 /aivent/css/style.css 内的 @import 负责（Google Fonts + /aivent/fonts/*）。
 */
/* eslint-disable @next/next/no-css-tags */
export function AiventHeadAssets() {
  return (
    <>
      <link rel="icon" href="/aivent/images/icon.webp" sizes="16x16" />

      <link
        id="bootstrap"
        rel="stylesheet"
        href="/aivent/css/bootstrap.min.css"
        precedence="aivent"
      />
      <link rel="stylesheet" href="/aivent/css/vendors.css" precedence="aivent" />
      <link rel="stylesheet" href="/aivent/css/style.css" precedence="aivent" />
      <link
        id="colors"
        rel="stylesheet"
        href="/aivent/css/colors/scheme-01.css"
        precedence="aivent"
      />
    </>
  );
}
