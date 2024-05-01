import { useState } from "react";
import { Center, Tooltip, UnstyledButton, Stack, rem } from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconUsersGroup,
} from "@tabler/icons-react";
import classes from "@/admin/classes/AdminNavbar.module.scss";
import { useAuth } from "@/auth/contexts/AuthProvider";
import { useTranslation } from "react-i18next";
import { LanguageToggleAction } from "@/core/components/LanguageToggleActions";
import { useNavigate } from "react-router";
import { FontSizeToggleAction } from "@/core/components/FontSizeToggleAction";
import { ModeToggleAction } from "@/core/components/ModeToggleAction";
import ThemeSwitch from "@/core/components/ThemeSwitch";
import { useLocalStorage } from "@mantine/hooks";

const mockdata = [
  { icon: IconHome2, label: "admin.drawer.menu.home", path: "/admin" },
  {
    icon: IconUsersGroup,
    label: "admin.drawer.menu.applicants",
    path: "/admin/applicants",
  },
  // { icon: IconGauge, label: "Dashboard", pa },
  {
    icon: IconDeviceDesktopAnalytics,
    label: "admin.drawer.menu.analytics",
    path: "/admin/analytics",
  },
  // { icon: IconCalendarStats, label: "Releases" },
  {
    icon: IconUser,
    label: "admin.drawer.menu.account",
    path: "/admin/account",
  },
  // { icon: IconFingerprint, label: "Security" },
  {
    icon: IconSettings,
    label: "admin.drawer.menu.settings",
    path: "/admin/settings",
  },
];

// const linksMockdata = [
//   "Security",
//   "Settings",
//   "Dashboard",
//   "Releases",
//   "Account",
//   "Orders",
//   "Clients",
//   "Databases",
//   "Pull Requests",
//   "Open Issues",
//   "Wiki pages",
// ];

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  active?: boolean;
  onClick?(): void;
}

const NavbarLink = ({
  icon: Icon,
  label,
  active,
  onClick,
}: NavbarLinkProps) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      label={t(label)}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
        className={classes.link}
        data-active={active || undefined}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

const AdminNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  // const [active, setActive] = useState(0);
  const [active, setActive] = useLocalStorage({
    key: "activeNavbarLink",
    defaultValue: 0,
    getInitialValueInEffect: true,
  });
  const { logout } = useAuth();

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.path);
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center>{/* <MantineLogo type="mark" size={30} /> */}FJL</Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={2}>
          {links}
        </Stack>
      </div>

      <Stack justify="center" gap={10}>
        {/* <NavbarLink icon={IconSwitchHorizontal} label="Change account" /> */}
        {/* <ModeToggleAction /> */}

        <FontSizeToggleAction />
        <LanguageToggleAction />
        <ThemeSwitch />
        <NavbarLink
          icon={IconLogout}
          label={t("admin.drawer.menu.logout")}
          onClick={logout}
        />
      </Stack>
    </nav>
  );
};
export default AdminNavbar;
