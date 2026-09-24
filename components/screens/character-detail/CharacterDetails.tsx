import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import type { Character } from "@/features/characters";
import { type Episode, useEpisodesByIds } from "@/features/episodes";
import { getIdFromUrl, isDefined, keyExtractorById } from "@/lib/utils";
import { CharacterHero } from "./CharacterHero";
import { CharacterInfoTiles } from "./CharacterInfoTiles";
import { EpisodeRow } from "./EpisodeRow";
import { EpisodesFallback } from "./EpisodesFallback";

type CharacterDetailsProps = {
  character: Character;
};

function renderEpisode({ item }: { item: Episode }) {
  return <EpisodeRow episode={item} />;
}

function EpisodeSeparator() {
  return <View className="mx-4 h-px bg-border" />;
}

export function CharacterDetails({ character }: CharacterDetailsProps) {
  const episodeIds = useMemo(
    () => character.episode.map(getIdFromUrl).filter(isDefined),
    [character.episode],
  );
  const { data: episodes = [], error, isPending, refetch } = useEpisodesByIds(episodeIds);

  return (
    <FlashList
      data={episodes}
      renderItem={renderEpisode}
      keyExtractor={keyExtractorById}
      ItemSeparatorComponent={EpisodeSeparator}
      className="bg-background"
      contentContainerClassName="pb-10"
      ListHeaderComponent={
        <View className="gap-6 p-4">
          <CharacterHero character={character} />
          <CharacterInfoTiles character={character} />
          <View className="flex-row items-center gap-2">
            <Text className="text-xl font-bold tracking-tight">Episodes</Text>
            <View className="rounded-full bg-primary px-2 py-0.5">
              <Text className="text-xs font-bold text-primary-foreground">{episodeIds.length}</Text>
            </View>
          </View>
        </View>
      }
      ListEmptyComponent={<EpisodesFallback isPending={isPending} error={error} onRetry={refetch} />}
    />
  );
}
