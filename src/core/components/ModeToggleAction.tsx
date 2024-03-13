import cx from "clsx";
import {
  ActionIcon,
  useMantineColorScheme,
  useComputedColorScheme,
  Group,
} from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "../classes/ModeToggleAction.module.css";
import { useSettings } from "../contexts/SettingsProvider";

export function ModeToggleAction() {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const { changeMode } = useSettings();

  const toggleColorScheme = () => {
    const newScheme = colorScheme === "light" ? "dark" : "light";
    setColorScheme(newScheme);
    changeMode(newScheme); // This should trigger your application to re-render with the new theme
  };

  return (
    <Group justify="center">
      <ActionIcon
        onClick={toggleColorScheme}
        variant="gradient"
        size="lg"
        aria-label="Toggle color scheme"
      >
        {/* <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
        <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} /> */}
        {colorScheme === "light" ? (
          <IconMoon stroke={1.5} />
        ) : (
          <IconSun stroke={1.5} />
        )}
      </ActionIcon>
    </Group>
  );
}
