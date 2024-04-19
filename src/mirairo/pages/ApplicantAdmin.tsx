import { Box, px } from "@mantine/core";
import React, { useState } from "react";
import { Outlet } from "react-router";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSettings } from "../../core/contexts/SettingsProvider";
import DashboardHeader from "../components/DashboardHeader";

const ApplicantLayout = () => {
  // const [settingsOpen, setSettingsOpen] = useState(false);
  // const { collapsed, open, toggleDrawer } = useSettings();
  // const handleSettingsToggle = () => {
  //     setSettingsOpen(!settingsOpen);
  //   };

  return (
    <Box
    // style={{
    //   display: "flex",
    // }}
    >
      <DashboardHeader />

      <Box
        component="main"
        style={{
          flexGrow: 1,
          paddingBottom: "2rem",
        }}
        px={{
          "@sm": "2rem",
          "@lg": "4rem",
        }}
      >
        <QueryWrapper>
          <Outlet />
        </QueryWrapper>
      </Box>
    </Box>
  );
};

export default ApplicantLayout;
