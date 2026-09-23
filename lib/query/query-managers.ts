import { focusManager, onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { AppState, type AppStateStatus, Platform } from "react-native";

function syncOnlineStatusWithNetwork() {
  onlineManager.setEventListener((setOnline) => {
    const subscription = Network.addNetworkStateListener((state) => {
      setOnline(Boolean(state.isConnected));
    });
    return () => subscription.remove();
  });
}

function handleAppStateChange(status: AppStateStatus) {
  focusManager.setFocused(status === "active");
}

export function registerQueryManagers() {
  if (Platform.OS === "web") return () => {};

  syncOnlineStatusWithNetwork();
  const appStateSubscription = AppState.addEventListener("change", handleAppStateChange);

  return () => appStateSubscription.remove();
}
