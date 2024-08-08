import { motion } from "framer-motion";
import {
  Image,
  Container,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  useMantineTheme,
  Grid,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import JobHuntSvg from "../../core/assets/jobhunt.svg";
import styles from "../classes/Introduction.module.scss";
import { useTranslation } from "react-i18next";
import InterviewAuthForm from "../../interview/pages/InterviewAuthForm";
import ApplicantAuthForm from "./ApplicantAuthForm";

interface IntroductionProps {
  getStartedHandler: () => void;
}

export function Introduction({ getStartedHandler }: IntroductionProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        // delay: 3,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container>
      <motion.div
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Grid>
          <Grid.Col mt={"xs"} span={{ base: 12, md: 7 }}>
            <motion.div variants={itemVariants}>
              <Title className={styles.title} c={"white"}>
                {t("mirairo.introduction.title")}
              </Title>
            </motion.div>
            <motion.div variants={itemVariants}>
              <Text c="white" fw={700} mt="md">
                {t("mirairo.introduction.description")}
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text c="white" fw={700} mt="md">
                {t("mirairo.introduction.description2")}
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text c="white" fw={700} mt="md">
                {t("mirairo.introduction.description3")}
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text c="white" fw={700} mt="md">
                {t("mirairo.introduction.description4")}
              </Text>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text c="white" fw={700} mt="md">
                {t("mirairo.introduction.description5")}
              </Text>
            </motion.div>
          </Grid.Col>
          <Grid.Col mt={"xs"} span={{ base: 12, md: 5 }}>
            <motion.div variants={itemVariants}>
              <List
                mt={30}
                spacing="sm"
                size="lg"
                icon={
                  <ThemeIcon size={28} bg={theme.colors.yellow[4]} radius="xl">
                    <IconCheck
                      style={{ width: 12, height: 12 }}
                      color="blue"
                      stroke={1.5}
                    />
                  </ThemeIcon>
                }
              >
                <List.Item c={"white"}>
                  {t("mirairo.introduction.items.0")}
                </List.Item>
                <List.Item c={"white"}>
                  {t("mirairo.introduction.items.1")}
                </List.Item>
                <List.Item c={"white"}>
                  {t("mirairo.introduction.items.2")}
                </List.Item>
              </List>

              <Group grow mt={15}>
                <Button
                  // radius="xl"
                  size="lg"
                  c="black"
                  color="action.4"
                  className={styles.control}
                  onClick={getStartedHandler}
                >
                  {t("mirairo.actions.getStarted")}
                </Button>
              </Group>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text
                variant="gradient"
                fw={700}
                mt={"xl"}
                size="xl"
                // fs={"italic"}
                gradient={{ from: "yellow.4", to: "yellow.6" }}
              >
                Sign in to your Account
              </Text>

              <ApplicantAuthForm />
            </motion.div>
          </Grid.Col>
        </Grid>
      </motion.div>
    </Container>
  );
}
