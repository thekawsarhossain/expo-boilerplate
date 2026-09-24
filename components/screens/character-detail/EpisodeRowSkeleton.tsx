import { View } from "react-native";

import { Skeleton } from "@/components/ui/skeleton";

export function EpisodeRowSkeleton() {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3">
      <Skeleton className="h-6 w-20 rounded-lg" />
      <View className="flex-1 gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </View>
    </View>
  );
}
