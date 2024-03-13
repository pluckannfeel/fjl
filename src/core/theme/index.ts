import {
  MantineThemeOverride,
  DEFAULT_THEME,
  createTheme,
  mergeMantineTheme,
} from "@mantine/core";
import { LightTheme } from "./light";
import { DarkTheme } from "./dark";
import { smallFonts, normalFonts, largeFonts } from "./typography";

interface BaseThemeProps {
  mode: "light" | "dark";
  fontSize: "large" | "normal" | "small";
  direction?: "ltr" | "rtl";
}

export const CreateBaseTheme = ({
  mode,
  fontSize,
  direction,
}: BaseThemeProps) => {
  const theme = mode === "light" ? LightTheme : DarkTheme;

  const typography =
    fontSize === "small"
      ? smallFonts
      : fontSize === "large"
      ? largeFonts
      : normalFonts;

  const themeOverride: MantineThemeOverride = createTheme({
    ...theme,
    // primaryColor: "red",
    defaultRadius: "md",
    // defaultGradient: {
    //   from: "orange.7",
    //   to: "action.4",
    //   deg: 45,
    // },
    // fontFamily: "Inter, sans-serif",
    fontFamily: "Roboto, sans-serif",
    // lineHeight: 1.6,
    // headings: {
    //   fontFamily: "Inter, sans-serif",
    //   fontWeight: 600,
    //   lineHeight: 1.2,
    // },
    headings: {
      fontFamily: "Roboto, sans-serif",
      ...typography.sizes,
    },
    fontSizes: typography.fontsizes,
    // other: {
    //   body: {
    //     backgroundColor: theme.colors!.primary![0],
    //     color: theme.colors!.text![0],
    //   },
    // },
    // primaryColor: "blue",
    // colors: {
    //   ...DEFAULT_THEME.colors,
    //   dark: "#282c35",
    //   light: "#fff",
    //   gray: [
    //     "#f7f7f7",
    //     "#e1e1e1",
    //     "#cfcfcf",
    //     "#b1b1b1",
    //     "#9e9e9e",
    //     "#7d7d7d",
    //     "#626262",
    //     "#515151",
    //     "#3b3b3b",
    //     "#222",
    //   ],
    // },
    shadows: {
      xs: "0 1px 2px rgba(0, 0, 0, 0.07)",
      sm: "0 1px 3px rgba(0, 0, 0, 0.1)",
      md: "0 2px 4px rgba(0, 0, 0, 0.12)",
      lg: "0 3px 6px rgba(0, 0, 0, 0.15)",
      xl: "0 8px 16px rgba(0, 0, 0, 0.2)",
      "2xl": "0 12px 24px rgba(0, 0, 0, 0.25)",
      "3xl": "0 16px 32px rgba(0, 0, 0, 0.3)",
    },
  });

  return mergeMantineTheme(DEFAULT_THEME, themeOverride);
  // return themeOverride;
};
