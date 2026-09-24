import { View } from "react-native";

import { Text } from "@/components/ui/text";
import type { Episode } from "@/features/episodes";

type EpisodeRowProps = {
  episode: Episode;
};

export function EpisodeRow({ episode }: EpisodeRowProps) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <View className="w-20 items-center rounded-lg bg-accent py-1">
        <Text className="text-xs font-semibold text-accent-foreground">{episode.episode}</Text>
      </View>
      <View className="flex-1 gap-0.5">
        <Text className="font-semibold" numberOfLines={1}>
          {episode.name}
        </Text>
        <Text className="text-xs text-muted-foreground">{episode.air_date}</Text>
      </View>
    </View>
  );
}
