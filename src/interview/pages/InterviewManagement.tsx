import React, { useState } from "react";
import {
  useMantineTheme,
  Paper,
  Container,
  Center,
  Box,
  Text,
  Title,
  Button,
} from "@mantine/core";
import { LandingHeader } from "../../landing/components/Header";
import { motion } from "framer-motion"; // Step 1: Import motion
import { notifications } from "@mantine/notifications";

import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router";
import InterviewAuthForm from "./InterviewAuthForm";
import classes from "../classes/landing.module.scss";
import { useTranslation } from "react-i18next";
import { LanguageToggleAction } from "../../core/components/LanguageToggleActions";
import InterviewEntrySheet from "./InterviewEntrySheet";

const InterviewManagement: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [isStarted, setIsStarted] = useLocalStorage<boolean>({
    key: "isEntryStarted",
    defaultValue: false,
    getInitialValueInEffect: true,
  });

  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

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
  // submit handler
  //   const submitApplicantHandler = async (
  //     values: Partial<PersonalInformation>
  //   ) => {};

  //   const generatePDF = () => {
  //     navigate("/mirairo-resume");
  //   };

  return (
    <div className={classes.root}>
      <motion.div initial="hidden" animate="visible" variants={formVariants}>
        <Container size="lg">
          <div className={classes.inner}>
            <div className={classes.content}>
              <div className={classes.settings}>
                <LanguageToggleAction />
              </div>
              {!isStarted ? (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={formVariants}
                >
                  <Container
                    style={{
                      height: "100vh",
                    }}
                  >
                    <motion.div
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <Title className={classes.title}>
                        <Text
                          // component="span"
                          size="xxl"
                          inherit
                          mt={30}
                          variant="gradient"
                          gradient={{ from: "pink", to: "red" }}
                        >
                          {t("mirairo.interview.landing.title")}
                        </Text>{" "}
                      </Title>

                      <Text className={classes.description} fw={"bolder"} mt={30}>
                        {t("mirairo.interview.landing.subtitle")}
                      </Text>
                      <Text className={classes.description} fw={"bolder"} mt={20}>
                        {t("mirairo.interview.actions.register.description")}
                      </Text>

                      <Text className={classes.description} fw={"bolder"} mt={20}>
                        {t("mirairo.interview.landing.subtitle2")}
                      </Text>

                      <Text className={classes.description} fw={"bolder"} mt={20}>
                        {t("mirairo.interview.landing.footer")}
                      </Text>

                      <Text className={classes.description} fw={"bolder"} mt={5}>
                        {t("mirairo.interview.landing.footer2")}
                      </Text>
                      <Button
                        variant="gradient"
                        // gradient={{ from: "pink", to: "yellow" }}
                        onClick={() => setIsStarted(true)}
                        gradient={{ from: "pink", to: "violet" }}
                        size="xl"
                        className={classes.control}
                        mt={40}
                      >
                        {t("mirairo.interview.actions.register.title")}
                      </Button>

                      {/* <InterviewAuthForm /> */}
                    </motion.div>
                  </Container>
                </motion.div>
              ) : (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={formVariants}
                >
                  <InterviewEntrySheet
                    isStarted={isStarted}
                    setIsStarted={setIsStarted}
                  />
                </motion.div>
              )}
            </div>

            {/* {isStarted ??  */}

            {/* // } */}
          </div>
        </Container>
      </motion.div>
    </div>
  );
};

export default InterviewManagement;
