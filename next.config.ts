import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许从预览/局域网访问开发资源（HMR 等）
  allowedDevOrigins: ["localhost", "127.0.0.1", "0.0.0.0", "192.168.64.208"],
};

export default nextConfig;
