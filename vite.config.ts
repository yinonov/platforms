import { defineConfig } from "vite";
import checker from "vite-plugin-checker";

export default defineConfig({
  plugins: [
    checker({ typescript: true }),
    // שאר הפלגינים שלך
  ],
  build: { target: "es2015", outDir: "dist" },
});
