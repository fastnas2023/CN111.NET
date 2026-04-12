import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 允许从预览/局域网访问开发资源（HMR 等）
  allowedDevOrigins: [
    "localhost",
    "127.0.0.1",
    "0.0.0.0",
    "192.168.64.208",
    // SOLO 预览域名（用于 dev server 资源加载）
    "run-agent-69d7ea78673941ff71786c14-mnvpc08k-preview.agent-sandbox-my-b1-gw.trae.ai",
  ],
};

export default nextConfig;
