import React from "react";
import { notFound } from "next/navigation";

import { MobileAppShell } from "@/components/mobile/layout/MobileAppShell";

export default function MobileShellDevPage() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <MobileAppShell>
      <h1 style={{ margin: 0, fontSize: 20 }}>Mobile AppShell 预览</h1>
      <p style={{ marginTop: 10, opacity: 0.82, lineHeight: 1.6 }}>
        点击右上角汉堡按钮打开抽屉；抽屉底部（仅 dev）可切换 viewMode
        (auto/mobile/desktop)。
      </p>
      <div style={{ height: 900 }} />
      <p style={{ opacity: 0.72 }}>用于验证 sticky header 与滚动行为。</p>
    </MobileAppShell>
  );
}

