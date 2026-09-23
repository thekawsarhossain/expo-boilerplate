import Constants from "expo-constants";

export const appConfig = {
  version: Constants.expoConfig?.version ?? "0.0.0",
} as const;
