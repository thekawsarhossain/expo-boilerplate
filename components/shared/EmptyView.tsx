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
    <View className="flex-1 items-center justify-center gap-3 p-8">
      {icon && (
        <View className="mb-1 size-16 items-center justify-center rounded-full bg-primary/10">
          {icon}
        </View>
      )}
      <Text className="text-center text-lg font-bold">{title}</Text>
      {description && (
        <Text className="max-w-xs text-center text-sm text-muted-foreground">{description}</Text>
      )}
    </View>
  );
}
