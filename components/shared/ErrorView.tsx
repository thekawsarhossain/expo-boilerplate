import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { getErrorMessage } from "@/lib/api/api-error";
import { CircleAlert } from "@/lib/icons";

type ErrorViewProps = {
  error: unknown;
  onRetry?: () => void;
};

export function ErrorView({ error, onRetry }: ErrorViewProps) {
  return (
    <View className="flex-1 items-center justify-center gap-3 bg-background p-8">
      <View className="mb-1 size-16 items-center justify-center rounded-full bg-destructive/10">
        <CircleAlert className="text-destructive" size={28} />
      </View>
      <Text className="text-center text-lg font-bold">Something went wrong</Text>
      <Text className="max-w-xs text-center text-sm text-muted-foreground">
        {getErrorMessage(error)}
      </Text>
      {onRetry && (
        <Button className="mt-2 rounded-full" onPress={onRetry}>
          <Text>Try again</Text>
        </Button>
      )}
    </View>
  );
}
