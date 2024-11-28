import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },
  // Ensure react-router works correctly
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
