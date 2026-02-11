import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

import { ThemeProvider } from "@lonik/themer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider
        themes={["light", "dark", "ocean", "forest", "sunset"]}
        defaultTheme="system"
        enableSystem
        enableColorScheme
      >
        <Outlet />
      </ThemeProvider>
    </React.Fragment>
  );
}
