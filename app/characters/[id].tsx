import { Stack, useLocalSearchParams } from "expo-router";

import { CharacterDetailContent } from "@/components/screens/character-detail/CharacterDetailContent";
import { FavoriteButton } from "@/components/screens/character-detail/FavoriteButton";
import { useCharacter } from "@/features/characters";

export default function CharacterDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const characterId = Number(id);
  const { data: character, error, isPending, refetch } = useCharacter(characterId);

  return (
    <>
      <Stack.Screen
        options={{
          title: character?.name ?? "",
          headerRight: () => <FavoriteButton characterId={characterId} />,
        }}
      />
      <CharacterDetailContent
        character={character}
        isPending={isPending}
        error={error}
        onRetry={refetch}
      />
    </>
  );
}
