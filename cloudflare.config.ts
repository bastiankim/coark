import { bindings, defineConfig, defineWorker } from "cf/config";

export default defineConfig({
  worker: defineWorker({
    name: "coark-app",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-10-13",
    compatibilityFlags: ["nodejs_compat"],
    assets: { notFoundHandling: "none" },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      // Request-access sign-ups from POST /api/access.
      ACCESS_REQUESTS: bindings.kv(),
    },
  }),
});
