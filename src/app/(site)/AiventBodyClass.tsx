"use client";

import { useEffect } from "react";

/**
 * 原模板通过 `<body class="dark-scheme">` 控制暗色主题。
 * 在 Next.js App Router 下这里用一个轻量的 client 组件来同步 body class。
 */
export function AiventBodyClass() {
  useEffect(() => {
    document.body.classList.add("dark-scheme");
    return () => {
      document.body.classList.remove("dark-scheme");
    };
  }, []);

  return null;
}

