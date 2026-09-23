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
    <View className="flex-1 items-center justify-center gap-4 bg-background p-6">
      <CircleAlert className="text-destructive" size={32} />
      <Text className="text-center text-muted-foreground">{getErrorMessage(error)}</Text>
      {onRetry && (
        <Button variant="outline" onPress={onRetry}>
          <Text>Try again</Text>
        </Button>
      )}
    </View>
  );
}
