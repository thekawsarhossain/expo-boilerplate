import { Pressable } from "react-native";

import { useFavoritesStore, useIsFavorite } from "@/features/favorites";
import { Heart } from "@/lib/icons";
import { cn } from "@/lib/utils";

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
      <Heart
        className={cn(isFavorite ? "text-red-500" : "text-foreground")}
        fill={isFavorite ? "currentColor" : "none"}
        size={24}
      />
    </Pressable>
  );
}
