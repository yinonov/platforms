import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [checker({ typescript: true }), tsconfigPaths()],
  resolve: {
    alias: {
      "@app": "/src/app",
      "@features": "/src/features",
      "@services": "/src/services",
    },
  },
  build: { target: "es2015", outDir: "dist" },
});
