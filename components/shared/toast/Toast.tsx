import { Pressable } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

import { Text } from "@/components/ui/text";
import type { ToastMessage, ToastVariant } from "@/lib/toast";
import { cn } from "@/lib/utils";

const VARIANT_CLASSES: Record<ToastVariant, string> = {
  success: "border-green-600 bg-green-600",
  error: "border-destructive bg-destructive",
  info: "border-border bg-card",
};

const VARIANT_TEXT_CLASSES: Record<ToastVariant, string> = {
  success: "text-white",
  error: "text-destructive-foreground",
  info: "text-card-foreground",
};

type ToastProps = {
  toast: ToastMessage;
  onDismiss: (id: number) => void;
};

export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <Pressable
        onPress={() => onDismiss(toast.id)}
        className={cn("rounded-lg border px-4 py-3 shadow-sm", VARIANT_CLASSES[toast.variant])}
        accessibilityRole="alert"
      >
        <Text className={cn("text-sm font-medium", VARIANT_TEXT_CLASSES[toast.variant])}>
          {toast.message}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
