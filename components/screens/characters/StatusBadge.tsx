import { cva, type VariantProps } from "class-variance-authority";
import { View } from "react-native";

import { Text } from "@/components/ui/text";
import {
  CHARACTER_STATUS_DOT_CLASSES,
  CHARACTER_STATUS_LABELS,
  type CharacterStatus,
} from "@/features/characters";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva("flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1", {
  variants: {
    variant: {
      overlay: "bg-black/55",
      surface: "bg-secondary",
    },
  },
  defaultVariants: {
    variant: "surface",
  },
});

const statusBadgeTextVariants = cva("text-xs font-semibold", {
  variants: {
    variant: {
      overlay: "text-white",
      surface: "text-foreground",
    },
  },
  defaultVariants: {
    variant: "surface",
  },
});

type StatusBadgeProps = VariantProps<typeof statusBadgeVariants> & {
  status: CharacterStatus;
};

export function StatusBadge({ status, variant }: StatusBadgeProps) {
  return (
    <View className={statusBadgeVariants({ variant })}>
      <View className={cn("size-1.5 rounded-full", CHARACTER_STATUS_DOT_CLASSES[status])} />
      <Text className={statusBadgeTextVariants({ variant })}>{CHARACTER_STATUS_LABELS[status]}</Text>
    </View>
  );
}
