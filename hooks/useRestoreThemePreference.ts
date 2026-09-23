import { useEffect } from "react";

import { STORAGE_KEYS } from "@/constants/storage";
import { useColorScheme } from "@/hooks/useColorScheme";
import { getItem, setItem } from "@/lib/storage";
import type { ThemePreference } from "@/types/theme";

export function useRestoreThemePreference() {
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    const storedPreference = getItem<ThemePreference>(STORAGE_KEYS.theme);
    if (storedPreference) {
      setColorScheme(storedPreference);
      return;
    }
    setItem<ThemePreference>(STORAGE_KEYS.theme, "system");
  }, [setColorScheme]);
}
