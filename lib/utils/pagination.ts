import type { PaginatedResponse } from "@/types/api";

export function createEmptyPage<T>(): PaginatedResponse<T> {
  return {
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
  };
}

export function getNextPageNumber(
  { info }: PaginatedResponse<unknown>,
  currentPage: number,
): number | undefined {
  return info.next ? currentPage + 1 : undefined;
}
