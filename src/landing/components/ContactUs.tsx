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

const social = [IconBrandTwitter, IconBrandYoutube, IconBrandInstagram];

const ContactUs = () => {
  const { t } = useTranslation();
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const { ref } = useSectionInView("contact");

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
          <div className={classes.form}>
            <TextInput
              label={t("contact.form.email.label")}
              //   placeholder="your@email.com"
              required
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <TextInput
              label={t("contact.form.name.label")}
              //   placeholder="John Doe"
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              required
              resize="vertical"
              label={t("contact.form.message.label")}
              //   placeholder="I want to order your goods"
              minRows={6}
              mt="md"
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />

            <Group justify="flex-end" mt="md">
              <Button className={classes.control}>Send message</Button>
            </Group>
          </div>
        </SimpleGrid>
      </Container>
    </div>
  );
};

export default ContactUs;
