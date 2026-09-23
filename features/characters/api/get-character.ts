import { queryOptions, useQuery } from "@tanstack/react-query";

import { httpClient } from "@/lib/api/http-client";
import type { Character } from "../types";
import { characterKeys } from "./keys";

export async function getCharacter(id: number, signal?: AbortSignal): Promise<Character> {
  const { data } = await httpClient.get<Character>(`/character/${id}`, { signal });
  return data;
}

export function getCharacterQueryOptions(id: number) {
  return queryOptions({
    queryKey: characterKeys.detail(id),
    queryFn: ({ signal }) => getCharacter(id, signal),
    enabled: Number.isInteger(id),
  });
}

export function useCharacter(id: number) {
  return useQuery(getCharacterQueryOptions(id));
}
