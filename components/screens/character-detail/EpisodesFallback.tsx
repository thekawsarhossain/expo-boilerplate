import { EmptyView } from "@/components/shared/EmptyView";
import { ErrorView } from "@/components/shared/ErrorView";
import { EpisodeListSkeleton } from "./EpisodeListSkeleton";

type EpisodesFallbackProps = {
  isPending: boolean;
  error: unknown;
  onRetry: () => void;
};

export function EpisodesFallback({ isPending, error, onRetry }: EpisodesFallbackProps) {
  if (isPending) return <EpisodeListSkeleton />;
  if (error) return <ErrorView error={error} onRetry={onRetry} />;
  return <EmptyView title="No episodes" />;
}
