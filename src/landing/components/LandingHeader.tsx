import React, { useState } from "react";
import {
  Container,
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
// import { MantineLogo } from "@mantinex/mantine-logo";
import classes from "../classes/LandingHeader.module.scss";
import { useTranslation } from "react-i18next";
import { NavLink, NavLinkProps, useNavigate } from "react-router-dom";
import { LanguageToggleAction } from "../../core/components/LanguageToggleActions";
import { FontSizeToggleAction } from "../../core/components/FontSizeToggleAction";
import smoothScrollTo from "../functions/function";
import { links } from "../helpers/constants";
import { useActiveSectionContext } from "../contexts/ActiveSectionProvider";

interface LandingHeaderProps {
  title: string;
  // sections: {
  //   [key: string]: React.RefObject<HTMLDivElement>;
  // };
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ title }) => {
  const [opened, { toggle }] = useDisclosure(false);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const theme = useMantineTheme();
  const { t } = useTranslation();

  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const items = links.map((link) => (
    <a
      key={link.hash}
      href={link.hash}
      className={classes.link}
      data-active={activeSection === link.id || undefined}
      onClick={(event) => {
        // event.preventDefault();

        setActiveSection(link.id);
        setTimeOfLastClick(Date.now());
      }}
    >
      {t(link.name)}
    </a>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          {/* <MantineLogo size={28} /> */}
          <Text size="xl" c="white" fw={700}>
            {title}
          </Text>
          <Group gap={8} visibleFrom="sm">
            {items}
            <LanguageToggleAction />
            <FontSizeToggleAction />
          </Group>

          {/* <Group visibleFrom="s4m"></Group> */}

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
            size="sm"
          />
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Navigation"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <Divider my="sm" />

        <Group flex={"1"}>
          <LanguageToggleAction />
          <FontSizeToggleAction />
        </Group>
      </Drawer>

      {/* Invisible elements for scrolling */}
    </>
  );
};

export default LandingHeader;
