import type { ThemeStorage } from "../types";

const CHANNEL_PREFIX = "tanstack-themer:";

export const sessionStorageAdapter: ThemeStorage = {
  getItem: (key) => {
    try {
      return sessionStorage.getItem(key);
    } catch {
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      sessionStorage.setItem(key, value);
      // Broadcast to other tabs since sessionStorage doesn't fire cross-tab events
      const channel = new BroadcastChannel(CHANNEL_PREFIX + key);
      channel.postMessage(value);
      channel.close();
    } catch {
      // Unsupported
    }
  },
  removeItem: (key) => {
    try {
      sessionStorage.removeItem(key);
    } catch {
      // Unsupported
    }
  },
  subscribe: (key, callback) => {
    const channel = new BroadcastChannel(CHANNEL_PREFIX + key);
    const handler = (e: MessageEvent) => {
      callback(e.data);
    };
    channel.addEventListener("message", handler);
    return () => {
      channel.removeEventListener("message", handler);
      channel.close();
    };
  },
};
