import * as WebBrowser from "expo-web-browser";
import { Linking, Platform } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import { ClearCacheItem } from "@/components/screens/settings/ClearCacheItem";
import { NotificationItem } from "@/components/screens/settings/NotificationItem";
import { ThemeSettingItem } from "@/components/screens/settings/ThemeItem";
import List, { ListHeader } from "@/components/ui/list";
import ListItem from "@/components/ui/list-item";
import { Muted } from "@/components/ui/typography";
import { appConfig } from "@/config/app";
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
    <ScrollView className="flex-1 w-full bg-background px-5 pt-4" contentContainerClassName="pb-10">
      <List>
        <ListHeader>
          <Muted className="uppercase tracking-wider text-xs">Preferences</Muted>
        </ListHeader>
        <ThemeSettingItem />
        {Platform.OS !== "web" && <NotificationItem />}
        <ClearCacheItem />

        <ListHeader className="pt-8">
          <Muted className="uppercase tracking-wider text-xs">About</Muted>
        </ListHeader>
        <ListItem
          itemLeft={(props) => <Star {...props} />}
          label="Star on GitHub"
          onPress={() => openExternalUrl(REPOSITORY_URL)}
        />
        <ListItem
          itemLeft={(props) => <Send {...props} />}
          label="Send feedback"
          onPress={() => openExternalUrl(FEEDBACK_URL)}
        />
      </List>

      <Muted className="pt-8 text-center text-xs">Version {appConfig.version}</Muted>
    </ScrollView>
  );
}
