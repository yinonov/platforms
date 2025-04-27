import { defineConfig } from "vite";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [checker({ typescript: true }), tsconfigPaths()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@pages": "/src/app/pages", // Updated to include "app"
      "@services": "/src/services",
      "@models": "/src/models",
      "@templates": "/src/templates",
      "@context": "/src/context",
      "@constants": "/src/constants",
      "@utils": "/src/utils",
      "@app": "/src/app",
    },
  },
  build: { target: "es2015", outDir: "dist" },
});
