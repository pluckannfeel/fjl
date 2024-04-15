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
import React from "react";
import { t } from "i18next";
import { useTranslation } from "react-i18next";

const InterviewAuthForm: React.FC = () => {
  const { t, i18n } = useTranslation();
  return (
    <Paper
      // withBorder shadow="md"
      // p={30}
      mt={30}
      radius="md"
      variant="light"
      bg="transparent"
    >
      <TextInput
        label={t("mirairo.interview.email.label")}
        placeholder="you@abc.com"
        size="lg"
        required
      />
      <PasswordInput
        label={t("mirairo.interview.password.label")}
        placeholder={"*********"}
        required
        size="lg"
        mt="md"
      />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor component="button" size="sm" c="text">
          {t("common.forgotPassword")}
        </Anchor>
      </Group>
      <Button fullWidth mt="xl" size="md" variant="gradient" bg="">
        {t("common.login")}
      </Button>
    </Paper>
  );
};

export default InterviewAuthForm;
