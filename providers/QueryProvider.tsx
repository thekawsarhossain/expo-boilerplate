import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { type PropsWithChildren, useEffect } from "react";

import { appConfig } from "@/config/app";
import { QUERY_CACHE_MAX_AGE_MS } from "@/constants/query";
import { queryClient } from "@/lib/query/query-client";
import { registerQueryManagers } from "@/lib/query/query-managers";
import { queryPersister } from "@/lib/query/query-persister";

const persistOptions = {
  persister: queryPersister,
  maxAge: QUERY_CACHE_MAX_AGE_MS,
  buster: appConfig.version,
};

export function QueryProvider({ children }: PropsWithChildren) {
  useEffect(() => registerQueryManagers(), []);

  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={persistOptions}>
      {children}
    </PersistQueryClientProvider>
  );
}
