import { CharacterGrid } from "@/components/screens/characters/CharacterGrid";
import { CharacterGridSkeleton } from "@/components/screens/characters/CharacterGridSkeleton";
import { EmptyView } from "@/components/shared/EmptyView";
import { ErrorView } from "@/components/shared/ErrorView";
import { useCharactersByIds } from "@/features/characters";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { Heart } from "@/lib/icons";

type FavoriteCharactersContentProps = {
  favoriteIds: number[];
};

export function FavoriteCharactersContent({ favoriteIds }: FavoriteCharactersContentProps) {
  const { data: characters = [], error, isPending, refetch } = useCharactersByIds(favoriteIds);
  const { isRefreshingByUser, refreshByUser } = useRefreshByUser(refetch);

  if (!favoriteIds.length) {
    return (
      <EmptyView
        icon={<Heart className="text-primary" size={28} />}
        title="No favorites yet"
        description="Open a character and tap the heart to keep them here."
      />
    );
  }

  if (isPending) return <CharacterGridSkeleton />;
  if (error && !characters.length) return <ErrorView error={error} onRetry={refetch} />;

  return (
    <CharacterGrid
      characters={characters}
      isRefreshing={isRefreshingByUser}
      onRefresh={refreshByUser}
    />
  );
}
