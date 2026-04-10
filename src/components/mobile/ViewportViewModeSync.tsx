"use client";

import { useEffect } from "react";

const BREAKPOINT_PX = 992;
const COOKIE_NAME = "viewMode";

function isPhoneUserAgent(ua: string): boolean {
  const u = ua.toLowerCase();
  return (
    u.includes("iphone") ||
    u.includes("ipod") ||
    u.includes("windows phone") ||
    (u.includes("android") && u.includes("mobile"))
  );
}

function readCookie(name: string): string | undefined {
  const m = document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m?.[1] ? decodeURIComponent(m[1]) : undefined;
}

/**
 * 将“auto”模式的渲染纠正为「按 viewport <= 992px → mobile，否则 desktop」。
 *
 * 说明：
 * - SSR 端无法获取 viewport 宽度，所以首次渲染用 UA 推断；
 * - 该组件在客户端用 viewport 做一次纠正（必要时写入 cookie 并 reload）；
 * - 若用户已显式设置 viewMode=mobile/desktop，则不会覆盖（保留手动覆盖能力）。
 */
export function ViewportViewModeSync() {
  useEffect(() => {
    // 只对“手机 UA”做 viewport 纠正。
    // 目的：避免在桌面 UA 但窗口较窄（如 trae/远程环境）时误切到移动端。
    if (!isPhoneUserAgent(navigator.userAgent)) return;

    const current = readCookie(COOKIE_NAME);
    if (current === "mobile" || current === "desktop") return;

    const desired = window.innerWidth <= BREAKPOINT_PX ? "mobile" : "desktop";
    if (current === desired) return;

    fetch("/api/view-mode", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ viewMode: desired }),
    })
      .then(() => {
        window.location.reload();
      })
      .catch(() => {
        // ignore
      });
  }, []);

  return null;
}
