import "server-only";

import type { ReactNode } from "react";

import { AiventBodyClass } from "@/app/(site)/AiventBodyClass";
import { AiventScriptsServer } from "@/app/(site)/AiventScriptsServer";

/**
 * Desktop 专用壳：注入模板需要的 body class + 模板脚本。
 *
 * 重要：保持与原模板一致的顺序：
 * 1) AiventBodyClass
 * 2) children（模板 body HTML）
 * 3) AiventScriptsServer
 */
export default function DesktopTemplateShell({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <AiventBodyClass />
      {children}
      <AiventScriptsServer />
    </>
  );
}

