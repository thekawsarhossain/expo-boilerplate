import { infiniteQueryOptions, keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";

import { FIRST_PAGE } from "@/constants/api";
import { ApiError } from "@/lib/api/api-error";
import { httpClient } from "@/lib/api/http-client";
import { createEmptyPage, getNextPageNumber } from "@/lib/utils";
import type { PaginatedResponse } from "@/types/api";
import type { Character, CharacterFilters } from "../types";
import { characterKeys } from "./keys";

type GetCharactersParams = {
  page: number;
  filters: CharacterFilters;
  signal?: AbortSignal;
};

export async function getCharacters({
  page,
  filters,
  signal,
}: GetCharactersParams): Promise<PaginatedResponse<Character>> {
  try {
    const { data } = await httpClient.get<PaginatedResponse<Character>>("/character", {
      params: { page, name: filters.name || undefined, status: filters.status },
      signal,
    });
    return data;
  } catch (error) {
    if (error instanceof ApiError && error.isNotFound) return createEmptyPage<Character>();
    throw error;
  }
}

export function getCharactersQueryOptions(filters: CharacterFilters) {
  return infiniteQueryOptions({
    queryKey: characterKeys.list(filters),
    queryFn: ({ pageParam, signal }) => getCharacters({ page: pageParam, filters, signal }),
    initialPageParam: FIRST_PAGE,
    getNextPageParam: (lastPage, _allPages, lastPageNumber) =>
      getNextPageNumber(lastPage, lastPageNumber),
  });
}

export function useCharacters(filters: CharacterFilters) {
  return useInfiniteQuery({
    ...getCharactersQueryOptions(filters),
    select: (data) => data.pages.flatMap((page) => page.results),
    placeholderData: keepPreviousData,
  });
}
