import { createFileRoute } from "@tanstack/react-router";
import { useTheme } from "tanstack-theme";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/")({
  component: PlaygroundPage,
});

function PlaygroundPage() {
  const { theme, setTheme, resolvedTheme, systemTheme, themes, forcedTheme } =
    useTheme();
  const [mounted, setMounted] = useState(false);
  const [htmlAttributes, setHtmlAttributes] = useState<string>("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const updateAttributes = () => {
      const html = document.documentElement;
      const attrs: string[] = [];

      if (html.className) {
        attrs.push(`class="${html.className}"`);
      }

      Array.from(html.attributes).forEach((attr) => {
        if (attr.name.startsWith("data-") || attr.name === "style") {
          const value =
            attr.value.length > 50
              ? attr.value.substring(0, 50) + "..."
              : attr.value;
          attrs.push(`${attr.name}="${value}"`);
        }
      });

      setHtmlAttributes(attrs.join("\n  "));
    };

    updateAttributes();

    const observer = new MutationObserver(updateAttributes);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme", "data-mode"],
    });

    return () => observer.disconnect();
  }, [mounted]);

  const allThemes = ["light", "dark", "system", "ocean", "forest", "sunset"];

  if (!mounted) {
    return (
      <div className="mx-auto max-w-6xl p-8">
        <div className="mb-12 text-center">
          <h1 className="mb-2 bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-4xl font-bold text-transparent">
            TanStack Theme Playground
          </h1>
          <p className="text-lg text-text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-8">
      <header className="mb-12 text-center">
        <h1 className="mb-2 bg-gradient-to-br from-accent to-accent-hover bg-clip-text text-4xl font-bold text-transparent">
          TanStack Theme Playground
        </h1>
        <p className="text-lg text-text-secondary">
          Test and experiment with different theme configurations
        </p>
      </header>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Theme Switcher */}
        <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Theme Switcher
          </h2>
          <div className="flex flex-wrap gap-3">
            {allThemes.map((t) => (
              <button
                key={t}
                className={`cursor-pointer rounded-lg border-2 px-5 py-3 text-sm font-medium transition-all ${
                  theme === t
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-bg-tertiary text-text-primary hover:border-accent hover:bg-bg-secondary"
                }`}
                onClick={() => setTheme(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Current State */}
        <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            useTheme() State
          </h2>
          {[
            { key: "theme", value: theme },
            { key: "resolvedTheme", value: resolvedTheme },
            { key: "systemTheme", value: systemTheme },
            { key: "themes", value: `[${themes.join(", ")}]` },
            { key: "forcedTheme", value: forcedTheme },
          ].map(({ key, value }, i, arr) => (
            <div
              key={key}
              className={`flex items-center justify-between py-3 ${
                i < arr.length - 1 ? "border-b border-border" : ""
              }`}
            >
              <span className="font-mono text-sm text-text-secondary">
                {key}
              </span>
              <span className="font-mono text-sm font-semibold text-accent">
                {value ?? "undefined"}
              </span>
            </div>
          ))}
        </div>

        {/* DOM Preview */}
        <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            DOM Attributes
          </h2>
          <div className="overflow-x-auto whitespace-pre rounded-lg bg-bg-tertiary p-4 font-mono text-sm">
            <span className="text-accent">{"<html"}</span>
            {htmlAttributes && (
              <>
                {"\n  "}
                {htmlAttributes.split("\n  ").map((attr, i) => {
                  const [name, ...rest] = attr.split("=");
                  const value = rest.join("=");
                  return (
                    <span key={i}>
                      <span className="text-success">{name}</span>
                      {value && (
                        <>
                          =<span className="text-warning">{value}</span>
                        </>
                      )}
                      {"\n  "}
                    </span>
                  );
                })}
              </>
            )}
            <span className="text-accent">{">"}</span>
          </div>
        </div>

        {/* setTheme Examples */}
        <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            setTheme() Examples
          </h2>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              Direct value:
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                className="cursor-pointer rounded-lg border-2 border-border bg-bg-tertiary px-5 py-3 text-sm font-medium text-text-primary transition-all hover:border-accent hover:bg-bg-secondary"
                onClick={() => setTheme("light")}
              >
                setTheme("light")
              </button>
              <button
                className="cursor-pointer rounded-lg border-2 border-border bg-bg-tertiary px-5 py-3 text-sm font-medium text-text-primary transition-all hover:border-accent hover:bg-bg-secondary"
                onClick={() => setTheme("dark")}
              >
                setTheme("dark")
              </button>
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-text-secondary">
              With callback:
            </label>
            <button
              className="w-full cursor-pointer rounded-lg border-2 border-border bg-bg-tertiary px-5 py-3 text-sm font-medium text-text-primary transition-all hover:border-accent hover:bg-bg-secondary"
              onClick={() =>
                setTheme((prev) => (prev === "dark" ? "light" : "dark"))
              }
            >
              Toggle (current: {theme})
            </button>
          </div>
        </div>

        {/* UI Preview */}
        <div className="col-span-full rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            UI Components Preview
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Card Component
              </h3>
              <p className="text-sm text-text-secondary">
                This is how a card looks with the current theme.
              </p>
              <button className="mt-4 cursor-pointer rounded-md bg-accent px-4 py-2 text-sm text-white transition-colors hover:bg-accent-hover">
                Action Button
              </button>
            </div>

            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Form Elements
              </h3>
              <p className="text-sm text-text-secondary">
                Test form elements with different themes:
              </p>
              <input
                type="text"
                placeholder="Text input"
                className="mt-3 w-full rounded-md border border-border bg-bg-secondary px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
              />
            </div>

            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Color Palette
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  { name: "Primary", color: "bg-bg-primary" },
                  { name: "Secondary", color: "bg-bg-secondary" },
                  { name: "Tertiary", color: "bg-bg-tertiary" },
                  { name: "Accent", color: "bg-accent" },
                ].map((c) => (
                  <div
                    key={c.name}
                    className={`h-10 w-10 rounded-lg border border-border ${c.color}`}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Text Styles
              </h3>
              <p className="my-1 text-text-primary">Primary text</p>
              <p className="my-1 text-text-secondary">Secondary text</p>
              <p className="my-1 text-text-muted">Muted text</p>
            </div>
          </div>
        </div>

        {/* Configuration Examples */}
        <div className="col-span-full rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Configuration Examples
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Basic Setup
              </h3>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-bg-secondary p-4 font-mono text-xs text-text-secondary">
                {`<ThemeProvider>
  <App />
</ThemeProvider>`}
              </pre>
            </div>

            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Custom Themes
              </h3>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-bg-secondary p-4 font-mono text-xs text-text-secondary">
                {`<ThemeProvider
  themes={["light", "dark", "ocean"]}
  defaultTheme="system"
>
  <App />
</ThemeProvider>`}
              </pre>
            </div>

            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Data Attribute
              </h3>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-bg-secondary p-4 font-mono text-xs text-text-secondary">
                {`<ThemeProvider
  attribute="data-theme"
  defaultTheme="dark"
>
  <App />
</ThemeProvider>`}
              </pre>
            </div>

            <div className="rounded-lg bg-bg-tertiary p-5">
              <h3 className="mb-3 font-semibold text-text-primary">
                Session Storage
              </h3>
              <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-bg-secondary p-4 font-mono text-xs text-text-secondary">
                {`<ThemeProvider
  storage="sessionStorage"
  storageKey="app-theme"
>
  <App />
</ThemeProvider>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Storage Test */}
        <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Storage Test
          </h2>
          <p className="mb-4 text-text-secondary">
            Current storage key: <code className="text-accent">theme</code>
          </p>
          <div className="flex items-center justify-between border-b border-border py-3">
            <span className="font-mono text-sm text-text-secondary">
              localStorage
            </span>
            <span className="font-mono text-sm font-semibold text-accent">
              {typeof window !== "undefined"
                ? localStorage.getItem("theme") ?? "null"
                : "N/A"}
            </span>
          </div>
          <button
            className="mt-4 w-full cursor-pointer rounded-md border border-border bg-transparent px-4 py-3 text-sm text-text-secondary transition-colors hover:border-accent hover:text-accent"
            onClick={() => {
              localStorage.removeItem("theme");
              setTheme("system");
            }}
          >
            Clear Storage & Reset to System
          </button>
        </div>

        {/* Cross-Tab Sync Test */}
        <div className="rounded-xl border border-border bg-bg-secondary p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Cross-Tab Sync
          </h2>
          <p className="text-text-secondary">
            Open this page in another tab and change the theme. Both tabs should
            sync automatically via the storage event listener.
          </p>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-lg bg-bg-tertiary p-4 font-mono text-xs text-text-secondary">
            {`// The storage adapter handles cross-tab sync:
storage.subscribe?.("theme", (newValue) => {
  setTheme(newValue ?? defaultTheme);
});`}
          </pre>
        </div>
      </div>
    </div>
  );
}
