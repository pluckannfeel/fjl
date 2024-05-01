import {
  Text,
  Title,
  SimpleGrid,
  TextInput,
  Textarea,
  Button,
  Group,
  ActionIcon,
  Container,
} from "@mantine/core";
import {
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandInstagram,
} from "@tabler/icons-react";
import { ContactIconsList } from "./ContactIcons";
import classes from "@/landing/classes/ContactUs.module.scss";
import { useTranslation } from "react-i18next";
import { useActiveSectionContext } from "../contexts/ActiveSectionProvider";
import { useSectionInView } from "../hooks/useSectionInView";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SendMessage } from "../types/Form";
import { useSendMail } from "../hooks/useSendMail";
import CustomLoader from "@/core/components/Loader";
import { showNotification } from "@mantine/notifications";

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

const ContactUs = () => {
  const { t } = useTranslation();
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const { sendMail, isSending } = useSendMail();

  const { ref } = useSectionInView("contact");

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email(t("common.validations.email")).required(),
      name: Yup.string().required("Required"),
      message: Yup.string().required("Required"),
    }),
    onSubmit: (values: SendMessage) => {
      sendMail(values)
        .then(() => {
          showNotification({
            title: t("contact.notifications.title"),
            message: t("contact.notifications.success"),
            color: "teal",
          });

          formik.resetForm();
        })
        .catch(() => {
          showNotification({
            title: "Error",
            message: t("contact.notifications.failed"),
            color: "red",
          });
        });
    },
  });

  const icons = social.map((Icon, index) => (
    <ActionIcon
      key={index}
      size={28}
      className={classes.social}
      variant="transparent"
    >
      <Icon size="1.4rem" stroke={1.5} />
    </ActionIcon>
  ));

  return (
    <div ref={ref} className={classes.wrapper} id="contact">
      {isSending && <CustomLoader />}

      <Container className={classes.inner}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50}>
          <div>
            <Title className={classes.title}>{t("contact.label")}</Title>
            <Text className={classes.description} mt="sm" mb={30}>
              {t("contact.description")}
            </Text>

            <ContactIconsList />

            <Group mt="xl">{icons}</Group>
          </div>
          <form onSubmit={formik.handleSubmit}>
            <div className={classes.form}>
              <TextInput
                label={t("contact.form.email.label")}
                //   placeholder="your@email.com"
                required
                {...formik.getFieldProps("email")}
                classNames={{ input: classes.input, label: classes.inputLabel }}
                error={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : null
                }
              />
              <TextInput
                label={t("contact.form.name.label")}
                //   placeholder="John Doe"
                {...formik.getFieldProps("name")}
                mt="md"
                required
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />
              <Textarea
                required
                resize="vertical"
                label={t("contact.form.message.label")}
                {...formik.getFieldProps("message")}
                minRows={6}
                mt="md"
                classNames={{ input: classes.input, label: classes.inputLabel }}
              />

              <Group justify="flex-end" mt="lg">
                <Button
                  c={"gray.1"}
                  size="md"
                  disabled={!formik.isSubmitting && !formik.dirty}
                  className={classes.control}
                  type="submit"
                >
                  {t("contact.form.send_message")}
                </Button>
              </Group>
            </div>
          </form>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default ContactUs;
