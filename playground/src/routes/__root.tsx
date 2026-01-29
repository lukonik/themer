import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

import { ThemeProvider } from "tanstack-theme";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider
        themes={["light", "dark", "ocean", "forest", "sunset"]}
        defaultTheme="system"
        attribute="data-theme"
        enableSystem
        enableColorScheme
      >
        <Outlet />
      </ThemeProvider>
    </React.Fragment>
  );
}
