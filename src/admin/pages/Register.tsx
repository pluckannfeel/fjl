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
  SimpleGrid,
  Select,
} from "@mantine/core";
import classes from "../classes/Login.module.scss";
import { LanguageToggleAction } from "../../core/components/LanguageToggleActions";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { useRegister } from "@/auth/hooks/useRegister";
import { UserInfo } from "@/auth/types/userInfo";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showNotification } from "@mantine/notifications";
import CustomLoader from "@/core/components/Loader";

const roles = [
  { label: "admin.form.register.role.options.admin", value: "Admin" },
  { label: "admin.form.register.role.options.manager", value: "Manager" },
  //   { label: "auth.form.register.role.options.staff", value: "Staff" },
  //   { label: "auth.form.register.role.options.user", value: "User" },
];

const Register = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const roleOptions = roles.map((role) => ({
    ...role,
    label: t(role.label), // Translates the label
  }));

  const { isRegistering, register } = useRegister();

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      role: "",
      last_name: "",
      invitation_code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required(t("common.validations.required")),
      first_name: Yup.string()
        .max(20, t("common.validations.max", { size: 20 }))
        .required(t("common.validations.required")),
      last_name: Yup.string()
        .max(30, t("common.validations.max", { size: 30 }))
        .required(t("common.validations.required")),
      invitation_code: Yup.string().required(t("common.validations.required")),
      role: Yup.string().required(t("common.validations.required")),
      password: Yup.string()
        .min(8, t("common.validations.max", { size: 8 }))
        .required(t("commmon.validations.required")),
      confirmPassword: Yup.string()
        .oneOf(
          [Yup.ref("password"), ""], // should be null
          t("common.validations.passwordMatch")
        )
        .required(t("common.validations.required")),
    }),
    onSubmit: (values) => handleRegister(values),
  });

  const handleRegister = async (values: Partial<UserInfo>) => {
    register(values as UserInfo)
      .then(() => {
        showNotification({
          //   title: t("common.success.register.title"),
          message: t("admin.notifications.success"),
          color: "teal",
        });
        navigate(`/admin-login`);
      })
      .catch((error) => {
        console.log(error);
        const code = error.response.data["detail"];

        if (code === "invalid_invitation_code") {
          showNotification({
            title: t("admin.notifications.invalid_invitation_code.title"),
            message: t("admin.notifications.invalid_invitation_code.subTitle"),
            color: "red",
          });
        } else if (code === "email_exists") {
          showNotification({
            title: t("admin.notifications.email_exists.title"),
            message: t("admin.notifications.email_exists.subTitle"),
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

  return (
    <Container size={420} my={40}>
      {isRegistering && <CustomLoader />}

      <form onSubmit={formik.handleSubmit}>
        <Title ta="center" className={classes.title}>
          <Text
            // component="span"
            size="xxl"
            inherit
            mt={30}
            variant="gradient"
            gradient={{ from: "pink", to: "red" }}
          >
            {t("admin.header.register.title")}
          </Text>
        </Title>
        <Text ta="center" mt={5}>
          <Anchor onClick={() => navigate("/admin-login")} c="cyan.4" size="md">
            {t("admin.header.register.subTitle")}
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <SimpleGrid cols={2}>
            <TextInput
              label={t("admin.form.register.first_name")}
              placeholder=""
              required
              autoFocus
              onChange={formik.handleChange("first_name")}
              value={formik.values.first_name}
              error={formik.touched.first_name && formik.errors.first_name}
            />

            <TextInput
              label={t("admin.form.register.last_name")}
              placeholder=""
              onChange={formik.handleChange("last_name")}
              value={formik.values.last_name}
              error={formik.touched.last_name && formik.errors.last_name}
            />
          </SimpleGrid>

          <TextInput
            mt="md"
            label={t("admin.form.register.email")}
            placeholder=""
            required
            onChange={formik.handleChange("email")}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />

          <SimpleGrid cols={2} mt={"md"}>
            <TextInput
              label={t("admin.form.register.invitation_code")}
              placeholder=""
              required
              rightSection={""}
              onChange={formik.handleChange("invitation_code")}
              value={formik.values.invitation_code}
              error={
                formik.touched.invitation_code && formik.errors.invitation_code
              }
            />
            <Select
              label={t("admin.form.register.role.label")}
              data={roleOptions}
              required
              onChange={(value) => formik.setFieldValue("role", value)}
              searchable
              error={formik.touched.role && formik.errors.role}
            />
          </SimpleGrid>

          <PasswordInput
            label={t("admin.form.register.password")}
            placeholder="*********"
            required
            mt="md"
            onChange={formik.handleChange("password")}
            value={formik.values.password}
            error={formik.touched.role && formik.errors.role}
          />

          <PasswordInput
            label={t("admin.form.register.confirm_password")}
            rightSection={""}
            placeholder="*********"
            required
            mt="md"
            onChange={formik.handleChange("confirmPassword")}
            value={formik.values.confirmPassword}
            error={
              formik.touched.confirmPassword && formik.errors.confirmPassword
            }
          />

          <Group justify="space-between" mt="md">
            {/* <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor> */}
          </Group>
          <Button
            variant="gradient"
            gradient={{ from: "pink", to: "red" }}
            fullWidth
            mt="md"
            size="lg"
            type="submit"
          >
            {t("admin.form.actions.register")}
          </Button>
        </Paper>
      </form>

      <div className={classes.settings}>
        <LanguageToggleAction />
      </div>
    </Container>
  );
};

export default Register;
