"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";
import {
  disableAnimation,
  getSystemTheme,
  handleAttribute,
  isServer,
  MEDIA
} from "./dom-utils";
import { ThemeScript } from "./script/theme-script";
import { getStorageAdapter } from "./storage/storage";
import type { ThemeProviderProps, UseThemeProps } from "./types";

const colorSchemes = ["light", "dark"];
const ThemeContext = createContext<UseThemeProps | undefined>(undefined);
const defaultContext: UseThemeProps = { setTheme: (_) => {}, themes: [] };

export const useTheme = () => useContext(ThemeContext) ?? defaultContext;

export const ThemeProvider = (props: ThemeProviderProps) => {
  const context = useContext(ThemeContext);

  // Ignore nested context providers, just passthrough children
  if (context) return <>{props.children}</>;
  return <Theme {...props} />;
};

const defaultThemes = ["light", "dark"];

const Theme = ({
  forcedTheme,
  disableTransitionOnChange = false,
  enableSystem = true,
  enableColorScheme = true,
  storageKey = "theme",
  themes = defaultThemes,
  defaultTheme = enableSystem ? "system" : "light",
  attribute = "data-theme",
  value,
  children,
  nonce,
  scriptProps,
  storage = "localStorage",
}: ThemeProviderProps) => {
  const storageAdapter = useMemo(() => getStorageAdapter(storage), [storage]);

  const [theme, setThemeState] = useState(() => {
    if (isServer) return defaultTheme;
    return storageAdapter.getItem(storageKey) || defaultTheme;
  });
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    theme === "system" ? getSystemTheme() : theme,
  );
  const attrs = !value ? themes : Object.values(value);

  const applyTheme = useCallback(
    (theme: any) => {
      let resolved = theme;
      if (!resolved) return;

      // If theme is system, resolve it before setting theme
      if (theme === "system" && enableSystem) {
        resolved = getSystemTheme();
      }

      const name = value ? value[resolved] : resolved;
      const enable = disableTransitionOnChange ? disableAnimation(nonce) : null;
      const d = document.documentElement;

      if (Array.isArray(attribute)) {
        attribute.forEach((attr) => handleAttribute(attr, d, attrs, name));
      } else {
        handleAttribute(attribute, d, attrs, name);
      }

      if (enableColorScheme) {
        const fallback = colorSchemes.includes(defaultTheme)
          ? defaultTheme
          : null;
        const colorScheme = colorSchemes.includes(resolved)
          ? resolved
          : fallback;
        // @ts-ignore
        d.style.colorScheme = colorScheme;
      }

      enable?.();
    },
    [nonce],
  );

  const setTheme = useCallback(
    (value: any) => {
      if (typeof value === "function") {
        setThemeState((prevTheme) => {
          const newTheme = value(prevTheme);
          storageAdapter.setItem(storageKey, newTheme);
          return newTheme;
        });
      } else {
        setThemeState(value);
        storageAdapter.setItem(storageKey, value);
      }
    },
    [storageAdapter, storageKey],
  );

  const handleMediaQuery = useCallback(
    (e: MediaQueryListEvent | MediaQueryList) => {
      const resolved = getSystemTheme(e);
      setResolvedTheme(resolved);

      if (theme === "system" && enableSystem && !forcedTheme) {
        applyTheme("system");
      }
    },
    [theme, forcedTheme],
  );

  // Always listen to System preference
  useEffect(() => {
    const media = window.matchMedia(MEDIA);

    media.addEventListener("change", handleMediaQuery);
    handleMediaQuery(media);

    return () => media.removeEventListener("change", handleMediaQuery);
  }, [handleMediaQuery]);

  // Cross-tab sync via storage adapter's subscribe method
  useEffect(() => {
    if (!storageAdapter.subscribe) return;

    return storageAdapter.subscribe(storageKey, (newValue) => {
      // If default theme set, use it if storage === null (happens on storage manual deletion)
      if (!newValue) {
        setTheme(defaultTheme);
      } else {
        setThemeState(newValue); // Direct state update to avoid loops
      }
    });
  }, [storageAdapter, storageKey, defaultTheme, setTheme]);

  // Whenever theme or forcedTheme changes, apply it
  useEffect(() => {
    applyTheme(forcedTheme ?? theme);
  }, [forcedTheme, theme]);

  const providerValue = useMemo(
    () => ({
      theme,
      setTheme,
      forcedTheme,
      resolvedTheme: theme === "system" ? resolvedTheme : theme,
      themes: enableSystem ? [...themes, "system"] : themes,
      systemTheme: (enableSystem ? resolvedTheme : undefined) as
        | "light"
        | "dark"
        | undefined,
    }),
    [theme, setTheme, forcedTheme, resolvedTheme, enableSystem, themes],
  );

  return (
    <ThemeContext.Provider value={providerValue}>
      <ThemeScript
        {...{
          forcedTheme,
          storageKey,
          attribute,
          enableSystem,
          enableColorScheme,
          defaultTheme,
          value,
          themes,
          nonce,
          scriptProps,
          storage,
        }}
      />

      {children}
    </ThemeContext.Provider>
  );
};

// Re-export types
export type {
  Attribute,
  BuiltInStorage,
  ThemeProviderProps,
  ThemeStorage,
  UseThemeProps
} from "./types";

