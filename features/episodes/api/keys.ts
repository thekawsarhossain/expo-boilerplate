export const episodeKeys = {
  all: ["episodes"] as const,
  byIds: (ids: number[]) => [...episodeKeys.all, "by-ids", ids] as const,
};
