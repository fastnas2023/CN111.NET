import "server-only";

import type { ReactNode } from "react";
import { cookies, headers } from "next/headers";

import {
  parseViewModeCookie,
  resolveViewMode,
  VIEW_MODE_COOKIE_NAME,
} from "@/lib/device";

export type ResponsiveRouteProps = {
  desktop: ReactNode;
  mobile: ReactNode;
};

/**
 * Server Component：根据 viewMode cookie（auto/mobile/desktop）+ UA 选择渲染 desktop/mobile。
 */
export default async function ResponsiveRoute({
  desktop,
  mobile,
}: ResponsiveRouteProps) {
  const cookieStore = await cookies();
  const viewMode = parseViewModeCookie(
    cookieStore.get(VIEW_MODE_COOKIE_NAME)?.value,
  );

  const headerStore = await headers();
  const ua = headerStore.get("user-agent");
  const resolved = resolveViewMode({ viewMode, userAgent: ua });

  return resolved === "mobile" ? mobile : desktop;
}
