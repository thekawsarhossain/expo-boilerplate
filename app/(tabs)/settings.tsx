import * as WebBrowser from "expo-web-browser";
import { Linking, Platform, ScrollView, View } from "react-native";

import { AppInfoCard } from "@/components/screens/settings/AppInfoCard";
import { ClearCacheRow } from "@/components/screens/settings/ClearCacheRow";
import { NotificationRow } from "@/components/screens/settings/NotificationRow";
import { SettingsRow } from "@/components/screens/settings/SettingsRow";
import { SettingsSection } from "@/components/screens/settings/SettingsSection";
import { SettingsSectionTitle } from "@/components/screens/settings/SettingsSectionTitle";
import { ThemeSelector } from "@/components/screens/settings/ThemeSelector";
import { ScreenHeader } from "@/components/shared/ScreenHeader";
import { FEEDBACK_URL, REPOSITORY_URL } from "@/constants/links";
import { Send, Star } from "@/lib/icons";

function openExternalUrl(url: string) {
  if (Platform.OS === "web") {
    Linking.openURL(url);
    return;
  }
  WebBrowser.openBrowserAsync(url);
}

export default function SettingsScreen() {
  return (
    <View className="flex-1 bg-background">
      <ScreenHeader title="Settings" subtitle="Make the app yours" />
      <ScrollView contentContainerClassName="gap-7 px-5 pb-10">
        <AppInfoCard />

        <View className="gap-2">
          <SettingsSectionTitle title="Appearance" />
          <ThemeSelector />
        </View>

        <SettingsSection title="General">
          {Platform.OS !== "web" && <NotificationRow />}
          <ClearCacheRow />
        </SettingsSection>

        <SettingsSection title="Support">
          <SettingsRow
            icon={<Star className="text-primary" size={18} />}
            label="Star on GitHub"
            description="Show some love for the project"
            onPress={() => openExternalUrl(REPOSITORY_URL)}
          />
          <SettingsRow
            icon={<Send className="text-primary" size={18} />}
            label="Send feedback"
            description="Report a bug or suggest an idea"
            onPress={() => openExternalUrl(FEEDBACK_URL)}
          />
        </SettingsSection>
      </ScrollView>
    </View>
  );
}
