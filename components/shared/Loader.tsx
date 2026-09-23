import { cva, type VariantProps } from "class-variance-authority";
import { ActivityIndicator, type ActivityIndicatorProps, View } from "react-native";

import { cn } from "@/lib/utils";

const loaderVariants = cva("items-center justify-center", {
  variants: {
    variant: {
      screen: "flex-1 bg-background p-6",
      inline: "py-4",
    },
  },
  defaultVariants: {
    variant: "screen",
  },
});

type LoaderProps = Omit<ActivityIndicatorProps, "className"> &
  VariantProps<typeof loaderVariants> & {
    className?: string;
    indicatorClassName?: string;
  };

export function Loader({
  variant,
  className,
  indicatorClassName,
  size = "large",
  ...indicatorProps
}: LoaderProps) {
  return (
    <View className={cn(loaderVariants({ variant }), className)}>
      <ActivityIndicator
        size={size}
        className={cn("text-primary", indicatorClassName)}
        {...indicatorProps}
      />
    </View>
  );
}
