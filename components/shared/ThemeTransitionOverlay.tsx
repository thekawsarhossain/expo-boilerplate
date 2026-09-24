import { Image } from "expo-image";
import { useCallback, useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

import { THEME_COMMIT_TIMEOUT_MS, THEME_CROSSFADE_MS } from "@/constants/ui";
import { useColorScheme } from "@/hooks/useColorScheme";
import { releaseThemeSnapshot } from "@/lib/theme/theme-snapshot";
import { useThemeTransitionStore } from "@/lib/theme/theme-transition-store";

const CROSSFADE_EASING = Easing.inOut(Easing.quad);

function afterNextPaint(callback: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(callback));
}

export function ThemeTransitionOverlay() {
  const { colorScheme } = useColorScheme();
  const snapshotUri = useThemeTransitionStore((state) => state.snapshotUri);
  const applyTheme = useThemeTransitionStore((state) => state.applyTheme);
  const finishTransition = useThemeTransitionStore((state) => state.finishTransition);
  const opacity = useSharedValue(1);
  const isAwaitingThemeCommit = useRef(false);
  const commitTimeout = useRef<ReturnType<typeof setTimeout>>(undefined);

  const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));

  const completeTransition = useCallback(() => {
    if (snapshotUri) releaseThemeSnapshot(snapshotUri);
    finishTransition();
  }, [snapshotUri, finishTransition]);

  const revealNewTheme = useCallback(() => {
    if (!isAwaitingThemeCommit.current) return;
    isAwaitingThemeCommit.current = false;
    clearTimeout(commitTimeout.current);

    afterNextPaint(() => {
      opacity.value = withTiming(
        0,
        { duration: THEME_CROSSFADE_MS, easing: CROSSFADE_EASING },
        (isFinished) => {
          if (!isFinished) return;
          opacity.value = 1;
          scheduleOnRN(completeTransition);
        },
      );
    });
  }, [completeTransition, opacity]);

  const handleSnapshotDisplayed = useCallback(() => {
    requestAnimationFrame(() => {
      isAwaitingThemeCommit.current = true;
      commitTimeout.current = setTimeout(revealNewTheme, THEME_COMMIT_TIMEOUT_MS);
      applyTheme?.();
    });
  }, [applyTheme, revealNewTheme]);

  useEffect(() => {
    revealNewTheme();
  }, [colorScheme, revealNewTheme]);

  useEffect(() => () => clearTimeout(commitTimeout.current), []);

  if (!snapshotUri) return null;

  return (
    <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, animatedStyle]}>
      <Image
        source={{ uri: snapshotUri }}
        style={StyleSheet.absoluteFill}
        contentFit="cover"
        cachePolicy="none"
        onDisplay={handleSnapshotDisplayed}
      />
    </Animated.View>
  );
}
