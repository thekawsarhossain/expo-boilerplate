import { Pressable, TextInput, View } from "react-native";

import { Search, X } from "@/lib/icons";

type SearchInputProps = {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
};

export function SearchInput({ value, onChangeText, placeholder = "Search" }: SearchInputProps) {
  return (
    <View className="h-12 flex-row items-center gap-2.5 rounded-2xl bg-secondary px-4">
      <Search className="text-muted-foreground" size={18} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderClassName="text-muted-foreground"
        className="flex-1 text-base text-foreground web:outline-none"
        autoCapitalize="none"
        autoCorrect={false}
        returnKeyType="search"
        accessibilityLabel={placeholder}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")} hitSlop={8} accessibilityLabel="Clear search">
          <X className="text-muted-foreground" size={18} />
        </Pressable>
      )}
    </View>
  );
}
