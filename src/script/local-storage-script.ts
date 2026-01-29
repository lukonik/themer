import type { ThemeScript } from "../types";

export const script: ThemeScript = (
  attribute: any,
  storageKey: any,
  defaultTheme: any,
  forcedTheme: any,
  themes: any,
  value: any,
  enableSystem: any,
  enableColorScheme: any,
) => {
  const el = document.documentElement;
  const systemThemes = ["light", "dark"];
  function updateDOM(theme: string) {
    const attributes = Array.isArray(attribute) ? attribute : [attribute];

    attributes.forEach((attr) => {
      const isClass = attr === "class";
      const classes =
        isClass && value ? themes.map((t: any) => value[t] || t) : themes;
      if (isClass) {
        el.classList.remove(...classes);
        el.classList.add(value && value[theme] ? value[theme] : theme);
      } else {
        el.setAttribute(attr, theme);
      }
    });

    setColorScheme(theme);
  }

  function setColorScheme(theme: string) {
    if (enableColorScheme && systemThemes.includes(theme)) {
      el.style.colorScheme = theme;
    }
  }

  function getSystemTheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  if (forcedTheme) {
    updateDOM(forcedTheme);
  } else {
    try {
      const themeName = localStorage.getItem(storageKey) || defaultTheme;
      const isSystem = enableSystem && themeName === "system";
      const theme = isSystem ? getSystemTheme() : themeName;
      updateDOM(theme);
    } catch (e) {
      //
    }
  }
};
