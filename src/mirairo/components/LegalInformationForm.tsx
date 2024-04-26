import {
  Grid,
  PasswordInput,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";

type Props = {};

const LegalInformationForm = (props: Props) => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  return (
    <React.Fragment>
      <Title
        order={2}
        c="text"
        className={commonStyles.title}
        ta="left"
        // mt="sm"
      >
        {t("mirairo.sections.legalInformation")}
      </Title>

      <Grid mt="sm">
        <Grid.Col mt={"xs"} span={{ base: 12, md: 5 }}>
          <TextInput
            label={t("mirairo.form.occupation.label")}
            placeholder={t("mirairo.form.occupation.placeholder")}
            onChange={formik.handleChange("occupation")}
            required
            name="occupation"
            value={formik.values.occupation}
            error={
              formik.touched.occupation && Boolean(formik.errors.occupation)
            }
          />
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 7 }}>
          <Textarea
            maxRows={2}
            label={t("mirairo.form.current_address.label")}
            placeholder={t("mirairo.form.current_address.placeholder")}
            onChange={formik.handleChange("current_address")}
            // required
            name="current_address"
            value={formik.values.current_address}
            error={
              formik.touched.current_address &&
              Boolean(formik.errors.current_address)
            }
          />
        </Grid.Col>
      </Grid>
      {/* <SimpleGrid mt={"xl"} mb={0} pb={0} cols={{ base: 1, sm: 2 }}>
      </SimpleGrid> */}

      <SimpleGrid mt={"md"} cols={{ base: 1, sm: 2 }}>
        <SimpleGrid mt={0} cols={{ base: 1, sm: 2 }}>
          <TextInput
            label={t("mirairo.form.phone_number.label")}
            placeholder={t("mirairo.form.phone_number.placeholder")}
            onChange={formik.handleChange("phone_number")}
            // required
            name="phone_number"
            value={formik.values.phone_number}
            error={
              formik.touched.phone_number && Boolean(formik.errors.phone_number)
            }
          />

          {/* <TextInput
            label={t("mirairo.form.email.label")}
            placeholder={t("mirairo.form.email.placeholder")}
            onChange={formik.handleChange("email")}
            required
            name="email"
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          /> */}
        </SimpleGrid>

        <SimpleGrid mt={0} cols={{ base: 1, sm: 2 }}>
          <TextInput
            label={t("mirairo.form.passport_number.label")}
            placeholder={t("mirairo.form.passport_number.placeholder")}
            onChange={formik.handleChange("passport_number")}
            // required
            name="passport_number"
            value={formik.values.passport_number}
            error={
              formik.touched.passport_number &&
              Boolean(formik.errors.passport_number)
            }
          />

          <DateInput
            //
            clearable
            label={t("mirairo.form.passport_expiry.label")}
            valueFormat="YYYY/MM"
            placeholder={t("mirairo.form.passport_expiry.placeholder")}
            // onChange={formik.handleChange("passport_expiry")}
            onChange={(value: DateValue) =>
              formik.setFieldValue("passport_expiry", value)
            }
            // required
            name="passport_expiry"
            value={
              formik.values.passport_expiry
                ? dayjs(formik.values.passport_expiry).toDate()
                : null
            }
            error={
              formik.touched.passport_expiry &&
              Boolean(formik.errors.passport_expiry)
            }
          />
        </SimpleGrid>
      </SimpleGrid>

      <Title order={2} c="text" mt={"md"} ta="left">
        {t("mirairo.sections.accountDetails")}
      </Title>
      <Grid>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 6 }}>
          <TextInput
            label={t("mirairo.form.email.label")}
            placeholder={t("mirairo.form.email.placeholder")}
            onChange={formik.handleChange("email")}
            required
            name="email"
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 6 }}></Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <PasswordInput
            label={t("mirairo.interview.password.label")}
            //   placeholder="Your password"
            placeholder="********"
            size="md"
            mt="md"
            value={formik.values.password}
            required
            onChange={formik.handleChange("password")}
            name="password"
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <PasswordInput
            label={t("mirairo.interview.confirm_password.label")}
            //   placeholder="Your password"
            placeholder="********"
            rightSection=""
            size="md"
            mt="md"
            required
            value={formik.values.confirm_password}
            onChange={formik.handleChange("confirm_password")}
            name="confirm_password"
            error={
              formik.touched.confirm_password &&
              // Boolean()
              formik.errors.confirm_password
            }
          />
        </Grid.Col>
      </Grid>
    </React.Fragment>
  );
};

export default LegalInformationForm;
