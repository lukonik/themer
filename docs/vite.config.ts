import { prestige } from "@lonik/prestige/vite";
import { devtools } from "@tanstack/devtools-vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

import { tanstackStart } from "@tanstack/react-start/plugin/vite";

import { ohImage } from "@lonik/oh-image/plugin";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
const config = defineConfig({
  base: "/themer/",
  plugins: [
    ohImage({
      outDir: ".output/public",
    }),
    prestige({
      title: "Themer",
      collections: [
        {
          id: "docs",
          items: [
            {
              label: "Get Started",
              slug: "docs/get-started",
            },
            {
              label: "Hydration",
              slug: "docs/hydration",
            },

            {
              label: "Guides",
              items: [
                {
                  label: "Tailwind",
                  slug: "docs/tailwind",
                },
                {
                  label: "Multi Theming",
                  slug: "docs/multi-theming",
                },
                {
                  label: "Storage",
                  slug: "docs/storage",
                },
              ],
            },
            {
              label: "References",
              items: [
                {
                  label: "ThemeProvider Reference",
                  slug: "docs/theme-provider-reference",
                },
                {
                  label: "useTheme Reference",
                  slug: "docs/use-theme-reference",
                },
              ],
            },
          ],
        },
      ],
    }),
    devtools(),
    nitro({
      rollupConfig: { external: [/^@sentry\//] },
      renderer: false,
      baseURL: "/themer",
    }),
    tsconfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
      },
      sitemap: { enabled: true, host: "https://lukonik.github.io/themer/" },
    }),
    viteReact(),
  ],
});

export default config;
