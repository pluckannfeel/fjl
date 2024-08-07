import { Box, px } from "@mantine/core";
import React, { useState } from "react";
import { Outlet } from "react-router";
import QueryWrapper from "../../core/components/QueryWrapper";
import { useSettings } from "../../core/contexts/SettingsProvider";
import AdminNavbar from "../components/AdminNavbar";
import classes from "@/admin/classes/Common.module.scss"
const Admin = () => {
  return (
    <Box
      style={{
        display: "flex",
      }}
    >
      <AdminNavbar />
      <Box
        component="main"
        className={classes.main}
        style={{
          flexGrow: 1,
          marginLeft: "80px",
          minHeight: "100vh", // Initial height of 100vh
          height: "auto", // Allow height to extend based on content
          // paddingBottom: "2rem",
        }}
      >
        <QueryWrapper>
          <Outlet />
        </QueryWrapper>
      </Box>
    </Box>
  );
};

export default Admin;
