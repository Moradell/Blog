import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    watch: {
      // Reload on markdown file changes
      ignored: ["!content/posts/**"],
    },
  },
});
