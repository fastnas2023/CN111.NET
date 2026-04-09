import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true });
}

export async function POST() {
  // 演示接口：不做任何持久化/第三方校验
  return NextResponse.json({ ok: true });
}

