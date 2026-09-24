import type { Theme } from "@react-navigation/native";

import type { ColorScheme } from "@/types/theme";

export const NAV_THEME: Record<ColorScheme, Theme["colors"]> = {
  light: {
    background: "hsl(84 29% 96%)",
    border: "hsl(90 18% 89%)",
    card: "hsl(0 0% 100%)",
    notification: "hsl(0 72% 51%)",
    primary: "hsl(97 66% 36%)",
    text: "hsl(110 17% 7%)",
  },
  dark: {
    background: "hsl(135 15% 5%)",
    border: "hsl(126 11% 15%)",
    card: "hsl(128 13% 9%)",
    notification: "hsl(0 72% 55%)",
    primary: "hsl(85 57% 55%)",
    text: "hsl(94 27% 93%)",
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

export const FAVORITE_COLOR = "hsl(0 84% 60%)";
