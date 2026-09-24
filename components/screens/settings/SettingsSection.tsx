import { Children, Fragment, type ReactNode } from "react";
import { View } from "react-native";

import { SettingsSectionTitle } from "./SettingsSectionTitle";

type SettingsSectionProps = {
  title: string;
  children: ReactNode;
};

export function SettingsSection({ title, children }: SettingsSectionProps) {
  const rows = Children.toArray(children);

  return (
    <View className="gap-2">
      <SettingsSectionTitle title={title} />
      <View className="overflow-hidden rounded-2xl bg-card">
        {rows.map((row, index) => (
          <Fragment key={index}>
            {index > 0 && <View className="h-px bg-border" />}
            {row}
          </Fragment>
        ))}
      </View>
    </View>
  );
}
