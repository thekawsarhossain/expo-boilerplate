import { View } from "react-native";

import { StatusBadge } from "@/components/screens/characters/StatusBadge";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import type { Character } from "@/features/characters";

const BACKDROP_BLUR_RADIUS = 40;

type CharacterHeroProps = {
  character: Character;
};

export function CharacterHero({ character }: CharacterHeroProps) {
  return (
    <View className="overflow-hidden rounded-3xl">
      <Image
        source={character.image}
        className="absolute inset-0"
        contentFit="cover"
        blurRadius={BACKDROP_BLUR_RADIUS}
        accessibilityIgnoresInvertColors
      />
      <View className="absolute inset-0 bg-background/70" />
      <View className="items-center gap-3 px-6 pb-7 pt-8">
        <Image
          source={character.image}
          className="size-36 rounded-full border-4 border-primary"
          contentFit="cover"
          transition={200}
          accessibilityIgnoresInvertColors
        />
        <Text className="text-center text-3xl font-bold tracking-tight">{character.name}</Text>
        <View className="flex-row flex-wrap justify-center gap-2">
          <StatusBadge status={character.status} />
          <View className="rounded-full bg-secondary px-2.5 py-1">
            <Text className="text-xs font-semibold text-foreground">{character.species}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
