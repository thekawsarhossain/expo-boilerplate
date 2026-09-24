import { Tabs } from "expo-router";

import { Heart, Settings, Users } from "@/lib/icons";

export const unstable_settings = {
  initialRouteName: "index",
};

type TabIconProps = {
  color: string;
  size: number;
};

const TAB_SCREEN_OPTIONS = {
  headerShown: false,
  tabBarStyle: { borderTopWidth: 0, elevation: 0 },
  tabBarLabelStyle: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
} as const;

function renderCharactersIcon({ color, size }: TabIconProps) {
  return <Users color={color} size={size} />;
}

function renderFavoritesIcon({ color, size }: TabIconProps) {
  return <Heart color={color} size={size} />;
}

function renderSettingsIcon({ color, size }: TabIconProps) {
  return <Settings color={color} size={size} />;
}

export default function TabLayout() {
  return (
    <Tabs screenOptions={TAB_SCREEN_OPTIONS}>
      <Tabs.Screen
        name="index"
        options={{ title: "Characters", tabBarIcon: renderCharactersIcon }}
      />
      <Tabs.Screen
        name="favorites"
        options={{ title: "Favorites", tabBarIcon: renderFavoritesIcon }}
      />
      <Tabs.Screen
        name="settings"
        options={{ title: "Settings", tabBarIcon: renderSettingsIcon }}
      />
    </Tabs>
  );
}
