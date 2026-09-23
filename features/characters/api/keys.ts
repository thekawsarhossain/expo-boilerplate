import type { CharacterFilters } from "../types";

export const characterKeys = {
  all: ["characters"] as const,
  lists: () => [...characterKeys.all, "list"] as const,
  list: (filters: CharacterFilters) => [...characterKeys.lists(), filters] as const,
  detail: (id: number) => [...characterKeys.all, "detail", id] as const,
  byIds: (ids: number[]) => [...characterKeys.all, "by-ids", ids] as const,
};
