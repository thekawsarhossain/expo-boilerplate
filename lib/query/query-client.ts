import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { QUERY_CACHE_MAX_AGE_MS, QUERY_RETRY_COUNT, QUERY_STALE_TIME_MS } from "@/constants/query";
import { getErrorMessage } from "@/lib/api/api-error";
import { toast } from "@/lib/toast";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const isShowingCachedData = query.state.data !== undefined;
      if (isShowingCachedData) toast.error(getErrorMessage(error));
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => toast.error(getErrorMessage(error)),
  }),
  defaultOptions: {
    queries: {
      staleTime: QUERY_STALE_TIME_MS,
      gcTime: QUERY_CACHE_MAX_AGE_MS,
      retry: QUERY_RETRY_COUNT,
    },
  },
});
