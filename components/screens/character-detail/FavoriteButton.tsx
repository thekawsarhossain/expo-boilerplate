import { Pressable } from "react-native";

import { FAVORITE_COLOR } from "@/constants/theme";
import { useFavoritesStore, useIsFavorite } from "@/features/favorites";
import { Heart } from "@/lib/icons";

type FavoriteButtonProps = {
  characterId: number;
};

export function FavoriteButton({ characterId }: FavoriteButtonProps) {
  const isFavorite = useIsFavorite(characterId);
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  return (
    <Pressable
      onPress={() => toggleFavorite(characterId)}
      hitSlop={8}
      className="size-11 items-center justify-center active:opacity-70"
      accessibilityRole="button"
      accessibilityLabel={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <Heart color={FAVORITE_COLOR} fill={FAVORITE_COLOR} size={24} />
      ) : (
        <Heart className="text-foreground" size={24} />
      )}
    </Pressable>
  );
}
