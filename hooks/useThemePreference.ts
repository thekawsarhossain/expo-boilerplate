import { useCallback, useState } from "react";
import { Platform } from "react-native";

import { STORAGE_KEYS } from "@/constants/storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getItem, setItem } from "@/lib/storage";
import { captureThemeSnapshot } from "@/lib/theme/theme-snapshot";
import { themeSnapshotRootRef } from "@/lib/theme/theme-snapshot-root";
import { useThemeTransitionStore } from "@/lib/theme/theme-transition-store";
import type { ThemePreference } from "@/types/theme";

function readStoredPreference(): ThemePreference {
  return getItem<ThemePreference>(STORAGE_KEYS.theme) ?? "system";
}

export function useThemePreference() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const startTransition = useThemeTransitionStore((state) => state.startTransition);
  const isTransitioning = useThemeTransitionStore((state) => state.snapshotUri !== null);
  const [selectedPreference, setSelectedPreference] =
    useState<ThemePreference>(readStoredPreference);

  const setPreference = useCallback(
    async (nextPreference: ThemePreference) => {
      if (nextPreference === selectedPreference || isTransitioning) return;

      const applyPreference = () => {
        setItem(STORAGE_KEYS.theme, nextPreference);
        setSelectedPreference(nextPreference);
        setColorScheme(nextPreference);
      };

      if (Platform.OS === "web" || nextPreference === colorScheme) {
        applyPreference();
        return;
      }

      const snapshotUri = await captureThemeSnapshot(themeSnapshotRootRef);
      if (!snapshotUri) {
        applyPreference();
        return;
      }
      startTransition(snapshotUri, applyPreference);
    },
    [selectedPreference, isTransitioning, colorScheme, setColorScheme, startTransition],
  );

  return { preference: selectedPreference, setPreference };
}
