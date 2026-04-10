/**
 * 模板脚本统一注入（服务端组件）。
 *
 * 为什么不用客户端 + usePathname 按需加载：
 * - 模板的初始化很多是监听 DOMContentLoaded / window.load；
 * - 如果脚本在 React 已经挂载后才注入，可能错过这些事件，导致“全没动效”。
 *
 * 重要：next/script 在 App Router 某些情况下会被优化成 preload 而不真正插入 <script>，
 * 会导致脚本根本不执行（表现为“全没动效”）。
 *
 * 因此这里直接输出原生 <script> 标签，放在 body 底部，顺序与模板一致，
 * 保证 DOMContentLoaded/window.load 的初始化逻辑不丢。
 */
export function AiventScriptsServer() {
  return (
    <>
      <script src="/aivent/js/vendors.js"></script>
      <script src="/aivent/js/designesia.js"></script>
      <script src="/aivent/js/swiper.js"></script>
      <script src="/aivent/js/custom-swiper-1.js"></script>
      <script src="/aivent/js/countdown-custom.js"></script>
      <script src="/aivent/js/custom-marquee.js"></script>
      <script src="/aivent/js/validation-contact.js"></script>
      <script src="/aivent/js/next-init.js"></script>
    </>
  );
}
