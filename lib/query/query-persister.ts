import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";

import { QUERY_PERSIST_THROTTLE_MS } from "@/constants/query";
import { STORAGE_KEYS } from "@/constants/storage";
import { cacheStorage } from "./cache-storage";

export const queryPersister = createAsyncStoragePersister({
  storage: cacheStorage,
  key: STORAGE_KEYS.queryCache,
  throttleTime: QUERY_PERSIST_THROTTLE_MS,
});
