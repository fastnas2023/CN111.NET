// 兼容 Next.js 注入方式的“兜底初始化”：
// - 某些模板脚本依赖 window.load / DOMContentLoaded，若执行时机略有偏差可能导致动效未启动。
// - 这里在 window.load 后强制触发关键组件的 update/start。
(function () {
  function safe(fn) {
    try {
      fn();
    } catch (e) {
      // 不打断页面
      // eslint-disable-next-line no-console
      console.warn("[aivent] next-init failed:", e);
    }
  }

  window.addEventListener("load", function () {
    safe(function () {
      // Swiper：确保 autoplay running
      var swipers = document.querySelectorAll(".swiper");
      swipers.forEach(function (el) {
        var inst = el && el.swiper ? el.swiper : null;
        if (!inst) return;
        if (typeof inst.update === "function") inst.update();
        if (inst.autoplay && typeof inst.autoplay.start === "function") inst.autoplay.start();
      });
    });

    safe(function () {
      // Marquee：避免重复初始化（重复 .marquee() 会造成嵌套 wrapper，表现为不滚动/卡住）
      if (!(window.jQuery && window.jQuery.fn && window.jQuery.fn.marquee)) return;

      function ensureMarquee(selector, opts) {
        var $el = window.jQuery(selector);
        if (!$el.length) return;

        // 已初始化：尽量恢复（如果插件支持）
        if ($el.find(".js-marquee-wrapper").length) {
          try {
            $el.marquee("resume");
          } catch (e) {}
          return;
        }

        $el.marquee(opts);
      }

      ensureMarquee(".de-marquee-list-1", {
        direction: "right",
        duration: 60000,
        gap: 0,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true,
      });
      ensureMarquee(".de-marquee-list-2", {
        direction: "left",
        duration: 60000,
        gap: 0,
        delayBeforeStart: 0,
        duplicated: true,
        startVisible: true,
      });
    });
  });
})();
