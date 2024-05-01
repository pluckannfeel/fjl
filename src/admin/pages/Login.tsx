import React from "react";
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
import classes from "../classes/Login.module.scss";
import { LanguageToggleAction } from "../../core/components/LanguageToggleActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import * as Yup from "yup";

import Cookies from "js-cookie";
import useCookie from "../../core/hooks/useCookie";
import { showNotification } from "@mantine/notifications";
import CustomLoader from "@/core/components/Loader";
import { useAuth } from "@/auth/contexts/AuthProvider";
import { useFormik } from "formik";

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [cookieEmail, setEmail] = useCookie("adminEmail", "");
  const { login: adminLogin, isLoggingIn } = useAuth();

  const handleLogin = (
    email: string,
    password: string,
    rememberMe: boolean
  ) => {
    adminLogin(email, password)
      .then(() => {
        if (rememberMe) {
          // Set the email in a cookie that expires in 30 days
          Cookies.set("adminEmail", email, { expires: 30 });
        }
        navigate(`/admin`, { replace: true });
      })
      .catch((error) => {
        console.log(error);

        if (error.code === "ERR_NETWORK") {
          showNotification({
            title: t("common.errors.unexpected.title"),
            message: t("common.errors.unexpected.subTitle"),
            color: "red",
          });
        }

        const code = error.response.data["detail"];

        if (code === "invalid_credentials") {
          showNotification({
            title: t("common.errors.wrongCredentials.title"),
            message: t("common.errors.wrongCredentials.subTitle"),
            color: "red",
          });
        } else {
          showNotification({
            title: t("common.errors.unexpected.title"),
            message: t("common.errors.unexpected.subTitle"),
            color: "red",
          });
        }
      });
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
    onSubmit: (values) => {
      if (values.rememberMe) {
        setEmail(values.email); // Save email to cookie
      } else {
        Cookies.remove("adminEmail"); // Remove cookie if not remembering
      }
      handleLogin(values.email, values.password, values.rememberMe);
    },
  });

  return (
    <Container size={420} my={40}>
      {isLoggingIn && <CustomLoader />}
      <Title ta="center" className={classes.title}>
        <Text
          // component="span"
          size="xxl"
          inherit
          mt={30}
          variant="gradient"
          gradient={{ from: "pink", to: "red" }}
        >
          {/* Welcome back, */}
          {t("admin.header.login.title")}
        </Text>
      </Title>
      <Text size="sm" ta="center" mt={5}>
        {t("admin.header.login.subTitle")}{" "}
        <Anchor
          onClick={() => navigate("/admin-register")}
          size="md"
          component="button"
          c={"teal.4"}
        >
          {t("admin.header.login.registerLink")}
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={formik.handleSubmit}>
          <TextInput
            label={t("admin.form.login.email")}
            placeholder="you@fjl.jp"
            required
            {...formik.getFieldProps("email")}
            error={formik.touched.email && formik.errors.email}
          />
          <PasswordInput
            label={t("admin.form.login.password")}
            // placeholder="Your password"
            placeholder="*********"
            required
            mt="md"
            {...formik.getFieldProps("password")}
            error={formik.touched.password && formik.errors.password}
          />
          <Group justify="space-between" mt="lg">
            <Checkbox
              label={t("admin.form.rememberMe")}
              {...formik.getFieldProps("rememberMe")}
            />
            <Anchor component="button" size="sm" c={"teal.4"}>
              {t("admin.form.forgotPassword")}
            </Anchor>
          </Group>
          <Button fullWidth size="md" mt="xl" bg={"teal.6"} type="submit">
            {t("admin.form.actions.login")}
          </Button>
        </form>
      </Paper>

      <div className={classes.settings}>
        <LanguageToggleAction />
      </div>
    </Container>
  );
};

export default Login;
