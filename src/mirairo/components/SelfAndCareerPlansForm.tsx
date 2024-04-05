import { Grid, Select, SimpleGrid, Textarea, Title } from "@mantine/core";
import React, { useEffect } from "react";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";

const SelfAndCareerPlansForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  return (
    <React.Fragment>
      <Title
        order={2}
        className={commonStyles.title}
        c="text"
        ta="left"
        // mt="sm"
      >
        {t("mirairo.sections.SelfCareerPlans")}
      </Title>

      <SimpleGrid mt={"sm"}>
        <Textarea
          minRows={3}
          rows={3}
          resize="vertical"
          label={t("mirairo.form.self_career_plans.self_introduction.label")}
          placeholder={t(
            "mirairo.form.self_career_plans.self_introduction.placeholder"
          )}
          required
          onChange={formik.handleChange("self_introduction")}
          name="self_introduction"
          value={formik.values.self_introduction}
          error={
            formik.touched.self_introduction &&
            Boolean(formik.errors.self_introduction)
          }
        />
      </SimpleGrid>

      <Grid mt="sm">
        <Grid.Col mt={"xs"} span={{ base: 12, sm: 6 }}>
          <Textarea
            minRows={3}
            rows={2}
            required
            resize="vertical"
            label={t(
              "mirairo.form.self_career_plans.reason_for_application.label"
            )}
            // placeholder={t(
            //   "mirairo.form.self_career_plans.reason_for_application.placeholder"
            // )}
            onChange={formik.handleChange("reason_for_application")}
            name="reason_for_application"
            value={formik.values.reason_for_application}
            error={
              formik.touched.reason_for_application &&
              Boolean(formik.errors.reason_for_application)
            }
          />
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, sm: 6 }}>
          <Textarea
            minRows={3}
            rows={2}
            required
            resize="vertical"
            label={t("mirairo.form.self_career_plans.past_experience.label")}
            // placeholder={t(
            //   "mirairo.form.self_career_plans.past_experience.placeholder"
            // )}
            onChange={formik.handleChange("past_experience")}
            name="past_experience"
            value={formik.values.past_experience}
            error={
              formik.touched.past_experience &&
              Boolean(formik.errors.past_experience)
            }
          />
        </Grid.Col>
      </Grid>

      <SimpleGrid mt={"sm"}>
        <Textarea
          minRows={3}
          rows={3}
          resize="vertical"
          label={t("mirairo.form.self_career_plans.future_career_plan.label")}
          placeholder={t(
            "mirairo.form.self_career_plans.future_career_plan.placeholder"
          )}
          required
          onChange={formik.handleChange("future_career_plan")}
          name="future_career_plan"
          value={formik.values.future_career_plan}
          error={
            formik.touched.future_career_plan &&
            Boolean(formik.errors.future_career_plan)
          }
        />
      </SimpleGrid>
    </React.Fragment>
  );
};

export default SelfAndCareerPlansForm;
