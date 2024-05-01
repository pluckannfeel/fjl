import React from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
// type Props = {};

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Text ta="center" size="xl" style={{ marginTop: "2rem" }}>
        {t("dashboard.title")}
      </Text>
    </React.Fragment>
  );
};

export default Dashboard;
