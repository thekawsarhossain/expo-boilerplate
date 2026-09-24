import type { ReactNode } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Text } from "@/components/ui/text";

type ScreenHeaderProps = {
  title: string;
  subtitle?: string;
  children?: ReactNode;
};

export function ScreenHeader({ title, subtitle, children }: ScreenHeaderProps) {
  const { top } = useSafeAreaInsets();

  return (
    <View className="gap-4 bg-background px-5 pb-4" style={{ paddingTop: top + 12 }}>
      <View className="gap-1">
        <Text className="text-3xl font-bold tracking-tight">{title}</Text>
        {subtitle && <Text className="text-sm text-muted-foreground">{subtitle}</Text>}
      </View>
      {children}
    </View>
  );
}
