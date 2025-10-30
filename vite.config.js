import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  appType: "spa",
  base: "",
  plugins: [tailwindcss()],
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        input: "index.html",
      },
    },
  },
});
