"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

function isOneOf(pathname: string, list: readonly string[]) {
  return list.includes(pathname);
}

/**
 * 以模板原始顺序（vendors -> designesia -> page scripts）加载脚本。
 *
 * 关键点：
 * - 模板的初始化大多挂在 DOMContentLoaded / window.load 上；
 * - 如果脚本在页面已完成交互（afterInteractive）之后才注入，可能错过这些事件，导致“没有动效”。
 * - 因此 vendors / designesia 使用 beforeInteractive 提前加载，确保初始化能正常触发。
 */
export function AiventScripts() {
  const pathname = usePathname() ?? "/";

  const needsCountdownAndMarquee = isOneOf(pathname, [
    "/",
    "/index-countdown",
    "/index-static-background",
    "/index-slider",
    "/index-slider-text",
  ]);

  const needsSwiper = isOneOf(pathname, ["/index-slider", "/index-slider-text"]);

  const needsContactValidation = pathname === "/contact";

  return (
    <>
      <Script
        id="aivent-vendors"
        src="/aivent/js/vendors.js"
        strategy="beforeInteractive"
      />
      <Script
        id="aivent-designesia"
        src="/aivent/js/designesia.js"
        strategy="beforeInteractive"
      />

      {needsCountdownAndMarquee ? (
        <>
          <Script
            id="aivent-countdown"
            src="/aivent/js/countdown-custom.js"
            strategy="afterInteractive"
          />
          <Script
            id="aivent-marquee"
            src="/aivent/js/custom-marquee.js"
            strategy="afterInteractive"
          />
        </>
      ) : null}

      {needsSwiper ? (
        <Script
          id="aivent-swiper"
          src="/aivent/js/swiper.js"
          strategy="afterInteractive"
        />
      ) : null}

      {needsContactValidation ? (
        <Script
          id="aivent-contact-validation"
          src="/aivent/js/validation-contact.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
