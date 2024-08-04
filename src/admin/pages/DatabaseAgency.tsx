import React from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

const DatabaseAgency: React.FC = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Text ta="center" size="xl" style={{ marginTop: "2rem" }}>
        {t("database.agency.title")}
      </Text>
    </React.Fragment>
  );
};

export default DatabaseAgency;
