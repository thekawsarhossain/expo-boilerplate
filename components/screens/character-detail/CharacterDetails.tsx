import { FlashList } from "@shopify/flash-list";
import { useMemo } from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import type { Character } from "@/features/characters";
import { type Episode, useEpisodesByIds } from "@/features/episodes";
import { getIdFromUrl, isDefined, keyExtractorById } from "@/lib/utils";
import { CharacterHero } from "./CharacterHero";
import { CharacterInfoList } from "./CharacterInfoList";
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
      contentContainerClassName="pb-8"
      ListHeaderComponent={
        <View className="gap-6 px-4 pb-2">
          <CharacterHero character={character} />
          <CharacterInfoList character={character} />
          <Text className="text-lg font-semibold">Episodes ({episodeIds.length})</Text>
        </View>
      }
      ListEmptyComponent={<EpisodesFallback isPending={isPending} error={error} onRetry={refetch} />}
    />
  );
}
