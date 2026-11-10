import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"], // ✅ Sirf unit tests chalayega
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // ✅ @ alias fix
    },
  },
});