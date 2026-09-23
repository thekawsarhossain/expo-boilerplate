import type { ReactNode } from "react";
import { View } from "react-native";

import { Text } from "@/components/ui/text";

type EmptyViewProps = {
  title: string;
  description?: string;
  icon?: ReactNode;
};

export function EmptyView({ title, description, icon }: EmptyViewProps) {
  return (
    <View className="flex-1 items-center justify-center gap-2 p-6">
      {icon}
      <Text className="text-lg font-semibold">{title}</Text>
      {description && <Text className="text-center text-muted-foreground">{description}</Text>}
    </View>
  );
}
