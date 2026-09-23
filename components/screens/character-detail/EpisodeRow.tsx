import { View } from "react-native";

import { Text } from "@/components/ui/text";
import type { Episode } from "@/features/episodes";

type EpisodeRowProps = {
  episode: Episode;
};

export function EpisodeRow({ episode }: EpisodeRowProps) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Text className="w-16 font-mono text-sm text-muted-foreground">{episode.episode}</Text>
      <View className="flex-1">
        <Text numberOfLines={1}>{episode.name}</Text>
        <Text className="text-sm text-muted-foreground">{episode.air_date}</Text>
      </View>
    </View>
  );
}
