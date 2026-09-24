import * as Notifications from "expo-notifications";
import { useCallback, useEffect, useState } from "react";
import { Linking } from "react-native";

export function useNotificationPermission() {
  const [status, setStatus] = useState<Notifications.PermissionStatus>();

  useEffect(() => {
    Notifications.getPermissionsAsync().then((permission) => setStatus(permission.status));
  }, []);

  const requestPermission = useCallback(async () => {
    if (status === Notifications.PermissionStatus.DENIED) {
      await Linking.openSettings();
      return;
    }
    const permission = await Notifications.requestPermissionsAsync();
    setStatus(permission.status);
  }, [status]);

  return {
    isGranted: status === Notifications.PermissionStatus.GRANTED,
    requestPermission,
  };
}
