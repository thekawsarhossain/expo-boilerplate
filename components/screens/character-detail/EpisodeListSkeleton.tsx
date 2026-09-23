import { View } from "react-native";

import { EPISODE_SKELETON_COUNT } from "@/constants/ui";
import { range } from "@/lib/utils";
import { EpisodeRowSkeleton } from "./EpisodeRowSkeleton";

export function EpisodeListSkeleton() {
  return (
    <View accessibilityLabel="Loading episodes">
      {range(EPISODE_SKELETON_COUNT).map((index) => (
        <EpisodeRowSkeleton key={index} />
      ))}
    </View>
  );
}
