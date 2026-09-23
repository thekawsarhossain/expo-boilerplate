import { View } from "react-native";

import { Skeleton } from "@/components/ui/skeleton";
import { CHARACTER_INFO_SKELETON_ROWS } from "@/constants/ui";
import { range } from "@/lib/utils";
import { EpisodeListSkeleton } from "./EpisodeListSkeleton";

export function CharacterDetailsSkeleton() {
  return (
    <View className="flex-1 bg-background" accessibilityLabel="Loading character">
      <View className="gap-6 px-4 pb-2">
        <View className="items-center gap-3 pb-6 pt-4">
          <Skeleton className="size-40 rounded-full" />
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </View>
        <View className="gap-4 rounded-xl border border-border bg-card p-4">
          {range(CHARACTER_INFO_SKELETON_ROWS).map((index) => (
            <View key={index} className="flex-row justify-between">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-4 w-28" />
            </View>
          ))}
        </View>
        <Skeleton className="h-6 w-32" />
      </View>
      <EpisodeListSkeleton />
    </View>
  );
}
