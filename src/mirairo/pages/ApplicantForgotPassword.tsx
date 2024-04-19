import {
  Box,
  Button,
  Container,
  Group,
  Paper,
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
import React from "react";
import classes from "../classes/Mirairo.module.scss";

interface ApplicantForgotPasswordProps {}

const ApplicantForgotPassword: React.FC<ApplicantForgotPasswordProps> = (
  props
) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { forgotPassword, isLoading } = useApplicantForgotPassword();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("common.validations.email"))
        .required(t("common.validations.required")),
    }),
    onSubmit: ({ email }) => handleForgotPassword(email),
  });

  const handleForgotPassword = async (email: string) => {
    forgotPassword({ email })
      .then(() => {
        showNotification({
          // title: t("mirairo.auth.forgotPassword.notifications.success"),
          message: t("mirairo.auth.forgotPassword.notifications.success"),
          color: "green",
        });
        navigate(`/mirairo/forgot-password-submit`);
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
        <Title c={"white"} mb={20}>
          {t("mirairo.auth.forgotPassword.title")}
        </Title>

        <form
          onSubmit={formik.handleSubmit}
          style={{
            height: "100vh",
          }}
        >
          <TextInput
            label={t("mirairo.interview.email.label")}
            //   placeholder="you@abc.com"
            disabled={isLoading}
            size="lg"
            //   required
            {...formik.getFieldProps("email")}
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
              {t("mirairo.auth.forgotPassword.form.action")}
            </Button>
          </Group>
        </form>
      </Container>
    </div>
  );
};

export default ApplicantForgotPassword;
