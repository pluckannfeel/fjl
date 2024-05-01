import { useState, useEffect } from "react";
import {
  Switch,
  useMantineTheme,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import { useSettings } from "../contexts/SettingsProvider";

const ThemeSwitch: React.FC = () => {
  const theme = useMantineTheme();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const [checked, setChecked] = useState(colorScheme === "dark");
  const { mode, changeMode } = useSettings();
  // Update checked state based on external changes to colorScheme
  useEffect(() => {
    setChecked(colorScheme === "dark");
    setChecked(mode === "dark");
  }, [colorScheme, mode]);

  const toggleColorScheme = (isChecked: boolean) => {
    setColorScheme(isChecked ? "dark" : "light");
    changeMode(isChecked ? "dark" : "light");
  };

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );

  return (
    <Switch
      size="md"
      color="dark.4"
      checked={checked}
      onChange={(event) => toggleColorScheme(event.currentTarget.checked)}
      onLabel={sunIcon}
      offLabel={moonIcon}
    />
  );
};

export default ThemeSwitch;
