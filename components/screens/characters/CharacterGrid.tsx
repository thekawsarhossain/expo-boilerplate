import { FlashList, type FlashListRef } from "@shopify/flash-list";
import { useScrollToTop } from "@react-navigation/native";
import { type ReactElement, useRef } from "react";
import { View } from "react-native";

import { CHARACTER_GRID_COLUMNS } from "@/constants/ui";
import type { Character } from "@/features/characters";
import { keyExtractorById } from "@/lib/utils";
import { Loader } from "@/components/shared/Loader";
import { CharacterCard } from "./CharacterCard";

type CharacterGridProps = {
  characters: Character[];
  isRefreshing?: boolean;
  onRefresh?: () => void;
  onEndReached?: () => void;
  isFetchingMore?: boolean;
  emptyComponent?: ReactElement;
};

function renderCharacter({ item }: { item: Character }) {
  return (
    <View className="flex-1 p-1.5">
      <CharacterCard character={item} />
    </View>
  );
}

export function CharacterGrid({
  characters,
  isRefreshing = false,
  onRefresh,
  onEndReached,
  isFetchingMore = false,
  emptyComponent,
}: CharacterGridProps) {
  const listRef = useRef<FlashListRef<Character>>(null);
  useScrollToTop(listRef);

  return (
    <FlashList
      ref={listRef}
      data={characters}
      numColumns={CHARACTER_GRID_COLUMNS}
      renderItem={renderCharacter}
      keyExtractor={keyExtractorById}
      contentContainerClassName="px-3.5 pb-8"
      showsVerticalScrollIndicator={false}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={emptyComponent}
      ListFooterComponent={isFetchingMore ? <Loader variant="inline" size="small" /> : null}
    />
  );
}
