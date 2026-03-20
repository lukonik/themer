<div align="center">
  <h1>Themer</h1>
  <p>Theme management for TanStack Router and TanStack Start.</p>
</div>

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/@lonik/themer)](https://www.npmjs.com/package/@lonik/themer)
[![License](https://img.shields.io/npm/l/@lonik/themer)](https://github.com/lukonik/themer)

</div>

## Docs

Full documentation is available at [lukonik.github.io/themer](https://lukonik.github.io/themer).

## Install

```bash
pnpm add @lonik/themer
```

## Quick Usage

Wrap your app with `ThemeProvider`:

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

Use `useTheme` to read and update the current theme:

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

## Example

```tsx
<ThemeProvider
  themes={["light", "dark", "ocean"]}
  defaultTheme="system"
  storage="localStorage"
>
  <App />
</ThemeProvider>
```

For API details and guides, see the [documentation site](https://lukonik.github.io/themer).
