import { useState } from "react";
import {
  UnstyledButton,
  Tooltip,
  Title,
  rem,
  Button,
  Group,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
} from "@tabler/icons-react";
import classes from "@/admin/classes/AdminNavbar.module.scss";
import { useAuth } from "@/auth/contexts/AuthProvider";
import { useTranslation } from "react-i18next";

const mainLinksMockdata = [
  { icon: IconHome2, label: "Home" },
  { icon: IconGauge, label: "Dashboard" },
  { icon: IconDeviceDesktopAnalytics, label: "Analytics" },
  { icon: IconCalendarStats, label: "Releases" },
  { icon: IconUser, label: "Account" },
  { icon: IconFingerprint, label: "Security" },
  { icon: IconSettings, label: "Settings" },
];

const linksMockdata = [
  "Security",
  "Settings",
  "Dashboard",
  "Releases",
  "Account",
  "Orders",
  "Clients",
  "Databases",
  "Pull Requests",
  "Open Issues",
  "Wiki pages",
];

export function AdminNavbar() {
  const [active, setActive] = useState("Releases");
  const [activeLink, setActiveLink] = useState("Settings");
  const { logout } = useAuth();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect or perform additional actions post-logout
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  const mainLinks = mainLinksMockdata.map((link) => (
    <Tooltip
      label={link.label}
      position="right"
      withArrow
      transitionProps={{ duration: 0 }}
      key={link.label}
    >
      <UnstyledButton
        onClick={() => setActive(link.label)}
        className={classes.mainLink}
        data-active={link.label === active || undefined}
      >
        <link.icon style={{ width: rem(22), height: rem(22) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  ));

  const links = linksMockdata.map((link) => (
    <a
      className={classes.link}
      data-active={activeLink === link || undefined}
      href="#"
      onClick={(event) => {
        event.preventDefault();
        setActiveLink(link);
      }}
      key={link}
    >
      {link}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.aside}>
          <div className={classes.logo}>
            {/* <MantineLogo type="mark" size={30} /> */}
          </div>
          {mainLinks}
        </div>

        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            {active}
          </Title>

          {links}

          <Group p={20}>
            <Button fullWidth mt={"xl"} onClick={handleLogout}>
              {t("common.logout")}
            </Button>
          </Group>
        </div>
      </div>
    </nav>
  );
}
