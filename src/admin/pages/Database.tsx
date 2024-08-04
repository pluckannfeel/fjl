import React from "react";
import { Text, Box } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router";
import DatabaseNavbar from "../components/Database/DatabaseNavbar";

const Database: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box style={{ display: "flex" }}>
      <DatabaseNavbar  />
      <Box component="main" style={{ flexGrow: 1, marginLeft: "80px" }}>
        {/* <Text ta="center" size="xl" style={{ marginTop: "2rem" }}>
          {t("database.title")}
        </Text> */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default Database;
