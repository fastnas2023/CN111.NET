"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

function isOneOf(pathname: string, list: readonly string[]) {
  return list.includes(pathname);
}

/**
 * 以模板原始顺序（vendors -> designesia -> page scripts）加载脚本。
 *
 * 注意：这些脚本依赖 jQuery（在 vendors.js 内），且模板原始写法是在 body 末尾加载。
 * 所以这里使用 `strategy="afterInteractive"`，避免在 SSR/流式渲染阶段抢跑。
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
        strategy="afterInteractive"
      />
      <Script
        id="aivent-designesia"
        src="/aivent/js/designesia.js"
        strategy="afterInteractive"
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

