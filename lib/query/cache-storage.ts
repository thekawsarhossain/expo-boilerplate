import type { AsyncStorage } from "@tanstack/query-persist-client-core";
import Storage from "expo-sqlite/kv-store";

export const cacheStorage: AsyncStorage<string> = {
  getItem: (key) => Storage.getItem(key),
  setItem: (key, value) => Storage.setItem(key, value),
  removeItem: async (key) => {
    await Storage.removeItem(key);
  },
};
