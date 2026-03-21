import { defineConfig } from "@lonik/prestige/vite";

export default defineConfig({
  title: "Themer",
  license: {
    label: "MIT",
    url: "https://opensource.org/licenses/MIT",
  },
  github: "https://github.com/lukonik/themer",
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
      ],
    },
  ],
});
