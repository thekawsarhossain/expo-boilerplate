import "./global.css";

import { Inter_400Regular, Inter_600SemiBold, useFonts } from "@expo-google-fonts/inter";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { ThemeProvider } from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { PortalHost } from "@/components/primitives/portal";
import { ToastViewport } from "@/components/shared/toast";
import { DARK_THEME, LIGHT_THEME } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRestoreThemePreference } from "@/hooks/useRestoreThemePreference";
import { setAndroidNavigationBar } from "@/lib/android-navigation-bar";
import { QueryProvider } from "@/providers/QueryProvider";

export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [areFontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold });

  useRestoreThemePreference();

  useEffect(() => {
    setAndroidNavigationBar(colorScheme);
  }, [colorScheme]);

  useEffect(() => {
    if (areFontsLoaded) SplashScreen.hideAsync();
  }, [areFontsLoaded]);

  return (
    <QueryProvider>
      <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="characters/[id]"
                options={{ title: "", headerBackButtonDisplayMode: "minimal" }}
              />
            </Stack>
            <ToastViewport />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </ThemeProvider>
      <PortalHost />
    </QueryProvider>
  );
}
