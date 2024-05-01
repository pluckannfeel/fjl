import { Container, Text, Button, Group } from "@mantine/core";
// import { GithubIcon } from "@mantinex/dev-icons";
import classes from "../classes/AboutUs.module.scss";
import { useTranslation } from "react-i18next";
import React from "react";
import { useActiveSectionContext } from "../contexts/ActiveSectionProvider";
import { useSectionInView } from "../hooks/useSectionInView";

const AboutUs = () => {
  const { t } = useTranslation();
  const { activeSection, setActiveSection, setTimeOfLastClick } =
    useActiveSectionContext();

  const { ref } = useSectionInView("about");

  const subTitles = t("about.description", { returnObjects: true });
  const signatures = t("about.signature", { returnObjects: true });
  return (
    <div className={classes.wrapper}>
      <Container ref={ref} size={920} className={classes.inner} id="about">
        <h1 className={classes.title}>
          {/* A{" "} */}
          <Text
            component="span"
            c={"gray.1"}
            // variant="gradient"
            // gradient={{ from: "blue", to: "cyan" }}
            inherit
          >
            {/* fully featured */}
            {t("landing.about")}
          </Text>{" "}
        </h1>

        <Text
          className={classes.description}
          // c="dimmed"
          c={"gray.1"}
          component="div"
        >
          {(subTitles as string[]).map((line, index) => (
            <Text
            c={"gray.1"}
              component="div"
              size="lg"
              style={{ marginBottom: "10px" }}
              key={index}
            >
              {line}
            </Text>
          ))}
        </Text>

        <Text
          className={classes.description}
          // c="dimmed"
          component="div"
          ta={"right"}
        >
          {(signatures as string[]).map((line, index) => (
            <Text
            c={"gray.1"}
              component="div"
              size="lg"
              style={{ marginBottom: "1px" }}
              key={index}
            >
              {line}
            </Text>
          ))}
        </Text>

        {/* <Group className={classes.controls}>
          <Button
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan" }}
          >
            Get started
          </Button>

          </Button> 
        </Group> */}
      </Container>
    </div>
  );
};

export default AboutUs;
