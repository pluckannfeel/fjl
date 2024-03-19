import { Grid, Select, Textarea, Title } from "@mantine/core";
import React from "react";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { JLPTs, languageLevels } from "../helpers/constants";
import { useFormikContext } from "../contexts/FormProvider";

const SkillsAndLanguagesForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  //autocomplete conversions

  const languageLevelOptions = languageLevels.map((level) => ({
    ...level,
    label: t(level.label), // Translates the label
  }));

  const jlptOptions = JLPTs.map((level) => ({
    ...level,
    label: t(level.label), // Translates the label
  }));
  return (
    <React.Fragment>
      <Title
        order={2}
        className={commonStyles.title}
        c="text"
        ta="left"
        mt="sm"
      >
        {t("mirairo.sections.skillsLanguages")}
      </Title>

      <Grid mt="sm">
        <Grid.Col mt={"xs"} span={{ base: 12, sm: 4 }}>
          <Select
            label={t("mirairo.form.skills_languages.english")}
            placeholder={t("mirairo.form.skills_languages.level.placeholder")}
            data={languageLevelOptions}
            required
            maxDropdownHeight={250}
            onChange={(_value, option) => {
              formik.setFieldValue("english", option.value);
            }}
            searchable
            value={formik.values.english}
            name="english"
            // error={formik.errors.nationality}
            error={formik.touched.english && Boolean(formik.errors.english)}
          />
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, sm: 4 }}>
          <Select
            label={t("mirairo.form.skills_languages.japanese")}
            placeholder={t("mirairo.form.skills_languages.level.placeholder")}
            data={languageLevelOptions}
            required
            maxDropdownHeight={250}
            onChange={(_value, option) => {
              formik.setFieldValue("japanese", option.value);
            }}
            searchable
            value={formik.values.japanese}
            name="japanese"
            // error={formik.errors.nationality}
            error={formik.touched.japanese && Boolean(formik.errors.japanese)}
          />
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, sm: 4 }}>
          <Select
            label={t("mirairo.form.skills_languages.jlpt.label")}
            placeholder={t("mirairo.form.skills_languages.jlpt.placeholder")}
            data={jlptOptions}
            required
            maxDropdownHeight={250}
            onChange={(_value, option) => {
              formik.setFieldValue("jlpt", option.value);
            }}
            searchable
            value={formik.values.jlpt}
            name="jlpt"
            // error={formik.errors.nationality}
            error={formik.touched.jlpt && Boolean(formik.errors.jlpt)}
          />
        </Grid.Col>
      </Grid>

      <Grid mt="sm">
        <Grid.Col mt={"xs"} span={{ base: 12, sm: 6 }}>
          <Textarea
            autoFocus
            minRows={3}
            rows={4}
            resize="vertical"
            label={t("mirairo.form.skills_languages.computer_skills.label")}
            placeholder={t(
              "mirairo.form.skills_languages.computer_skills.placeholder"
            )}
            onChange={formik.handleChange("computer_skills")}
            name="computer_skills"
            value={formik.values.computer_skills}
            error={
              formik.touched.computer_skills &&
              Boolean(formik.errors.computer_skills)
            }
          />
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, sm: 6 }}>
          <Textarea
            autoFocus
            minRows={3}
            rows={4}
            resize="vertical"
            label={t("mirairo.form.skills_languages.other_skills.label")}
            placeholder={t(
              "mirairo.form.skills_languages.other_skills.placeholder"
            )}
            onChange={formik.handleChange("other_skills")}
            name="other_skills"
            value={formik.values.other_skills}
            error={
              formik.touched.other_skills && Boolean(formik.errors.other_skills)
            }
          />
        </Grid.Col>
      </Grid>
    </React.Fragment>
  );
};

export default SkillsAndLanguagesForm;
