import React from "react";
import { Container, Text, Button, Group } from "@mantine/core";
import classes from "../classes/Home.module.scss";
import { useTranslation } from "react-i18next";
import smoothScrollTo from "../functions/function";
import { useSectionInView } from "../hooks/useSectionInView";
import { useActiveSectionContext } from "../contexts/ActiveSectionProvider";
import { motion } from "framer-motion";

const Home = () => {
  const { t } = useTranslation();
  const subTitles = t("subTitle", { returnObjects: true });
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const { ref } = useSectionInView("home");

  return (
    <div className={classes.wrapper}>
      <Container size={920} ref={ref} id="home" className={classes.inner}>
        <h1 className={classes.title} >
          <Text component="span" inherit  c={"gray.1"}>
            {t("title")}
          </Text>{" "}
        </h1>

        <div className={classes.description}>
          {(subTitles as string[]).map((line, index) => (
            <Text component="div" size="xl" key={index} c={"gray.1"}>
              {line}
            </Text>
          ))}
        </div>

        <Group className={classes.controls}>
          <motion.div whileHover={{ scale: 1.25 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="xl"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              component="a"
              href="#about"
              onClick={() => {
                setActiveSection("about");
                setTimeOfLastClick(Date.now());
              }}
            >
              {t("actions.learnMore")}
            </Button>
          </motion.div>
        </Group>
      </Container>
    </div>
  );
};

export default Home;
