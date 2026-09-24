import { View } from "react-native";

import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { appConfig } from "@/config/app";

const APP_ICON = require("@/assets/images/icon.png");

export function AppInfoCard() {
  return (
    <View className="flex-row items-center gap-4 rounded-2xl bg-card p-4">
      <Image source={APP_ICON} className="size-14 rounded-2xl" accessibilityIgnoresInvertColors />
      <View className="flex-1 gap-0.5">
        <Text className="text-lg font-bold">{appConfig.name}</Text>
        <Text className="text-xs text-muted-foreground">
          Version {appConfig.version} · by thekawsarhossain
        </Text>
      </View>
    </View>
  );
}
