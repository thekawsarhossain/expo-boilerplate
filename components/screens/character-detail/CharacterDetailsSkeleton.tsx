import { View } from "react-native";

import { Skeleton } from "@/components/ui/skeleton";
import { CHARACTER_INFO_TILE_COUNT } from "@/constants/ui";
import { range } from "@/lib/utils";
import { EpisodeListSkeleton } from "./EpisodeListSkeleton";

export function CharacterDetailsSkeleton() {
  return (
    <View className="flex-1 bg-background" accessibilityLabel="Loading character">
      <View className="gap-6 p-4">
        <View className="items-center gap-3 rounded-3xl bg-card px-6 pb-7 pt-8">
          <Skeleton className="size-36 rounded-full" />
          <Skeleton className="h-8 w-48" />
          <View className="flex-row gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </View>
        </View>
        <View className="-m-1.5 flex-row flex-wrap">
          {range(CHARACTER_INFO_TILE_COUNT).map((index) => (
            <View key={index} className="w-1/2 p-1.5">
              <Skeleton className="h-[72px] rounded-2xl" />
            </View>
          ))}
        </View>
        <Skeleton className="h-6 w-32" />
      </View>
      <EpisodeListSkeleton />
    </View>
  );
}
