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
    <View className="gap-3 border-b border-border bg-background px-4 pb-3 pt-2">
      <SearchInput
        value={searchText}
        onChangeText={onSearchTextChange}
        placeholder="Search characters"
      />
      <StatusFilterChips selectedStatus={selectedStatus} onStatusChange={onStatusChange} />
    </View>
  );
}
