import { View } from "react-native";

import { Text } from "@/components/ui/text";
import type { Character } from "@/features/characters";

type CharacterInfoTilesProps = {
  character: Character;
};

type InfoTileProps = {
  label: string;
  value: string;
};

function InfoTile({ label, value }: InfoTileProps) {
  return (
    <View className="w-1/2 p-1.5">
      <View className="gap-1 rounded-2xl bg-card p-4">
        <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </Text>
        <Text className="font-semibold" numberOfLines={2}>
          {value}
        </Text>
      </View>
    </View>
  );
}

export function CharacterInfoTiles({ character }: CharacterInfoTilesProps) {
  return (
    <View className="-m-1.5 flex-row flex-wrap">
      <InfoTile label="Gender" value={character.gender} />
      <InfoTile label="Type" value={character.type || "—"} />
      <InfoTile label="Origin" value={character.origin.name} />
      <InfoTile label="Last seen" value={character.location.name} />
    </View>
  );
}
