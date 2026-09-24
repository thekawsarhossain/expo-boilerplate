import { Pressable, ScrollView } from "react-native";

import { Text } from "@/components/ui/text";
import {
  CHARACTER_STATUS_LABELS,
  CHARACTER_STATUSES,
  type CharacterStatus,
} from "@/features/characters";
import { cn } from "@/lib/utils";

type StatusFilterChipsProps = {
  selectedStatus?: CharacterStatus;
  onStatusChange: (status?: CharacterStatus) => void;
};

type FilterChipProps = {
  label: string;
  isSelected: boolean;
  onPress: () => void;
};

function FilterChip({ label, isSelected, onPress }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      className={cn(
        "rounded-full px-4 py-2 active:opacity-80",
        isSelected ? "bg-primary" : "bg-secondary",
      )}
      accessibilityRole="button"
      accessibilityState={{ selected: isSelected }}
    >
      <Text
        className={cn(
          "text-sm font-semibold",
          isSelected ? "text-primary-foreground" : "text-muted-foreground",
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export function StatusFilterChips({ selectedStatus, onStatusChange }: StatusFilterChipsProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerClassName="gap-2">
      <FilterChip
        label="All"
        isSelected={!selectedStatus}
        onPress={() => onStatusChange(undefined)}
      />
      {CHARACTER_STATUSES.map((status) => (
        <FilterChip
          key={status}
          label={CHARACTER_STATUS_LABELS[status]}
          isSelected={selectedStatus === status}
          onPress={() => onStatusChange(status)}
        />
      ))}
    </ScrollView>
  );
}
