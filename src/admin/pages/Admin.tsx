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
          height: "100vh",
          // paddingBottom: "2rem",
        }}
        // px={{
        //   "@sm": "2rem",
        //   "@lg": "4rem",
        // }}
      >
        <QueryWrapper>
          <Outlet />
        </QueryWrapper>
      </Box>
    </Box>
  );
};

export default Admin;
