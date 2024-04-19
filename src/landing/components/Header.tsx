import React from "react";
import {
  Menu,
  Group,
  Center,
  Container,
  Text,
  Burger,
  useProps,
  useMantineTheme,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  ScrollArea,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconHome,
  IconSettingsFilled,
} from "@tabler/icons-react";
import classes from "../classes/Header.module.css";
import { ModeToggleAction } from "../../core/components/ModeToggleAction";
import { FontSizeToggleAction } from "../../core/components/FontSizeToggleAction";
import { LanguageToggleAction } from "../../core/components/LanguageToggleActions";

interface Link {
  link: string;
  label: string;
  icon?: React.ReactNode; // Optional icon for each link
  isAction?: boolean;
  links?: Link[]; // Sub-links for nested menus
}

const links: Link[] = [
  {
    link: "/settings",
    label: "Settings",
    icon: <IconSettingsFilled size={20} />,
    isAction: true,
  },
];

interface LandingHeaderProps {
  title: string;
}

export function LandingHeader({ title }: LandingHeaderProps) {
  //   const [opened, { toggle }] = useDisclosure(false);
  //   const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
  //     useDisclosure(false);
  const theme = useMantineTheme();

  const handleClick = (e: React.MouseEvent, link: Link) => {
    e.preventDefault();
    if (link.isAction) {
      console.log("Performing an action");
      // Perform action here
    } else {
      // Navigate
      console.log(`Navigating to ${link.link}`);
      // Implement navigation logic here
    }
  };

  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} onClick={(e) => handleClick(e, link)}>
        {item.label}
      </Menu.Item>
    ));

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={(e) => handleClick(e, link)}
      >
        <Center>
          {link.icon && (
            <span
              style={{
                marginRight: 5,
                marginTop: 2.5,
                color: theme.colors.text[4],
              }}
            >
              {link.icon}
            </span>
          )}
          <span
            style={{ color: theme.colors.text[4] }}
            className={classes.linkLabel}
          >
            {link.label}
          </span>
        </Center>
      </a>
    );
  });

  return (
    <header
      // style={{
      //   backgroundColor: theme.colors.primary[4],
      //   color: theme.colors.text[4],
      // }}
      className={classes.header}
    >
      <Container size="md">
        <div className={classes.inner}>
          <Text size="xl" c="white" fw={700}>
            {title}
          </Text>
          <Group gap={5} 
        //   visibleFrom="sm"
          >
            {/* {items} */}

            <FontSizeToggleAction />
            {/* <ModeToggleAction /> */}
            <LanguageToggleAction />
          </Group>
          {/* <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            size="sm"
            hiddenFrom="sm"
          /> */}
        </div>
      </Container>
    </header>
  );
}
