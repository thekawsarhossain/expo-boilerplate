import { ErrorView } from "@/components/shared/ErrorView";
import type { Character } from "@/features/characters";
import { CharacterDetails } from "./CharacterDetails";
import { CharacterDetailsSkeleton } from "./CharacterDetailsSkeleton";

type CharacterDetailContentProps = {
  character?: Character;
  isPending: boolean;
  error: unknown;
  onRetry: () => void;
};

export function CharacterDetailContent({
  character,
  isPending,
  error,
  onRetry,
}: CharacterDetailContentProps) {
  if (character) return <CharacterDetails character={character} />;
  if (isPending) return <CharacterDetailsSkeleton />;
  return <ErrorView error={error} onRetry={onRetry} />;
}
