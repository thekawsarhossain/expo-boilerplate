import { View } from "react-native";

import { CHARACTER_GRID_COLUMNS, CHARACTER_SKELETON_COUNT } from "@/constants/ui";
import { range } from "@/lib/utils";
import { CharacterCardSkeleton } from "./CharacterCardSkeleton";

const cellStyle = { width: `${100 / CHARACTER_GRID_COLUMNS}%` } as const;

export function CharacterGridSkeleton() {
  return (
    <View
      className="flex-1 flex-row flex-wrap content-start bg-background p-2.5"
      accessibilityLabel="Loading characters"
    >
      {range(CHARACTER_SKELETON_COUNT).map((index) => (
        <View key={index} className="p-1.5" style={cellStyle}>
          <CharacterCardSkeleton />
        </View>
      ))}
    </View>
  );
}
