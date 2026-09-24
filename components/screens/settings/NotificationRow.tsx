import { Text } from "@/components/ui/text";
import { useNotificationPermission } from "@/hooks/useNotificationPermission";
import { Bell } from "@/lib/icons";
import { SettingsRow } from "./SettingsRow";

export function NotificationRow() {
  const { isGranted, requestPermission } = useNotificationPermission();

  return (
    <SettingsRow
      icon={<Bell className="text-primary" size={18} />}
      label="Notifications"
      description={isGranted ? "You'll get updates" : "Tap to turn on"}
      onPress={requestPermission}
      trailing={
        <Text className="text-sm font-semibold text-muted-foreground">
          {isGranted ? "On" : "Off"}
        </Text>
      }
    />
  );
}
