import { Text } from "@/components/ui/text";

type SettingsSectionTitleProps = {
  title: string;
};

export function SettingsSectionTitle({ title }: SettingsSectionTitleProps) {
  return (
    <Text className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
      {title}
    </Text>
  );
}
