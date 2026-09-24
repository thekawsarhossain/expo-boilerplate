import Constants from "expo-constants";

export const appConfig = {
  name: Constants.expoConfig?.name ?? "Expo Boilerplate",
  version: Constants.expoConfig?.version ?? "0.0.0",
} as const;
