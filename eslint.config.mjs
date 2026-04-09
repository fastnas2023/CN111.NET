import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // This repo vendors banli-ui as a local dependency; lint it in its own package.
    "vendor/banli-ui/**",
    // Static template assets (legacy JS) - not part of the Next.js codebase.
    "public/**",
  ]),
]);

export default eslintConfig;
