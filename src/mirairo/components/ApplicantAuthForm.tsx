import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import classes from "../classes/login.module.scss";
import React, { useState } from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showNotification } from "@mantine/notifications";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useApplicantAuth } from "../contexts/ApplicantAuthProvider";
import Cookies from "js-cookie";
import useCookie from "../../core/hooks/useCookie";

const ApplicantAuthForm: React.FC = () => {
  const [cookieEmail, setEmail] = useCookie("userEmail", "");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { login, isLoggingIn } = useApplicantAuth();
  const handleLogin = (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    login(email, password)
      .then(() => {
        if (rememberMe) {
          // Set the email in a cookie that expires in 30 days
          Cookies.set("userEmail", email, { expires: 30 });
        }
        navigate(`/applicant-dashboard`, { replace: true });
      })
      .catch(() =>
        showNotification({
          title: t("common.errors.wrongCredentials.title"),
          message: t("common.errors.wrongCredentials.subTitle"),
          color: "red",
        })
      );
  };

  const formik = useFormik({
    initialValues: {
      // email: "demo@example.com",
      // password: "guWEK<'r/-47-XG3",
      email: cookieEmail,
      password: "",
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email(t("common.validations.email"))
        .required(t("common.validations.required")),
      password: Yup.string()
        // .min(8, t("common.validations.min", { size: 8 }))
        .required(t("common.validations.required")),
    }),
    onSubmit: async (values) => {
      if (values.rememberMe) {
        setEmail(values.email); // Save email to cookie
      } else {
        Cookies.remove("userEmail"); // Remove cookie if not remembering
      }
      handleLogin(values.email, values.password, values.rememberMe);
    },
  });

  return (
    <Paper
      // withBorder shadow="md"
      // p={30}
      // mt={30}
      mt={15}
      radius="md"
      variant="light"
      bg="transparent"
    >
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          label={t("mirairo.interview.email.label")}
          placeholder="you@abc.com"
          disabled={isLoggingIn}
          size="lg"
          //   required
          {...formik.getFieldProps("email")}
        />
        <PasswordInput
          label={t("mirairo.interview.password.label")}
          placeholder={"*********"}
          //   required
          disabled={isLoggingIn}
          size="lg"
          mt="md"
          {...formik.getFieldProps("password")}
        />
        <Group justify="space-between" mt="lg">
          <Checkbox
            label="Remember me"
            disabled={isLoggingIn}
            {...formik.getFieldProps("rememberMe")}
          />
          <Anchor
            component="button"
            size="sm"
            c="text"
            onClick={() => navigate("forgot-password")}
          >
            {t("common.forgotPassword")}
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          size="md"
          variant="gradient"
          bg=""
          type="submit"
          loading={isLoggingIn}
          disabled={isLoggingIn}
        >
          {t("common.login")}
        </Button>
      </form>
    </Paper>
  );
};

export default ApplicantAuthForm;
