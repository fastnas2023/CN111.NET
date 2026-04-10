import type { Metadata } from "next";
import "./globals.scss";
import "banli-ui/styles.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AppProviders } from "@/components/providers/AppProviders";
import { AiventHeadAssets } from "./(site)/AiventHeadAssets";

export const metadata: Metadata = {
  title: "CN111.NET",
  description: "CN111.NET (Next.js + banli-ui + SCSS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <AiventHeadAssets />
      </head>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
