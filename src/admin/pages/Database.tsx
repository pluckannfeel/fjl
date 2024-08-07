import React, { useEffect } from "react";
import { Text, Box } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router";
import DatabaseNavbar from "../components/Database/DatabaseNavbar";
import { useLocalStorage } from "@mantine/hooks";

const Database: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeDatabaseNavbarLink] = useLocalStorage({
    key: "activeDatabaseNavbarLink",
    defaultValue: 0,
    getInitialValueInEffect: true,
  });

  useEffect(() => {
    const paths = ["/admin/database/company", "/admin/database/agency", "/admin/database/generate_document"];
    if (activeDatabaseNavbarLink >= 0 && activeDatabaseNavbarLink < paths.length) {
      navigate(paths[activeDatabaseNavbarLink], { replace: true });
    }
  }, [activeDatabaseNavbarLink, navigate]);

  return (
    <Box style={{ display: "flex" }}>
      <DatabaseNavbar />
      <Box component="main" style={{ flexGrow: 1, marginLeft: "80px" }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Database;
