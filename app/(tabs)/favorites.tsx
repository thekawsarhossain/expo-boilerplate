import { CharacterGrid } from "@/components/screens/characters/CharacterGrid";
import { CharacterGridSkeleton } from "@/components/screens/characters/CharacterGridSkeleton";
import { EmptyView } from "@/components/shared/EmptyView";
import { ErrorView } from "@/components/shared/ErrorView";
import { useCharactersByIds } from "@/features/characters";
import { useFavoritesStore } from "@/features/favorites";
import { useRefreshByUser } from "@/hooks/useRefreshByUser";
import { Heart } from "@/lib/icons";

export default function FavoritesScreen() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);
  const { data: characters = [], error, isPending, refetch } = useCharactersByIds(favoriteIds);
  const { isRefreshingByUser, refreshByUser } = useRefreshByUser(refetch);

  if (!favoriteIds.length) {
    return (
      <EmptyView
        icon={<Heart className="text-muted-foreground" size={32} />}
        title="No favorites yet"
        description="Tap the heart on a character to save it here."
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
