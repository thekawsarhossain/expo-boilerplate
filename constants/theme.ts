import type { Theme } from "@react-navigation/native";

import type { ColorScheme } from "@/types/theme";

export const NAV_THEME: Record<ColorScheme, Theme["colors"]> = {
  light: {
    background: "hsl(250 33% 98%)",
    border: "hsl(250 20% 90%)",
    card: "hsl(0 0% 100%)",
    notification: "hsl(0 84% 60%)",
    primary: "hsl(262 83% 58%)",
    text: "hsl(250 30% 10%)",
  },
  dark: {
    background: "hsl(250 25% 6%)",
    border: "hsl(250 18% 18%)",
    card: "hsl(250 22% 10%)",
    notification: "hsl(0 72% 51%)",
    primary: "hsl(263 90% 72%)",
    text: "hsl(250 20% 97%)",
  },
};

const NAV_FONTS: Theme["fonts"] = {
  regular: { fontFamily: "Inter_400Regular", fontWeight: "400" },
  medium: { fontFamily: "Inter_600SemiBold", fontWeight: "500" },
  bold: { fontFamily: "Inter_600SemiBold", fontWeight: "600" },
  heavy: { fontFamily: "Inter_600SemiBold", fontWeight: "700" },
};

export const LIGHT_THEME: Theme = {
  dark: false,
  fonts: NAV_FONTS,
  colors: NAV_THEME.light,
};

export const DARK_THEME: Theme = {
  dark: true,
  fonts: NAV_FONTS,
  colors: NAV_THEME.dark,
};
