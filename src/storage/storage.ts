import {
  cookieStorageScript,
  localStorageScript,
  sessionStorageScript,
} from "@lonik/themer";
import type { BuiltInStorage, ThemeStorage } from "../types";
import { cookieStorageAdapter } from "./cookie-storage";
import { localStorageAdapter } from "./local-storage";
import { sessionStorageAdapter } from "./session-storage";

export const isBuiltInStorage = (
  storage: BuiltInStorage | ThemeStorage | undefined,
): storage is BuiltInStorage => {
  return (
    storage === undefined ||
    storage === "localStorage" ||
    storage === "sessionStorage" ||
    storage === "cookie"
  );
};

export const getStorageAdapter = (
  storage: BuiltInStorage | ThemeStorage = "localStorage",
): ThemeStorage => {
  if (!isBuiltInStorage(storage)) {
    return storage;
  }
  switch (storage) {
    case "sessionStorage":
      return sessionStorageAdapter;
    case "cookie":
      return cookieStorageAdapter;
    case "localStorage":
    default:
      return localStorageAdapter;
  }
};

export const getStorageScript = (
  storage: BuiltInStorage | ThemeStorage | undefined,
) => {
  const type = isBuiltInStorage(storage) ? storage : undefined;
  switch (type) {
    case "sessionStorage":
      return sessionStorageScript;
    case "cookie":
      return cookieStorageScript;
    case "localStorage":
      return localStorageScript;
    case undefined:
    default:
      return undefined;
  }
};
