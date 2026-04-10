export const VIEW_MODE_COOKIE_NAME = "viewMode" as const;

export type ViewMode = "auto" | "mobile" | "desktop";

/**
 * 解析 viewMode cookie（只接受 auto/mobile/desktop）。
 * - 无值/非法值 -> undefined
 */
export function parseViewModeCookie(
  value: string | undefined | null,
): ViewMode | undefined {
  if (!value) return undefined;
  if (value === "auto" || value === "mobile" || value === "desktop")
    return value;
  return undefined;
}

/**
 * 非严格的 UA 移动端判断（用于 auto 模式）。
 * 注意：这是启发式判断，无法 100% 精确。
 */
export function isMobileUserAgent(ua: string | undefined | null): boolean {
  if (!ua) return false;

  // 参考常见 UA 片段：Android / iOS / Windows Phone / 一些移动浏览器标识
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile/i.test(
    ua,
  );
}

/**
 * 将 cookie + UA 解析成最终的渲染模式（desktop/mobile）。
 * - desktop/mobile：强制模式，直接返回
 * - auto/undefined：基于 UA 判断
 */
export function resolveViewMode(params: {
  viewMode: ViewMode | undefined;
  userAgent: string | undefined | null;
}): Exclude<ViewMode, "auto"> {
  const viewMode = params.viewMode ?? "auto";
  if (viewMode === "desktop" || viewMode === "mobile") return viewMode;
  return isMobileUserAgent(params.userAgent) ? "mobile" : "desktop";
}

