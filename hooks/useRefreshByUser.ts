import { useCallback, useState } from "react";

export function useRefreshByUser(refetch: () => Promise<unknown>) {
  const [isRefreshingByUser, setIsRefreshingByUser] = useState(false);

  const refreshByUser = useCallback(async () => {
    setIsRefreshingByUser(true);
    try {
      await refetch();
    } finally {
      setIsRefreshingByUser(false);
    }
  }, [refetch]);

  return { isRefreshingByUser, refreshByUser };
}
