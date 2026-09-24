import { View } from "react-native";

import { FavoriteCharactersContent } from "@/components/screens/favorites/FavoriteCharactersContent";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { useFavoritesStore } from "@/features/favorites";

function getSavedCountLabel(count: number) {
  return count === 1 ? "1 character saved" : `${count} characters saved`;
}

export default function FavoritesScreen() {
  const favoriteIds = useFavoritesStore((state) => state.favoriteIds);

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Favorites" subtitle={getSavedCountLabel(favoriteIds.length)} />
      <FavoriteCharactersContent favoriteIds={favoriteIds} />
    </View>
  );
}
