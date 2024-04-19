import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from "@mantine/core";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useApplicantForgotPassword } from "../hooks/useApplicantForgotPassword";
import { showNotification } from "@mantine/notifications";
import * as Yup from "yup";
import { LandingHeader } from "../../landing/components/Header";
import React, { useState } from "react";
import classes from "../classes/Mirairo.module.scss";
import { useApplicantForgotPasswordSubmit } from "../hooks/useApplicantForgotPasswordSubmit";
import { ForgotPasswordSubmit } from "../types/Information";

interface ApplicantForgotPasswordProps {}

const ApplicantForgotPassword: React.FC<ApplicantForgotPasswordProps> = (
  props
) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [passwordChanged, setPasswordChanged] = useState(false);

  const { submitNewPassword, isLoading } = useApplicantForgotPasswordSubmit();

  const formik = useFormik({
    initialValues: {
      code: "",
      new_password: "",
      confirm_password: "",
    },
    validationSchema: Yup.object({
      code: Yup.string().required(t("common.validations.required")),
      new_password: Yup.string().required(t("common.validations.required")),
      confirm_password: Yup.string()
        .oneOf(
          [Yup.ref("new_password"), ""], // should be null
          t("common.validations.passwordMatch")
        )
        .required(t("common.validations.required")),
    }),
    onSubmit: ({ code, new_password, confirm_password }) =>
      handleForgotPassword({
        code,
        new_password,
      }),
  });

  const handleForgotPassword = async ({
    code,
    new_password,
  }: ForgotPasswordSubmit) => {
    submitNewPassword({ code, new_password })
      .then(() => {
        // snackbar.success(t("auth.forgotPassword.notifications.success"));
        showNotification({
          //   title: t("mirairo.auth.forgotPasswordSubmit.notifications.success"),
          message: t("mirairo.auth.forgotPasswordSubmit.notifications.success"),
          color: "green",
        });

        setPasswordChanged(true);
      })
      .catch(() => {
        showNotification({
          title: t("common.errors.unexpected.title"),
          message: t("common.errors.unexpected.subTitle"),
          color: "red",
        });
      });
  };

  return (
    <div className={classes.root}>
      <LandingHeader title="Mirairo 未来路 " />
      <Container pt={50}>
        {!passwordChanged ? (
          <>
            <Title c={"white"} mb={20}>
              {t("mirairo.auth.forgotPasswordSubmit.title")}
            </Title>

            <Title c={"white"} order={5} mb={20}>
              {t("mirairo.auth.forgotPasswordSubmit.subTitle")}
            </Title>

            <form
              onSubmit={formik.handleSubmit}
              style={{
                height: "100vh",
              }}
            >
              <TextInput
                label={t("mirairo.auth.forgotPasswordSubmit.form.code.label")}
                //   placeholder="you@abc.com"
                disabled={isLoading}
                size="md"
                mt={10}
                //   required
                {...formik.getFieldProps("code")}
              />

              <PasswordInput
                label={t(
                  "mirairo.auth.forgotPasswordSubmit.form.newPassword.label"
                )}
                //   placeholder="you@abc.com"
                disabled={isLoading}
                size="md"
                mt={10}
                //   required
                {...formik.getFieldProps("new_password")}
              />

              <PasswordInput
                label={t(
                  "mirairo.auth.forgotPasswordSubmit.form.confirmPassword.label"
                )}
                //   placeholder="you@abc.com"
                disabled={isLoading}
                size="md"
                mt={10}
                //   required
                {...formik.getFieldProps("confirm_password")}
              />

              <Group grow mt="xl" ta="center">
                <Button
                  fullWidth
                  size="auto"
                  onClick={() => navigate("/mirairo")}
                  // disabled={currentStep === formSteps.length - 1}
                  c="black"
                  color="orange.5"
                >
                  {t("common.cancel")}
                </Button>
                <Button
                  fullWidth
                  size="auto"
                  // variant="gradient"
                  bg=""
                  type="submit"
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {t("mirairo.auth.forgotPasswordSubmit.form.action")}
                </Button>
              </Group>
            </form>
          </>
        ) : (
          <>
            <Title c={"white"} mb={20}>
              {t("mirairo.auth.forgotPasswordSubmit.notifications.success")}
            </Title>

            <Button
              fullWidth
              size="auto"
              onClick={() => navigate("/mirairo")}
              // disabled={currentStep === formSteps.length - 1}
              c="black"
              color="orange.5"
            >
              {t("mirairo.auth.forgotPasswordSubmit.form.back")}
            </Button>
          </>
        )}
      </Container>
    </div>
  );
};

export default ApplicantForgotPassword;
