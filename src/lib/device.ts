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
function isIpadUserAgent(ua: string): boolean {
  const u = ua.toLowerCase();
  // iPad classic UA
  if (u.includes("ipad")) return true;
  // iPadOS 13+ sometimes reports as Macintosh but still has "Mobile" token
  // Example: "Macintosh; Intel Mac OS X ... Mobile/15E148 Safari/604.1"
  if (u.includes("macintosh") && u.includes("mobile") && u.includes("safari"))
    return true;
  return false;
}

export function isMobileUserAgent(ua: string | undefined | null): boolean {
  if (!ua) return false;

  // 产品要求：iPad（含竖屏 768px）走桌面端，因此排除 iPad 的识别。
  if (isIpadUserAgent(ua)) return false;

  const u = ua.toLowerCase();
  // 这里仅把“手机端”识别为 mobile，避免小屏桌面环境（如 trae/远程容器）误判为移动端。
  // Android 平板 UA 通常不包含 "mobile"，而手机 UA 一般包含 "mobile" token。
  return (
    u.includes("iphone") ||
    u.includes("ipod") ||
    u.includes("windows phone") ||
    (u.includes("android") && u.includes("mobile"))
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
