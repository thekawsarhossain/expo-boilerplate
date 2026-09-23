import { queryOptions, useQuery } from "@tanstack/react-query";

import { httpClient } from "@/lib/api/http-client";
import type { Episode } from "../types";
import { episodeKeys } from "./keys";

export async function getEpisodesByIds(ids: number[], signal?: AbortSignal): Promise<Episode[]> {
  if (!ids.length) return [];

  const { data } = await httpClient.get<Episode[]>(`/episode/[${ids.join(",")}]`, { signal });
  return data;
}

export function getEpisodesByIdsQueryOptions(ids: number[]) {
  return queryOptions({
    queryKey: episodeKeys.byIds(ids),
    queryFn: ({ signal }) => getEpisodesByIds(ids, signal),
    enabled: ids.length > 0,
  });
}

export function useEpisodesByIds(ids: number[]) {
  return useQuery(getEpisodesByIdsQueryOptions(ids));
}
