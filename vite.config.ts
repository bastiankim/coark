import { defineConfig } from "vite";
import vinext from "vinext";
import { cloudflare } from "@cloudflare/vite-plugin";
import { imagesOptimizer } from "@vinext/cloudflare/images/images-optimizer";

export default defineConfig({
  // Radix Themes default-imports the CommonJS `classnames` package; Vite 8 needs the legacy interop for it.
  legacy: { inconsistentCjsInterop: true },
  // ...and the browser needs it pre-bundled to ESM, not served raw from node_modules.
  optimizeDeps: { include: ['@radix-ui/themes > classnames'] },
  plugins: [
    vinext({
      images: { optimizer: imagesOptimizer() },
    }),
    cloudflare({
      viteEnvironment: {
        name: "rsc",
        childEnvironments: ["ssr"],
      },
    }),
  ],
});
