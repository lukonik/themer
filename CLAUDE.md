# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a React theme management library specifically designed for TanStack Router. It provides a `ThemeProvider` component and `useTheme` hook for managing light/dark/system themes with SSR support and no flash of unstyled content (FOUC).

## Commands

```bash
bun install          # Install dependencies
bun run build        # Build library with tsdown
bun run dev          # Watch mode for development
bun run play         # Run playground (Vite dev server)
bun run test         # Run browser tests (Vitest + Playwright)
bun run typecheck    # TypeScript type checking
```

## Architecture

### Core Module (`src/theme.tsx`)
- `ThemeProvider` - React context provider that manages theme state, applies theme to DOM, and handles system preference changes
- `useTheme` - Hook returning current theme, setTheme function, resolved theme, and available themes
- Nested ThemeProviders are ignored (passthrough to first parent)

### Storage System (`src/storage/`)
Three built-in storage adapters with cross-tab sync support:
- `localStorage` (default) - Persists across sessions
- `sessionStorage` - Session-only persistence
- `cookie` - Cookie-based persistence for SSR scenarios

Custom storage adapters can be provided via the `ThemeStorage` interface.

### FOUC Prevention (`src/script/`)
Each storage type has a corresponding inline script that runs before React hydration to set the initial theme. Scripts are injected via `ThemeScript` component using `ScriptOnce`.

### ScriptOnce (`src/ScriptOnce.tsx`)
Custom implementation extending TanStack Router's ScriptOnce to support passing attributes to the script tag (needed for CSP nonce support).

### DOM Utilities (`src/dom-utils.ts`)
- `handleAttribute` - Sets theme via `data-*` attribute or CSS class
- `disableAnimation` - Temporarily disables CSS transitions during theme changes
- `getSystemTheme` - Reads system color scheme preference

## Key Design Patterns

- Theme is applied to `document.documentElement` via configurable attribute (`data-theme`, `class`, etc.)
- System theme preference is resolved at runtime via `matchMedia`
- Library self-imports (`tanstack-themer`) via Vite alias for development - see `vite.config.ts`
