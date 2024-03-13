import { Title } from "@mantine/core";
import React from "react";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";

const EducationalBackgroundForm = () => {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Title order={2} className={commonStyles.title} c="text"  ta="left" mt="sm">
        {t("mirairo.sections.educationalBackground")}
      </Title>
    </React.Fragment>
  );
};

export default EducationalBackgroundForm;
