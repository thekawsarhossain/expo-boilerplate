import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import type { Character } from "@/features/characters";
import { useIsFavorite } from "@/features/favorites";
import { Heart } from "@/lib/icons";
import { StatusIndicator } from "./StatusIndicator";

type CharacterCardProps = {
  character: Character;
};

export function CharacterCard({ character }: CharacterCardProps) {
  const isFavorite = useIsFavorite(character.id);

  return (
    <Link href={{ pathname: "/characters/[id]", params: { id: character.id } }} asChild>
      <Pressable className="overflow-hidden rounded-2xl border border-border bg-card active:opacity-80">
        <Image
          source={character.image}
          className="aspect-square w-full"
          contentFit="cover"
          transition={200}
          accessibilityIgnoresInvertColors
        />
        {isFavorite && (
          <View className="absolute right-2 top-2 rounded-full bg-background/80 p-1.5">
            <Heart className="text-red-500" fill="currentColor" size={14} />
          </View>
        )}
        <View className="gap-1 p-3">
          <Text className="font-semibold text-card-foreground" numberOfLines={1}>
            {character.name}
          </Text>
          <StatusIndicator status={character.status} species={character.species} />
        </View>
      </Pressable>
    </Link>
  );
}
