import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

import { generateRouteHtml } from "./scripts/generate-route-html.mjs";
import { roroDevApi } from "./server/vite-roro-plugin.mjs";

const staticRouteSeo = {
  name: "static-route-seo",
  apply: "build",
  closeBundle() {
    return generateRouteHtml();
  },
};

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      roroDevApi({
        apiKey: process.env.GEMINI_API_KEY || env.GEMINI_API_KEY,
        model: process.env.GEMINI_MODEL || env.GEMINI_MODEL,
      }),
      staticRouteSeo,
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    publicDir: "public",
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 4173,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/test/setup.ts",
      css: true,
      testTimeout: 15000,
    },
  };
});
