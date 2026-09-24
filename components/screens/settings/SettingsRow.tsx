import type { ReactNode } from "react";
import { Pressable, View } from "react-native";

import { ChevronRight } from "@/components/shared/Icons";
import { Text } from "@/components/ui/text";

type SettingsRowProps = {
  icon: ReactNode;
  label: string;
  description?: string;
  trailing?: ReactNode;
  onPress?: () => void;
};

export function SettingsRow({ icon, label, description, trailing, onPress }: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      className="flex-row items-center gap-3 px-4 py-3.5 active:bg-accent"
      accessibilityRole={onPress ? "button" : undefined}
    >
      <View className="size-9 items-center justify-center rounded-xl bg-primary/15">{icon}</View>
      <View className="flex-1 gap-0.5">
        <Text className="font-semibold">{label}</Text>
        {description && <Text className="text-xs text-muted-foreground">{description}</Text>}
      </View>
      {trailing ?? (onPress && <ChevronRight className="text-muted-foreground" size={18} />)}
    </Pressable>
  );
}
