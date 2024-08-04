import { Center, Tooltip, UnstyledButton, Stack, rem, Text } from "@mantine/core";
import { IconBuilding, IconBuildingSkyscraper } from "@tabler/icons-react";
import classes from "@/admin/classes/DatabaseNavbar.module.scss";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useLocalStorage } from "@mantine/hooks";

const mockdata = [
  {
    icon: IconBuildingSkyscraper,
    label: "database.drawer.menu.company",
    path: "/admin/database/company",
    disabled: false,
  },
  {
    icon: IconBuilding,
    label: "database.drawer.menu.agency",
    path: "/admin/database/agency",
    disabled: true,
  },
];

interface NavbarLinkProps {
  icon: typeof IconBuildingSkyscraper;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick, disabled }: NavbarLinkProps) => {
  const { t } = useTranslation();
  return (
    <Tooltip
      label={t(label)}
      position="right"
      transitionProps={{ duration: 0 }}
    >
      <UnstyledButton
        onClick={onClick}
        className={`${classes.link} ${disabled ? classes.disabled : ''}`}
        data-active={active || undefined}
        disabled={disabled}
      >
        <Icon style={{ width: rem(20), height: rem(20), marginRight: rem(20) }} stroke={1.5} />
        <Text style={{color: "inherit"}} fz={"lg"} fw={"bold"}>{t(label)}</Text>
      </UnstyledButton>
    </Tooltip>
  );
};

const DatabaseNavbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [active, setActive] = useLocalStorage({
    key: "activeDatabaseNavbarLink",
    defaultValue: 0,
    getInitialValueInEffect: true,
  });

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        if (!link.disabled) {
          setActive(index);
          navigate(link.path);
        }
      }}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <Center ><Text fz={"lg"} fw={"bold"} c={"orange.7"}>マスター</Text></Center>

      <div className={classes.navbarMain}>
        <Stack justify="center" gap={2}>
          {links}
        </Stack>
      </div>
    </nav>
  );
};

export default DatabaseNavbar;
