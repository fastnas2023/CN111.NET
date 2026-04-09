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

export const metadata: Metadata = {
  title: "Aivent Clone",
  description: "Aivent HTML clone (Next.js + banli-react-ui + SCSS)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
