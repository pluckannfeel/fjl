import React, { useMemo } from "react";
import {
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
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import classes from "../classes/DashboardHeader.module.scss";

import { useTranslation } from "react-i18next";
import { NavLink, NavLinkProps, useNavigate } from "react-router-dom";
import { useApplicantAuth } from "../contexts/ApplicantAuthProvider";
import { LanguageToggleAction } from "../../core/components/LanguageToggleActions";
import { showNotification } from "@mantine/notifications";

const mockdata = [
  {
    icon: IconCode,
    title: "Open source",
    description: "This Pokémon’s cry is very loud and distracting",
  },
  {
    icon: IconCoin,
    title: "Free for everyone",
    description: "The fluid of Smeargle’s tail secretions changes",
  },
  {
    icon: IconBook,
    title: "Documentation",
    description: "Yanma is capable of seeing 360 degrees without",
  },
  {
    icon: IconFingerprint,
    title: "Security",
    description: "The shell’s rounded shape and the grooves on its.",
  },
  {
    icon: IconChartPie3,
    title: "Analytics",
    description: "This Pokémon uses its flying ability to quickly chase",
  },
  {
    icon: IconNotification,
    title: "Notifications",
    description: "Combusken battles with the intensely hot flames it spews",
  },
];

const DashboardHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const { logout } = useApplicantAuth();

  const handleLogout = () => {
    // console.log("logout");
    logout().catch(() =>
      showNotification({
        title: t("common.errors.unexpected.title"),
        message: t("common.errors.unexpected.subTitle"),
        color: "red",
      })
    );
  };

  const links = mockdata.map((item) => (
    <UnstyledButton className={classes.subLink} key={item.title}>
      <Group wrap="nowrap" align="flex-start">
        <ThemeIcon size={34} variant="default" radius="md">
          <item.icon
            style={{ width: rem(22), height: rem(22) }}
            color={theme.colors.blue[6]}
          />
        </ThemeIcon>
        <div>
          <Text size="sm" fw={500}>
            {item.title}
          </Text>
          <Text size="xs" c="dimmed">
            {item.description}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ));

  return (
    <Box
      // pb={120}
      pb={20}
    >
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* <MantineLogo size={30} /> */}
          <Text size="xl" c="white" fw={700}>
            {t("mirairo.name")}
          </Text>

          <Group h="100%" gap={0} visibleFrom="sm">
            <a
              // href="/applicant-dashboard"
              onClick={() => navigate("/applicant-dashboard")}
              className={classes.link}
            >
              {t("mirairo.links.dashboard")}
            </a>
            <a
              // href="/generate-resume"
              onClick={() => navigate("/applicant-dashboard/mirairo-resume")}
              className={classes.link}
            >
              {t("mirairo.links.yourResume")}
            </a>
            {/* <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <a href="#" className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      Features
                    </Box>
                    <IconChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                      color={theme.colors.blue[6]}
                    />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Features</Text>
                  <Anchor href="#" fz="xs">
                    View all
                  </Anchor>
                </Group>

                <Divider my="sm" />

                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        Their food sources have decreased, and their numbers
                      </Text>
                    </div>
                    <Button variant="default">Get started</Button>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard> */}
            {/* <a href="#" className={classes.link}>
              Learn
            </a>
            <a href="#" className={classes.link}>
              Academy
            </a> */}
          </Group>

          <Group visibleFrom="sm">
            <LanguageToggleAction />
            <Button onClick={handleLogout} variant="default">
              {t("common.logout")}
            </Button>

            {/* <Button>Sign up</Button> */}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            hiddenFrom="sm"
          />
        </Group>
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
        {/* <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md"> */}
        <Divider my="sm" />

        <a
          onClick={() => navigate("/applicant-dashboard")}
          className={classes.link}
        >
          {t("mirairo.links.dashboard")}
        </a>
        <a
          onClick={() => navigate("/applicant-dashboard/mirairo-resume")}
          className={classes.link}
        >
          {t("mirairo.links.yourResume")}
        </a>
        {/* <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Features
              </Box>
              <IconChevronDown
                style={{ width: rem(16), height: rem(16) }}
                color={theme.colors.blue[6]}
              />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <a href="#" className={classes.link}>
            Learn
          </a>
          <a href="#" className={classes.link}>
            Academy
          </a> */}

        <Divider my="sm" />

        <Group justify="center" grow pb="xl" px="md">
          <LanguageToggleAction />
          <Button onClick={handleLogout} variant="default">
            {t("common.logout")}
          </Button>
          {/* <Button>Sign up</Button> */}
        </Group>
        {/* </ScrollArea> */}
      </Drawer>
    </Box>
  );
};

export default DashboardHeader;
