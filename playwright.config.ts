import { defineConfig, devices } from "@playwright/test";

const PORT = Number.parseInt(process.env.PORT ?? "3000", 10);
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? `http://127.0.0.1:${PORT}`;

export default defineConfig({
  testDir: "./tests",
  outputDir: "test-results",
  timeout: 60_000,
  expect: {
    timeout: 10_000,
  },
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "on-first-retry",
    // 避免默认生成大量媒体文件；本任务的截图由测试显式控制输出路径
    screenshot: "off",
    video: "off",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: {
    // next dev 的 CLI 参数需使用 -p/--port（避免被当作项目目录参数）
    command: `pnpm dev -p ${PORT}`,
    url: baseURL,
    // 该仓库在本地/CI 可能已有 dev server（或被其他进程占用），优先复用，避免端口占用导致测试直接失败
    reuseExistingServer: true,
    timeout: 120_000,
  },
});
