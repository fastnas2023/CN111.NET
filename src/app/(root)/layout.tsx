export default function RootRedirectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 仅用于 `/` 的重定向；不引入全局样式，避免重复注入。
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

