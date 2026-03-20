# Themer Docs

This directory contains the documentation website for Themer.

## Docs

Public docs: [lukonik.github.io/themer](https://lukonik.github.io/themer)

## Local Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Library Install

```bash
pnpm add @lonik/themer
```

## Quick Usage

```tsx
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { ThemeProvider } from "@lonik/themer";

export const Route = createRootRoute({
  component: () => (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </body>
    </html>
  ),
});
```

## Example

```tsx
import { useTheme } from "@lonik/themer";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Current theme: {theme}
    </button>
  );
}
```
