import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { FAVORITE_COLOR } from "@/constants/theme";
import type { Character } from "@/features/characters";
import { useIsFavorite } from "@/features/favorites";
import { Heart } from "@/lib/icons";
import { StatusBadge } from "./StatusBadge";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const isFavorite = useIsFavorite(character.id);

  return (
    <Link href={{ pathname: "/characters/[id]", params: { id: character.id } }} asChild>
      <Pressable
        className="overflow-hidden rounded-3xl bg-card active:scale-[0.97] active:opacity-90"
        accessibilityLabel={`${character.name}, ${character.status}, ${character.species}`}
      >
        <Image
          source={character.image}
          className="aspect-[3/4] w-full"
          contentFit="cover"
          transition={200}
          accessibilityIgnoresInvertColors
        />
        <View className="absolute left-2.5 top-2.5">
          <StatusBadge status={character.status} variant="overlay" />
        </View>
        {isFavorite && (
          <View className="absolute right-2.5 top-2.5 rounded-full bg-black/55 p-1.5">
            <Heart color={FAVORITE_COLOR} fill={FAVORITE_COLOR} size={14} />
          </View>
        )}
        <View className="absolute inset-x-0 bottom-0 gap-0.5 bg-black/60 px-3 py-2.5">
          <Text className="font-semibold text-white" numberOfLines={1}>
            {character.name}
          </Text>
          <Text className="text-xs text-white/70" numberOfLines={1}>
            {character.species}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
