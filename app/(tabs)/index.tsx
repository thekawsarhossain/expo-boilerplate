import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

import { CharacterFilters } from "@/components/screens/characters/CharacterFilters";
import { CharacterResultsContent } from "@/components/screens/characters/CharacterResultsContent";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { SEARCH_DEBOUNCE_MS } from "@/constants/ui";
import type { CharacterStatus } from "@/features/characters";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";

type CharacterFilterState = {
  searchText: string;
  status?: CharacterStatus;
};

const INITIAL_FILTERS: CharacterFilterState = { searchText: "" };

export default function CharactersScreen() {
  const [filters, setFilters] = useState<CharacterFilterState>(INITIAL_FILTERS);
  const debouncedSearchText = useDebouncedValue(filters.searchText.trim(), SEARCH_DEBOUNCE_MS);

  const handleSearchTextChange = useCallback((searchText: string) => {
    setFilters((current) => ({ ...current, searchText }));
  }, []);

  const handleStatusChange = useCallback((status?: CharacterStatus) => {
    setFilters((current) => ({ ...current, status }));
  }, []);

  const queryFilters = useMemo(
    () => ({ name: debouncedSearchText, status: filters.status }),
    [debouncedSearchText, filters.status],
  );

  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Characters" subtitle="Everyone across the multiverse">
        <CharacterFilters
          searchText={filters.searchText}
          onSearchTextChange={handleSearchTextChange}
          selectedStatus={filters.status}
          onStatusChange={handleStatusChange}
        />
      </ScreenHeader>
      <CharacterResultsContent filters={queryFilters} />
    </View>
  );
}
