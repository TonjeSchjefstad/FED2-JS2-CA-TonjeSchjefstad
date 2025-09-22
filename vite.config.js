import { defineConfig } from "vite";

export default defineConfig({
  appType: "spa",
  base: "",
  build: {
    target: "esnext",
    rollupOptions: {
      input: {
        input: "index.html",
      },
    },
  },
});
