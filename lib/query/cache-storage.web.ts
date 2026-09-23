import type { AsyncStorage } from "@tanstack/query-persist-client-core";

export const cacheStorage: AsyncStorage<string> | undefined =
  typeof window === "undefined" ? undefined : window.localStorage;
