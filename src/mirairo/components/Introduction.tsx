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
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import JobHuntSvg from "../../core/assets/jobhunt.svg";
import styles from "../classes/Introduction.module.scss";
import { useTranslation } from "react-i18next";

interface IntroductionProps {
  getStartedHandler: () => void;
}

export function Introduction({ getStartedHandler }: IntroductionProps) {
  const theme = useMantineTheme();
  const { t } = useTranslation();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Container size="md">
      <motion.div
        className={styles.inner}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={styles.content}>
          <motion.div variants={itemVariants}>
            <Title className={styles.title}>
              {t("mirairo.introduction.title")}
            </Title>
          </motion.div>
          <motion.div variants={itemVariants}>
            <Text c="yellow" fw={700} mt="md">
              {t("mirairo.introduction.description")}
            </Text>
          </motion.div>

          <motion.div variants={itemVariants}>
            <List
              mt={30}
              spacing="sm"
              size="sm"
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
              <List.Item>{t("mirairo.introduction.items.0")}</List.Item>
              <List.Item>{t("mirairo.introduction.items.1")}</List.Item>
              <List.Item>{t("mirairo.introduction.items.2")}</List.Item>
            </List>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Group mt={30}>
              <Button
                radius="xl"
                size="md"
                c="black"
                color="action.4"
                className={styles.control}
                onClick={getStartedHandler}
              >
                {t("mirairo.actions.getStarted")}
              </Button>
            </Group>
          </motion.div>
        </div>
        <motion.div variants={itemVariants}>
          <Image src={JobHuntSvg} className={styles.image} />
        </motion.div>
      </motion.div>
    </Container>
  );
}
