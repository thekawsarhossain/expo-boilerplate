import { View } from "react-native";

import { SearchInput } from "@/components/shared/SearchInput";
import type { CharacterStatus } from "@/features/characters";
import { StatusFilterChips } from "./StatusFilterChips";

type CharacterFiltersProps = {
  searchText: string;
  onSearchTextChange: (value: string) => void;
  selectedStatus?: CharacterStatus;
  onStatusChange: (status?: CharacterStatus) => void;
};

export function CharacterFilters({
  searchText,
  onSearchTextChange,
  selectedStatus,
  onStatusChange,
}: CharacterFiltersProps) {
  return (
    <View className="gap-3">
      <SearchInput
        value={searchText}
        onChangeText={onSearchTextChange}
        placeholder="Search the multiverse"
      />
      <StatusFilterChips selectedStatus={selectedStatus} onStatusChange={onStatusChange} />
    </View>
  );
}
