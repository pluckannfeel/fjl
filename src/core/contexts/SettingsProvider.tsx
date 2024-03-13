import React, { createContext, useContext, useMemo, useState } from "react";
import { MantineProvider, localStorageColorSchemeManager } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
useLocalStorage;
import { CreateBaseTheme } from "../theme";
import { useLocalStorage } from "@mantine/hooks";
import i18n from "../config/i18n";
import { Notifications } from "@mantine/notifications";

interface SettingsContextInterface {
  collapsed: boolean;
  mode: "light" | "dark" | "auto";
  fontSize: "large" | "normal" | "small";
  direction?: "ltr" | "rtl";
  changeCollapsed: (collapsed: boolean) => void;
  changeMode: (mode: "light" | "dark" | "auto") => void;
  changeFontSize: (size: "large" | "normal" | "small") => void;
  setDirection?: (dir: "ltr" | "rtl") => void;
  toggleDrawer: () => void;
}

export const SettingsContext = createContext({} as SettingsContextInterface);

type SettingsProviderProps = {
  children: React.ReactNode;
};

type ThemeProps = {
  mode: "light" | "dark";
  fontSize: "large" | "normal" | "small";
};

const SettingsProvider = ({ children }: SettingsProviderProps) => {
  const [collapsed, setCollapsed] = useLocalStorage<boolean>({
    key: "collapsed",
    defaultValue: false,
  });
  const [mode, setMode] = useLocalStorage<"auto" | "light" | "dark">({
    key: "mode",
    defaultValue: "dark",
  });
  const [fontSize, setFontSize] = useLocalStorage<"large" | "normal" | "small">(
    {
      key: "fontSize",
      defaultValue: "normal",
    }
  );
  const [open, setOpen] = useState(false);

  // The locale can be directly derived from i18n.language
  const locale = i18n.language;

  const theme = useMemo(
    () => CreateBaseTheme({ mode, fontSize } as ThemeProps),
    [mode, fontSize]
  );

  const changeCollapsed = (collapsed: boolean) => {
    setCollapsed(collapsed);
  };

  const changeMode = (mode: "auto" | "light" | "dark") => {
    setMode(mode);
  };

  const changeFontSize = (fontSize: "large" | "normal" | "small") => {
    if (fontSize) {
      setFontSize(fontSize);
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <SettingsContext.Provider
      value={{
        collapsed,
        mode,
        fontSize,
        changeCollapsed,
        changeMode,
        changeFontSize,
        toggleDrawer,
      }}
    >
      <MantineProvider theme={theme} withCssVariables>
        <DatesProvider
          settings={{
            firstDayOfWeek: 0,
            locale: locale,
            timezone: "UTC",
          }}
        >
          <Notifications />
          {children}
        </DatesProvider>
      </MantineProvider>
    </SettingsContext.Provider>
  );
};

export function useSettings() {
  return useContext(SettingsContext);
}

export default SettingsProvider;
