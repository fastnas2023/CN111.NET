"use client";

import React from "react";
import { IconSprite } from "banli-ui";

// 说明：banli-react-ui 某些组件需要上层 Provider（例如 TooltipProvider）。
// 这里做统一装配，避免页面里散落 Provider。
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <IconSprite />
      {children}
    </>
  );
}
