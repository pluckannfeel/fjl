import React from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";

type Props = {};

const ApplicantManagement = (props: Props) => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Text ta="center" size="xl" style={{ marginTop: "2rem" }}>
        {t("applicantManagement.title")}
      </Text>
    </React.Fragment>
  );
};

export default ApplicantManagement;
