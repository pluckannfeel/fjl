import React, { useState } from "react";
import { useMantineTheme, Paper, Container, Center, Box } from "@mantine/core";
import { Introduction } from "../components/Introduction";
import { motion } from "framer-motion"; // Step 1: Import motion
import MirairoForm from "../components/MirairoForm";
import { useSubmitApplicant } from "../hooks/useSubmitApplicant";
import { PersonalInformation } from "../types/Information";
import ApplicantSubmitted from "../components/ApplicantSubmitted";
import { notifications } from "@mantine/notifications";
import { useFormikContext } from "../contexts/FormProvider";

import { useLocalStorage } from "@mantine/hooks";
import { useNavigate } from "react-router";
import classes from "../classes/Mirairo.module.scss";
import { Header } from "../../core/components/Header";

const MirairoManagement: React.FC = () => {
  const navigate = useNavigate();
  // const theme = useMantineTheme();
  const [isStarted, setIsStarted] = useLocalStorage<boolean>({
    key: "formIsStarted",
    defaultValue: false,
    getInitialValueInEffect: true,
  });
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  // const [submitTimeout, setSubmitTimeout] = useLocalStorage<number | null>({
  //   key: "submitTimeout",
  //   defaultValue: null,
  // });
  // const formik = useFormikContext();

  // submit hook
  const { isLoading, submitApplicant } = useSubmitApplicant();

  const getStartedHandler = () => {
    setIsStarted(true);
    // console.log("clicked");
  };

  // Check if the current time is before the timeout and prevent submission if it is
  // const canSubmit = !submitTimeout || new Date().getTime() > submitTimeout;

  // Define variants for the animation
  const formVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const localStorageKeys = [
    "formIsStarted",
    "formCurrentStep",
    "formValues",
    // "submitTimeout",
  ];

  // submit handler
  const submitApplicantHandler = async (
    values: Partial<PersonalInformation>
  ) => {
    // if (!canSubmit) {
    //   notifications.show({
    //     color: "red",
    //     title: "Submission Disabled",
    //     message:
    //       "You've recently submitted an application. Please wait before submitting again.",
    //   });
    //   return;
    // }

    const now = new Date().getTime();

    submitApplicant(values as PersonalInformation)
      .then((response) => {
        // const twoHoursFromNow = now + 2 * 60 * 60 * 1000; // 2 hours timeout
        // setSubmitTimeout(twoHoursFromNow);
        // temporarily disabled the timeout

        setFormSubmitted(true);
        setIsStarted(false);
        localStorageKeys.forEach((key) => localStorage.removeItem(key));
        // console.log(response);
        //save the id to local storage
        localStorage.setItem("applicant_id", response.id);
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

  const generatePDF = () => {
    navigate("/mirairo-resume");
  };

  return (
    <React.Fragment>
      {/* <Paper
        style={{
          // width: "100%",
          height: "auto",
        }}
      > */}
      <div className={classes.root}>
        {!formSubmitted ? (
          <>
            <Header title="Mirairo 未来路 " />
            {isStarted ? (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={formVariants}
              >
                <Container pt={50}>
                  <MirairoForm
                    setIsStarted={setIsStarted}
                    loading={isLoading}
                    onSubmitApplicant={submitApplicantHandler}
                  />
                </Container>
              </motion.div>
            ) : (
              // <Container pt={50}>
              <Introduction getStartedHandler={getStartedHandler} />
              // </Container>
            )}
          </>
        ) : (
          <ApplicantSubmitted
            generatePDFHandler={generatePDF}
            goBackHandler={() => setFormSubmitted(false)}
          />
        )}
        {/* </Paper> */}
      </div>
    </React.Fragment>
  );
};

export default MirairoManagement;
