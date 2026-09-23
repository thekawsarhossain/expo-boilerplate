import { View } from "react-native";

import { StatusIndicator } from "@/components/screens/characters/StatusIndicator";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import type { Character } from "@/features/characters";

type CharacterHeroProps = {
  character: Character;
};

export function CharacterHero({ character }: CharacterHeroProps) {
  return (
    <View className="items-center gap-3 pb-6 pt-4">
      <Image
        source={character.image}
        className="size-40 rounded-full"
        contentFit="cover"
        transition={200}
        accessibilityIgnoresInvertColors
      />
      <Text className="text-center text-2xl font-bold">{character.name}</Text>
      <StatusIndicator status={character.status} species={character.species} />
    </View>
  );
}
