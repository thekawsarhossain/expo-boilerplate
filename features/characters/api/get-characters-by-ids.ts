import { keepPreviousData, queryOptions, useQuery } from "@tanstack/react-query";

import { httpClient } from "@/lib/api/http-client";
import type { Character } from "../types";
import { characterKeys } from "./keys";

export async function getCharactersByIds(
  ids: number[],
  signal?: AbortSignal,
): Promise<Character[]> {
  if (!ids.length) return [];

  const { data } = await httpClient.get<Character[]>(`/character/[${ids.join(",")}]`, { signal });
  return data;
}

export function getCharactersByIdsQueryOptions(ids: number[]) {
  return queryOptions({
    queryKey: characterKeys.byIds(ids),
    queryFn: ({ signal }) => getCharactersByIds(ids, signal),
    enabled: ids.length > 0,
  });
}

export function useCharactersByIds(ids: number[]) {
  return useQuery({
    ...getCharactersByIdsQueryOptions(ids),
    placeholderData: keepPreviousData,
  });
}
