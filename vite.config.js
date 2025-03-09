import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    // host: "217.15.175.61",
    host: "10.0.70.206",
  },
});
