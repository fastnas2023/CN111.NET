import { NextResponse, type NextRequest } from "next/server";
import {
  parseViewModeCookie,
  VIEW_MODE_COOKIE_NAME,
} from "@/lib/device";

type ViewModeBody = { viewMode?: unknown };

/**
 * POST /api/view-mode
 * Body: { viewMode: "auto" | "mobile" | "desktop" }
 *
 * 设置 cookie: viewMode=auto/mobile/desktop
 */
export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => null)) as ViewModeBody | null;
  const raw = typeof body?.viewMode === "string" ? body.viewMode : undefined;
  const viewMode = parseViewModeCookie(raw);

  if (!viewMode) {
    return NextResponse.json(
      {
        ok: false,
        error: `Invalid viewMode, expected one of: auto | mobile | desktop`,
      },
      { status: 400 },
    );
  }

  const res = NextResponse.json({ ok: true, viewMode });
  res.cookies.set({
    name: VIEW_MODE_COOKIE_NAME,
    value: viewMode,
    path: "/",
    sameSite: "lax",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
