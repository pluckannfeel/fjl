import cx from "clsx";
import { ActionIcon, Group } from "@mantine/core";
import { IconSun, IconMoon, IconLetterCase } from "@tabler/icons-react";
import classes from "../classes/ModeToggleAction.module.css";
import { useSettings } from "../contexts/SettingsProvider";

export function FontSizeToggleAction() {
  const { changeFontSize, fontSize } = useSettings();

  return (
    <Group justify="center">
      <ActionIcon
        onClick={() => {
          changeFontSize(
            fontSize === "large"
              ? "normal"
              : fontSize === "normal"
              ? "small"
              : "large"
          );
        }}
        variant="default"
        size="lg"
        aria-label="Toggle color scheme"
      >
        <IconLetterCase
          className={cx(classes.icon, classes.light)}
          stroke={1.5}
        />
        <IconLetterCase
          className={cx(classes.icon, classes.dark)}
          stroke={1.5}
        />
      </ActionIcon>
    </Group>
  );
}
