import React, { useState } from "react";
import { useMantineTheme, Paper, Container, Center, Box } from "@mantine/core";
import { LandingHeader } from "../../landing/components/Header";
import { Introduction } from "../components/Introduction";
import { motion } from "framer-motion"; // Step 1: Import motion
import MirairoForm from "../components/MirairoForm";
import { useSubmitApplicant } from "../hooks/useSubmitApplicant";
import { PersonalInformation } from "../types/Information";
import ApplicantSubmitted from "../components/ApplicantSubmitted";
import { notifications } from "@mantine/notifications";
import { useFormikContext } from "../contexts/FormProvider";

import { useLocalStorage } from "@mantine/hooks";

const MirairoManagement: React.FC = () => {
  // const theme = useMantineTheme();
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [submitTimeout, setSubmitTimeout] = useLocalStorage<number | null>({
    key: "submitTimeout",
    defaultValue: null,
  });
  const formik = useFormikContext();

  // submit hook
  const { isLoading, submitApplicant } = useSubmitApplicant();

  const getStartedHandler = () => {
    setIsStarted(true);
    // console.log("clicked");
  };

  // Check if the current time is before the timeout and prevent submission if it is
  const canSubmit = !submitTimeout || new Date().getTime() > submitTimeout;

  // Define variants for the animation
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  // submit handler
  const submitApplicantHandler = async (
    values: Partial<PersonalInformation>
  ) => {
    if (!canSubmit) {
      notifications.show({
        color: "red",
        title: "Submission Disabled",
        message:
          "You've recently submitted an application. Please wait before submitting again.",
      });
      return;
    }

    const now = new Date().getTime();

    submitApplicant(values as PersonalInformation)
      .then(() => {
        const twoHoursFromNow = now + 2 * 60 * 60 * 1000; // 2 hours timeout
        setSubmitTimeout(twoHoursFromNow);
        setFormSubmitted(true);
      })
      .catch((error) => {
        console.log(error);
        notifications.show({
          color: "red",
          title: "Error",
          message: "Something is Wrong, Please Try Again Later.",
          // classNames: classes,
        });
      })
      .finally(() => {
        // clean up
        // formik.resetForm();
      });
  };

  return (
    <React.Fragment>
      <Paper
        style={{
          // width: "100%",
          height: "auto",
        }}
      >
        {!formSubmitted ? (
          <>
            <LandingHeader title="Mirairo 未来路 " />
            {isStarted ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
              >
                <Container pt={50}>
                  <MirairoForm
                    loading={isLoading}
                    onSubmitApplicant={submitApplicantHandler}
                  />
                </Container>
              </motion.div>
            ) : (
              <Container pt={120}>
                <Introduction getStartedHandler={getStartedHandler} />
              </Container>
            )}
          </>
        ) : (
          <ApplicantSubmitted />
        )}
      </Paper>
    </React.Fragment>
  );
};

export default MirairoManagement;
