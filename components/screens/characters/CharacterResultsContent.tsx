import { EmptyView } from "@/components/shared/EmptyView";
import { ErrorView } from "@/components/shared/ErrorView";
import type { CharacterFilters } from "@/features/characters";
import { useCharacters } from "@/features/characters";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { CharacterGrid } from "./CharacterGrid";
import { CharacterGridSkeleton } from "./CharacterGridSkeleton";

type CharacterResultsContentProps = {
  filters: CharacterFilters;
};

export function CharacterResultsContent({ filters }: CharacterResultsContentProps) {
  const {
    data: characters = [],
    error,
    isPending,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useCharacters(filters);
  const { isRefreshingByUser, refreshByUser } = useRefreshByUser(refetch);

  function loadNextPage() {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }

  if (isPending) return <CharacterGridSkeleton />;
  if (error && !characters.length) return <ErrorView error={error} onRetry={refetch} />;

  return (
    <CharacterGrid
      characters={characters}
      isRefreshing={isRefreshingByUser}
      onRefresh={refreshByUser}
      onEndReached={loadNextPage}
      isFetchingMore={isFetchingNextPage}
      emptyComponent={
        <EmptyView title="No characters found" description="Try a different name or status." />
      }
    />
  );
}
