import * as NavigationBar from "expo-navigation-bar";
import { Platform } from "react-native";

import { NAV_THEME } from "@/constants/theme";
import type { ColorScheme } from "@/types/theme";

export async function setAndroidNavigationBar(colorScheme: ColorScheme) {
  if (Platform.OS !== "android") return;

  await NavigationBar.setButtonStyleAsync(colorScheme === "dark" ? "light" : "dark");
  await NavigationBar.setBackgroundColorAsync(NAV_THEME[colorScheme].background);
}
