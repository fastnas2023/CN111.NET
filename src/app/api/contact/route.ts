import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ ok: true });
}

type ContactPayload = {
  projectType: string;
  goal: string;
  budgetRange: string;
  timeline: string;
  contactEmail: string;
  contactPhone: string;
  additionalNotes: string;
};

export async function POST(request: Request) {
  // 演示接口：不做任何持久化/第三方校验（仅回显结构化字段，便于前端联调）
  const body = (await request.json().catch(() => ({}))) as Partial<ContactPayload>;

  const data: ContactPayload = {
    projectType: body.projectType ?? "",
    goal: body.goal ?? "",
    budgetRange: body.budgetRange ?? "",
    timeline: body.timeline ?? "",
    contactEmail: body.contactEmail ?? "",
    contactPhone: body.contactPhone ?? "",
    additionalNotes: body.additionalNotes ?? "",
  };

  return NextResponse.json({ ok: true, data });
}
