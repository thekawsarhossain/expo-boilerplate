import { View } from "react-native";

import { Text } from "@/components/ui/text";
import type { Character } from "@/features/characters";

type CharacterInfoListProps = {
  character: Character;
};

type InfoRowProps = {
  label: string;
  value: string;
};

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <View className="flex-row justify-between gap-4 border-b border-border px-4 py-3 last:border-b-0">
      <Text className="text-muted-foreground">{label}</Text>
      <Text className="flex-1 text-right" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

export function CharacterInfoList({ character }: CharacterInfoListProps) {
  return (
    <View className="overflow-hidden rounded-2xl border border-border bg-card">
      <InfoRow label="Gender" value={character.gender} />
      <InfoRow label="Species" value={character.species} />
      {Boolean(character.type) && <InfoRow label="Type" value={character.type} />}
      <InfoRow label="Origin" value={character.origin.name} />
      <InfoRow label="Last seen" value={character.location.name} />
    </View>
  );
}
