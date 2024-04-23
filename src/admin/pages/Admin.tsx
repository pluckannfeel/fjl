import { Box, px } from "@mantine/core";
import React, { useState } from "react";
import { Outlet } from "react-router";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSettings } from "../../core/contexts/SettingsProvider";
import { AdminNavbar } from "../components/AdminNavbar";

const Admin = () => {
  return (
    <Box>
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
        <AdminNavbar />
        <QueryWrapper>
          <Outlet />
        </QueryWrapper>
      </Box>
    </Box>
  );
};

export default Admin;
