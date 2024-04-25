import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  useMantineTheme,
} from "@mantine/core";
import { IconGauge, IconUserHeart, IconUsersGroup } from "@tabler/icons-react";
import classes from "@/landing/classes/Services.module.scss";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSectionInView } from "../hooks/useSectionInView";
import { useActiveSectionContext } from "../contexts/ActiveSectionProvider";
import { t } from "i18next";
import { motion } from "framer-motion";
import { useNavigate } from "react-router";

const mockdata = [
  {
    title: "services.links.mirairo.title",
    description: "services.links.mirairo.description",
    icon: IconUsersGroup,
    color: "#91A7FF",
    textColor: "#000",
    link: "/mirairo",
  },
  {
    title: "services.links.acs.title",
    description: "services.links.acs.description",
    icon: IconUserHeart,
    color: "#E59999",
    textColor: "#000",
    link: "/interview",
  },
];

const Services = () => {
  const theme = useMantineTheme();
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();
  const navigate = useNavigate();

  const { ref } = useSectionInView("services");

  // Motion variants for animation
  // const cardVariants = {
  //   hover: {
  //     scale: 1.05,
  //     backgroundColor: theme.colors.lime[6], // Dynamically adjust to theme color
  //     transition: { type: "spring", stiffness: 300 },
  //   },
  //   initial: {
  //     scale: 1,
  //     backgroundColor: "transparent", // Default background color
  //   },
  // };

  const features = mockdata.map((feature) => {
    const cardVariants = {
      hover: {
        scale: 1.05,
        // You could also use template strings to include theme colors dynamically if needed
        backgroundColor: [feature.color, "rgba(145, 167, 255, 0)"], // Example for a color fading to transparent
        transition: { type: "spring", stiffness: 300 },
      },
      initial: {
        scale: 1,
        backgroundColor: "rgba(0, 0, 0, 0)", // Change transparent to this format
      },
    };
    return (
      <Card
        key={feature.title}
        shadow="md"
        radius="md"
        className={classes.cardWrapper}
        padding={0} // No padding here, padding is handled by .cardContent
        onClick={() => navigate(feature.link)}
      >
        <motion.div
          variants={{
            ...cardVariants,
            hover: {
              backgroundColor: feature.color,
              color: feature.textColor,
            },
          }}
          initial="initial"
          whileHover="hover"
          className={classes.cardContent} // Apply the class here
        >
          <feature.icon
            style={{ width: 48, height: 48 }}
            stroke={2}
            color={theme.colors.blue[6]}
          />
          <Text size="lg" fw={700} className={classes.cardTitle} mt="md">
            {t(feature.title)}
          </Text>
          <Text size="sm" c="white" mt="sm">
            {t(feature.description)}
          </Text>
        </motion.div>
      </Card>
    );
  });

  return (
    <Container ref={ref} id="services" size="lg" py="lg" my="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg" bg={"#E59999"}>
          ACS
        </Badge>
        <Badge variant="filled" size="lg" bg="#324554">
          FJL
        </Badge>
        <Badge variant="filled" size="lg" bg="#664450">
          HOF
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        {/* Integrate effortlessly with any technology stack */}
        {t("services.label")}
      </Title>

      <Text
        component="div"
        color="dimmed"
        className={classes.description}
        ta="center"
        mt="md"
      >
        {t("services.description")}
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
};

export default Services;
