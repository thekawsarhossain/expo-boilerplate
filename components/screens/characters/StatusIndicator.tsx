import { View } from "react-native";

import { Text } from "@/components/ui/text";
import {
  CHARACTER_STATUS_DOT_CLASSES,
  CHARACTER_STATUS_LABELS,
  type CharacterStatus,
} from "@/features/characters";
import { cn } from "@/lib/utils";

type StatusIndicatorProps = {
  status: CharacterStatus;
  species: string;
};

export function StatusIndicator({ status, species }: StatusIndicatorProps) {
  return (
    <View className="flex-row items-center gap-1.5">
      <View className={cn("size-2 rounded-full", CHARACTER_STATUS_DOT_CLASSES[status])} />
      <Text className="shrink text-sm text-muted-foreground" numberOfLines={1}>
        {CHARACTER_STATUS_LABELS[status]} · {species}
      </Text>
    </View>
  );
}
