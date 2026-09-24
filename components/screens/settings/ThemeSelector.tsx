import { useEffect, useRef, useState } from "react";
import { type LayoutChangeEvent, Pressable, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { Text } from "@/components/ui/text";
import { THEME_INDICATOR_MS } from "@/constants/ui";
import { useThemePreference } from "@/hooks/useThemePreference";
import { Moon, Smartphone, Sun } from "@/lib/icons";
import { cn } from "@/lib/utils";
import type { ThemePreference } from "@/types/theme";

type ThemeOption = {
  value: ThemePreference;
  label: string;
  Icon: typeof Sun;
};

const THEME_OPTIONS: ThemeOption[] = [
  { value: "system", label: "System", Icon: Smartphone },
  { value: "light", label: "Light", Icon: Sun },
  { value: "dark", label: "Dark", Icon: Moon },
];

const TRACK_PADDING = 6;

const INDICATOR_TIMING = { duration: THEME_INDICATOR_MS, easing: Easing.out(Easing.cubic) };

export function ThemeSelector() {
  const { preference, setPreference } = useThemePreference();
  const [segmentWidth, setSegmentWidth] = useState(0);
  const indicatorOffset = useSharedValue(0);
  const hasPositionedIndicator = useRef(false);

  const selectedIndex = THEME_OPTIONS.findIndex((option) => option.value === preference);

  useEffect(() => {
    if (!segmentWidth) return;
    const targetOffset = selectedIndex * segmentWidth;
    if (!hasPositionedIndicator.current) {
      hasPositionedIndicator.current = true;
      indicatorOffset.value = targetOffset;
      return;
    }
    indicatorOffset.value = withTiming(targetOffset, INDICATOR_TIMING);
  }, [selectedIndex, segmentWidth, indicatorOffset]);

  const indicatorStyle = useAnimatedStyle(() => ({
    width: segmentWidth,
    transform: [{ translateX: indicatorOffset.value }],
  }));

  function handleTrackLayout(event: LayoutChangeEvent) {
    const trackWidth = event.nativeEvent.layout.width;
    setSegmentWidth((trackWidth - TRACK_PADDING * 2) / THEME_OPTIONS.length);
  }

  return (
    <View
      onLayout={handleTrackLayout}
      className="flex-row rounded-2xl bg-card"
      style={{ padding: TRACK_PADDING }}
      accessibilityRole="radiogroup"
    >
      {segmentWidth > 0 && (
        <Animated.View
          className="absolute bottom-1.5 left-1.5 top-1.5 rounded-xl bg-primary"
          style={indicatorStyle}
        />
      )}
      {THEME_OPTIONS.map(({ value, label, Icon }) => {
        const isSelected = preference === value;
        return (
          <Pressable
            key={value}
            onPress={() => setPreference(value)}
            className="flex-1 items-center gap-1.5 py-3 active:opacity-80"
            accessibilityRole="radio"
            accessibilityState={{ checked: isSelected }}
            accessibilityLabel={`${label} theme`}
          >
            <Icon
              className={isSelected ? "text-primary-foreground" : "text-muted-foreground"}
              size={20}
            />
            <Text
              className={cn(
                "text-xs font-semibold",
                isSelected ? "text-primary-foreground" : "text-muted-foreground",
              )}
            >
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
