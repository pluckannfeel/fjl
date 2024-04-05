import {
  SimpleGrid,
  Title,
  TextInput,
  Autocomplete,
  Grid,
  Radio,
  Group,
  Select,
  Text,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";
import {
  calculateAge,
  days,
  genders,
  months,
  nationalities,
  years,
} from "../helpers/constants";
import ClickableAvatar from "../../core/components/ClickableAvatar";

const PersonalInformationForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  // image file change handler
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // autocomplete conversions
  // Translate nationality labels
  const nationalityOptions = nationalities.map((nationality) => ({
    ...nationality,
    label: t(nationality.label), // Translates the label
  }));

  const genderOptions = genders.map((nationality) => ({
    ...nationality,
    label: t(nationality.label), // Translates the label
  }));

  useEffect(() => {
    const birthYear = formik.values.birth_date.year;
    const birthMonth = formik.values.birth_date.month;
    const birthDay = formik.values.birth_date.day;

    if (birthYear && birthMonth && birthDay) {
      // Convert string values to numbers
      const yearNum = parseInt(birthYear, 10);
      const monthNum = parseInt(birthMonth, 10);
      const dayNum = parseInt(birthDay, 10);

      // Ensure all conversions are successful (i.e., the parsed values are not NaN)
      const isValidDate = !isNaN(yearNum) && !isNaN(monthNum) && !isNaN(dayNum);

      if (isValidDate) {
        const age = calculateAge(yearNum, monthNum, dayNum);
        formik.setFieldValue("age", String(age)); // Ensure the age is set as a string if your form expects string values
      }
    }
  }, [
    formik.values.birth_date.year,
    formik.values.birth_date.month,
    formik.values.birth_date.day,
    formik.setFieldValue,
  ]);

  // capture menu item click
  const handleIconButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("img_url", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue("img_url", null);
    }

    handleClose();
    formik.setFieldTouched("img_url", true, false); // Mark img_url as touched
  };

  return (
    <React.Fragment>
      <Title
        order={2}
        c="text"
        className={commonStyles.title}
        ta="left"
        // mt="sm"
      >
        {t("mirairo.sections.personalInformation")}
      </Title>

      <Grid mt="sm">
        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <ClickableAvatar
            applicant_id={formik.values.id}
            applicant_image={formik.values.img_url as string}
            setApplicantImage={(img) => {
              formik.setFieldValue("img_url", img);
            }}
            handleFileSelect={handleImageFileSelect}
            error={formik.touched.img_url && formik.errors.img_url}
          />
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <SimpleGrid mt={0} cols={{ base: 1, sm: 3 }}>
            <TextInput
              label={t("mirairo.form.last_name.label")}
              placeholder={t("mirairo.form.last_name.placeholder")}
              onChange={formik.handleChange("name.last_name")}
              required
              name="last_name"
              value={formik.values.name.last_name}
              // error={formik.errors.name?.last_name}
              error={
                formik.touched.name?.last_name &&
                Boolean(formik.errors.name?.last_name)
              }
            />
            <TextInput
              label={t("mirairo.form.first_name.label")}
              placeholder={t("mirairo.form.first_name.placeholder")}
              onChange={formik.handleChange("name.first_name")}
              required
              name="first_name"
              value={formik.values.name.first_name}
              // error={formik.errors.name?.first_name}
              error={
                formik.touched.name?.first_name &&
                Boolean(formik.errors.name?.first_name)
              }
            />
            <TextInput
              label={t("mirairo.form.middle_name.label")}
              placeholder={t("mirairo.form.middle_name.placeholder")}
              required
              name="middle_name"
              onChange={formik.handleChange("name.middle_name")}
              value={formik.values.name.middle_name}
              // error={formik.errors.name?.middle_name}
              error={
                formik.touched.name?.middle_name &&
                Boolean(formik.errors.name?.middle_name)
              }
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }}>
            <SimpleGrid mt={"xs"} cols={{ base: 1, sm: 2 }}>
              <Select
                label={t("mirairo.form.nationality.label")}
                placeholder={t("mirairo.form.nationality.placeholder")}
                data={nationalityOptions}
                required
                maxDropdownHeight={250}
                onChange={(_value, option) => {
                  formik.setFieldValue("nationality", option.value);
                }}
                searchable
                value={formik.values.nationality}
                name="nationality"
                // error={formik.errors.nationality}
                error={
                  formik.touched.nationality &&
                  Boolean(formik.errors.nationality)
                }
              />

              <Select
                label={t("mirairo.form.gender.label")}
                placeholder={t("mirairo.form.gender.placeholder")}
                data={genderOptions}
                required
                maxDropdownHeight={250}
                onChange={(_value, option) => {
                  formik.setFieldValue("gender", option.value);
                }}
                searchable
                value={formik.values.gender}
                name="gender"
                // error={formik.errors.gender}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
              />

              <TextInput
                label={t("mirairo.form.birth_place.label")}
                placeholder={t("mirairo.form.birth_place.placeholder")}
                required
                onChange={formik.handleChange("birth_place")}
                value={formik.values.birth_place}
                name="birth_place"
                // error={formik.errors.birth_place}
                error={
                  formik.touched.birth_place &&
                  Boolean(formik.errors.birth_place)
                }
              />

              <Radio.Group
                name="marital_status"
                label={t("mirairo.form.marital_status.label")}
                withAsterisk
                value={formik.values.marital_status}
                onChange={(value) =>
                  formik.setFieldValue("marital_status", value)
                }
                // onChange={formik.handleChange("marital_status")}
                // onBlur={() => formik.setFieldTouched("marital_status", true)}
                // error={formik.errors.marital_status}
                error={
                  formik.touched.marital_status &&
                  // Boolean()
                  formik.errors.marital_status
                }
              >
                <Group mt="xs">
                  <Radio
                    color="orange.5"
                    value="single"
                    label={t("mirairo.form.marital_status.options.single")}
                  />
                  <Radio
                    color="orange.5"
                    value="married"
                    label={t("mirairo.form.marital_status.options.married")}
                  />
                </Group>
              </Radio.Group>
            </SimpleGrid>

            <Grid mt="sm" gutter={{ base: 5 }}>
              <Grid.Col mt={"xs"} p={0} span={12}>
                <Title
                  order={4}
                  // m={0}
                  // p={0}
                  c="text"
                  // className={commonStyles.title}
                  ta="left"
                  // mt="sm"
                >
                  {t("mirairo.form.birth_date.label")}
                </Title>
              </Grid.Col>
              <Grid.Col span={4}>
                <Select
                  label={t("mirairo.form.birth_date.options.year")}
                  placeholder={t("mirairo.form.birth_date.placeholder.year")}
                  data={years}
                  required
                  maxDropdownHeight={250}
                  // onChange={formik.handleChange("birth_date.year")}
                  onChange={(_value, option) => {
                    formik.setFieldValue("birth_date.year", option.value);
                  }}
                  searchable
                  value={formik.values.birth_date.year}
                  // error={formik.errors.birth_date?.year}
                  error={
                    formik.touched.birth_date?.year &&
                    Boolean(formik.errors.birth_date?.year)
                  }
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label={t("mirairo.form.birth_date.options.month")}
                  placeholder={t("mirairo.form.birth_date.placeholder.month")}
                  data={months}
                  required
                  maxDropdownHeight={250}
                  // onChange={formik.handleChange("birth_date.month")}
                  onChange={(_value, option) => {
                    formik.setFieldValue("birth_date.month", option.value);
                  }}
                  searchable
                  value={formik.values.birth_date.month}
                  // error={formik.errors.birth_date?Ï.month}
                  error={
                    formik.touched.birth_date?.month &&
                    Boolean(formik.errors.birth_date?.month)
                  }
                />
              </Grid.Col>
              <Grid.Col span={3}>
                <Select
                  label={t("mirairo.form.birth_date.options.day")}
                  placeholder={t("mirairo.form.birth_date.placeholder.day")}
                  data={days}
                  required
                  maxDropdownHeight={250}
                  // onChange={formik.handleChange("birth_date.day")}
                  onChange={(_value, option) => {
                    formik.setFieldValue("birth_date.day", option.value);
                  }}
                  searchable
                  value={formik.values.birth_date.day}
                  // error={formik.errors.birth_date?.day}
                  error={
                    formik.touched.birth_date?.day &&
                    Boolean(formik.errors.birth_date?.day)
                  }
                />
              </Grid.Col>
              <Grid.Col span={2}>
                <TextInput
                  disabled
                  label={t("mirairo.form.age.label")}
                  placeholder={t("mirairo.form.age.placeholder")}
                  required
                  onChange={formik.handleChange("age")}
                  value={formik.values.age}
                  name="age"
                  // error={formik.errors.age}
                  error={formik.touched.age && Boolean(formik.errors.age)}
                />
              </Grid.Col>
            </Grid>
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </React.Fragment>
  );
};

export default PersonalInformationForm;
