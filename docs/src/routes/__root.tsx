import type { PrestigeShellProps } from "@lonik/prestige/ui";
import { PrestigeShell } from "@lonik/prestige/ui";
import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import config from "virtual:prestige/config";
import appCss from "../styles.css?url";
import HeaderLogo from "../assets/logo.png?$oh";

const siteUrl = "https://lukonik.github.io/themer";
const siteTitle = "Themer";
const siteDescription =
  "Theme management for TanStack Router and TanStack Start with SSR support, zero FOUC, system theme detection, and flexible storage adapters.";
const siteImage = `${siteUrl}/logo512.png`;

const options: PrestigeShellProps = {
  customHeaderTitle: () => (
    <HeaderLogo alt="header logo" className="w-10 h-10" />
  ),
  copyright: () => (
    <a
      className="underline"
      href="https://github.com/lukonik/Prestige"
      target="_blank"
      rel="noreferrer"
    >
      Built with Prestige 🎩
    </a>
  ),
  license: {
    label: "MIT",
    url: "https://opensource.org/licenses/MIT",
  },
  github: "https://github.com/lukonik/themer",
};

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: config.title },
      { name: "description", content: siteDescription },
      {
        name: "keywords",
        content:
          "themer, react theme, tanstack router, tanstack start, dark mode, light mode, theme provider, useTheme, SSR, FOUC",
      },
      { name: "robots", content: "index, follow" },
      { name: "theme-color", content: "#0f766e" },
      { name: "application-name", content: siteTitle },
      { property: "og:site_name", content: siteTitle },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_US" },
      { property: "og:title", content: siteTitle },
      { property: "og:description", content: siteDescription },
      { property: "og:image", content: siteImage },
      { property: "og:image:alt", content: "Themer logo" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: siteTitle },
      { name: "twitter:description", content: siteDescription },
      { name: "twitter:image", content: siteImage },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/themer/favicon.ico" },
      { rel: "apple-touch-icon", href: "/themer/logo192.png" },
      { rel: "manifest", href: "/themer/manifest.json" },
    ],
  }),
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PrestigeShell options={options}>
          <Outlet />
        </PrestigeShell>
        <Scripts />
      </body>
    </html>
  ),
});
