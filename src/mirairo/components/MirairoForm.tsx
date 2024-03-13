import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Anchor,
  Breadcrumbs,
  Button,
  Container,
  Group,
  Paper,
  Title,
} from "@mantine/core";
import { useFormik, FormikErrors } from "formik";
import * as Yup from "yup";
import { PersonalInformation } from "../types/Information";
import EducationalBackgroundForm from "./EducationalBackgroundForm";
import FamilyForm from "./FamilyForm";
import LegalInformationForm from "./LegalInformationForm";
import PersonalInformationForm from "./PersonalInformationForm";
import QualificationAndLicensesForm from "./QualificationAndLicensesForm";
import SelfAndCareerPlansForm from "./SelfAndCareerPlansForm";
import SkillsAndLanguagesForm from "./SkillsAndLanguagesForm";
import WorkExperienceForm from "./WorkExperienceForm";

import styles from "../classes/MirairoForm.module.scss";
import { useTranslation } from "react-i18next";
import FormikContext from "../contexts/FormProvider";
import {
  days,
  genders,
  months,
  nationalities,
  years,
} from "../helpers/constants";
import dayjs from "dayjs";

// Step definitions
const formSteps = [
  {
    name: "mirairo.sections.personalInformation",
    component: PersonalInformationForm,
    fields: [
      "name.last_name",
      "name.first_name",
      "name.middle_name",
      "nationality",
      "gender",
      "birth_date.year",
      "birth_date.month",
      "birth_date.day",
      "birth_place",
      "marital_status",
      // "occupation",
      // "current_address",
      // "phone_number",
      // "passport_number",
      // "passport_expiry",
      // "email",
    ],
  },
  {
    name: "mirairo.sections.legalInformation",
    component: LegalInformationForm,
    fields: [
      "occupation",
      "current_address",
      "phone_number",
      "passport_number",
      "passport_expiry",
      "email",
    ],
  },
  { name: "mirairo.sections.family", component: FamilyForm },
  {
    name: "mirairo.sections.educationalBackground",
    component: EducationalBackgroundForm,
  },
  { name: "mirairo.sections.workExperience", component: WorkExperienceForm },
  {
    name: "mirairo.sections.qualificationsLicenses",
    component: QualificationAndLicensesForm,
  },
  {
    name: "mirairo.sections.skillsLanguages",
    component: SkillsAndLanguagesForm,
  },
  {
    name: "mirairo.sections.SelfCareerPlans",
    component: SelfAndCareerPlansForm,
  },
];

function getFieldError(
  fieldPath: string,
  errors: FormikErrors<PersonalInformation>
): string | undefined {
  // Split the fieldPath (e.g., 'name.first_name') into an array of keys
  const keys = fieldPath.split(".");
  let currentError: any = errors;

  // Iterate over the keys array, navigating deeper into the errors object
  for (const key of keys) {
    if (currentError && typeof currentError === "object") {
      currentError = currentError[key];
    } else {
      // If we encounter a non-object (including undefined), stop and return undefined
      return undefined;
    }
  }

  // If the loop completes, currentError will be the error message string or undefined
  return currentError;
}

const MirairoForm = () => {
  // instance
  const { t } = useTranslation();

  // ----------------- STATE MGMT --------------------------

  const [currentStep, setCurrentStep] = useState<number>(0);

  // Current form component based on the current step
  const CurrentFormComponent = formSteps[currentStep].component;

  // ----------------- STATE MGMT --------------------------

  // ----------------- ANIMATION VARIANTS -------------------
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

  // Animation variants for the form container
  const formContainerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  // Animation variants for the navigation buttons
  // const buttonVariants = {
  //   hover: { scale: 1.05 },
  //   tap: { scale: 0.95 },
  // };

  // ----------------- ANIMATION VARIANTS -------------------

  // ----------------- FORMIK YUP ---------------------
  const initialValues: PersonalInformation = {
    nationality: "",
    name: {
      first_name: "",
      middle_name: "",
      last_name: "",
    },
    birth_date: {
      year: "",
      month: "",
      day: "",
    },
    age: 0,
    gender: "",
    birth_place: "",
    marital_status: "",
    occupation: "",
    current_address: "",
    phone_number: "",
    passport_number: "",
    passport_expiry: null,
    email: "",
    family: [],
    education: [],
    work_experience: [],
    qualifications_licenses: [],
    jlpt: "",
    other_languages: "",
    computer_skills: "",
    other_skills: "",
    self_introduction: "",
    reason_for_application: "",
    past_experience: "",
    future_career_plan: "",
  };

  const informationSchemeValidation = Yup.object({
    nationality: Yup.string().required("Nationality is required"),
    // .test(
    //   "isValidNationality",
    //   "Please select a valid nationality",
    //   (value) => nationalities.some((option) => option.value === value)
    // ),
    name: Yup.object().shape({
      first_name: Yup.string().required(t("common.errors.required")),
      middle_name: Yup.string().required(t("common.errors.required")),
      last_name: Yup.string().required(t("common.errors.required")),
    }),
    birth_date: Yup.object().shape({
      year: Yup.number().required(t("common.errors.required")),
      // .test("isYearValid", t("common.errors.invalidYear"), (value) =>
      //   years.some((year) => parseInt(year.value) === value)
      // ),
      month: Yup.number()
        .required(t("common.errors.required"))
        .test("isMonthValid", t("common.errors.invalidMonth"), (value) =>
          months.some((month) => parseInt(month.value) === value)
        ),
      day: Yup.number()
        .required(t("common.errors.required"))
        .test("isMonthValid", t("common.errors.invalidDay"), (value) =>
          days.some((day) => parseInt(day.value) === value)
        ),
    }),
    gender: Yup.string().required(t("common.errors.required")),
    // .test("isMonthValid", t("common.errors.invalidDay"), (value) =>
    //   genders.some((gender) => gender.value === value)
    // ),
    birth_place: Yup.string().required(t("common.errors.required")),
    marital_status: Yup.string().required(t("common.errors.required")),
    occupation: Yup.string().required(t("common.errors.required")),
    current_address: Yup.string().required(t("common.errors.required")),
    phone_number: Yup.string().required(t("common.errors.required")),
    passport_number: Yup.string().required(t("common.errors.required")),
    passport_expiry: Yup.string().required(t("common.errors.required")),
    email: Yup.string().required(t("common.errors.required")),
    family: Yup.array().of(
      Yup.object({
        name: Yup.string().required(t("common.errors.required")),
        relationship: Yup.string().required(t("common.errors.required")),
        birth_date: Yup.string().required(t("common.errors.required")),
        age: Yup.number().required(t("common.errors.required")),
        nationality: Yup.string().required(t("common.errors.required")),
        intended_to_stay: Yup.boolean().required(t("common.errors.required")),
        work_school_place: Yup.string().required(t("common.errors.required")),
        residence_card_number: Yup.string().required(
          t("common.errors.required")
        ),
      })
    ),
    education: Yup.array().of(
      Yup.object({
        school_name: Yup.string().required(t("common.errors.required")),
        from: Yup.string().required(t("common.errors.required")),
        to: Yup.string().required(t("common.errors.required")),
      })
    ),
    work_experience: Yup.array().of(
      Yup.object({
        employer_name: Yup.string().required(t("common.errors.required")),
        from: Yup.string().required(t("common.errors.required")),
        to: Yup.string().required(t("common.errors.required")),
        position: Yup.string().required(t("common.errors.required")),
      })
    ),
    qualifications_licenses: Yup.array().of(
      Yup.object({
        name: Yup.string().required(t("common.errors.required")),
        acquired_date: Yup.string().required(t("common.errors.required")),
      })
    ),
    jlpt: Yup.string().required(t("common.errors.required")),
    other_languages: Yup.string().required(t("common.errors.required")),
    computer_skills: Yup.string().required(t("common.errors.required")),
    other_skills: Yup.string(),
    self_introduction: Yup.string().required(t("common.errors.required")),
    reason_for_application: Yup.string().required(t("common.errors.required")),
    past_experience: Yup.string().required(t("common.errors.required")),
    future_career_plan: Yup.string().required(t("common.errors.required")),
  });

  const formik = useFormik({
    initialValues,
    validationSchema: informationSchemeValidation,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  // ----------------- FORMIK YUP ---------------------

  // ----------------- EVENT HANDLERS -----------------

  // const nextStep = () =>
  //   setCurrentStep((s) => Math.min(s + 1, formSteps.length - 1));

  // const nextStep = async () => {
  //   // Optionally, specify which fields to validate for the current step
  //   const currentStepConfig = formSteps[currentStep];
  //   if (!currentStepConfig) {
  //     console.error("Current step configuration is undefined.");
  //     return;
  //   }

  //   // Now you can safely use currentStepConfig knowing it's defined
  //   const currentStepFields = Object.keys(formik.values).filter(
  //     (field) => currentStepConfig.fields?.includes(field) // Ensure fields are defined and used safely
  //   );

  //   const errors = await formik.validateForm();
  //   formik.setTouched(
  //     currentStepFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
  //   );

  //   function getFieldError(
  //     field: string,
  //     errors: FormikErrors<PersonalInformation>
  //   ): string | undefined {
  //     const parts = field.split(".");
  //     let current: any = errors;

  //     for (const part of parts) {
  //       if (current === undefined) {
  //         return undefined;
  //       }
  //       current = current[part];
  //     }

  //     return current;
  //   }

  //   const isCurrentStepValid = currentStepFields.every(
  //     (field) => !getFieldError(field, errors)
  //   );

  //   if (isCurrentStepValid) {
  //     setCurrentStep((s) => Math.min(s + 1, formSteps.length - 1));
  //   } else {
  //     // Handle the case where the current step is invalid
  //     // e.g., display a message, or simply don't navigate away
  //   }
  // };

  const nextStep = async () => {
    const currentStepFields = formSteps[currentStep]?.fields || [];
    const errors = await formik
      .validateForm()
      .catch((err) => console.error(err));

    if (typeof errors === "undefined") {
      console.error("Unexpected undefined errors");
      return;
    }

    let isStepValid = true;
    currentStepFields.forEach((field) => {
      if (getFieldError(field, errors)) {
        // Assuming getFieldError handles nested paths correctly
        isStepValid = false;
        formik.setFieldTouched(field, true, false);
      }
    });

    if (isStepValid) {
      setCurrentStep((s) => Math.min(s + 1, formSteps.length - 1));
    } else {
      const firstErrorField = currentStepFields.find((field) =>
        getFieldError(field, errors)
      );
      if (firstErrorField) {
        const input = document.querySelector(
          `[name='${firstErrorField}']`
        ) as HTMLElement;
        input?.focus();
      }
    }
  };

  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 0));

  // ----------------- EVENT HANDLERS -----------------
  return (
    <Container size="md">
      <FormikContext.Provider value={formik}>
        <motion.div
          className={styles.inner}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className={styles.content}>
            <Breadcrumbs
              mb={50}
              separator="→"
              separatorMargin="md"
              className={styles.breadcrumbs}
            >
              {formSteps.slice(0, currentStep + 1).map((step, index) => (
                <Anchor
                  size="sm"
                  key={step.name}
                  c={"text.8"}
                  fw={700}
                  className={currentStep === index ? styles.active : ""}
                  onClick={() => setCurrentStep(index)}
                >
                  {t(step.name)}
                </Anchor>
              ))}
            </Breadcrumbs>

            <form onSubmit={formik.handleSubmit}>
              {/* <AnimatePresence mode="wait"> */}
              <motion.div
                key={currentStep} // Important for AnimatePresence to detect changes
                variants={formContainerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden" // Define exit animation in formContainerVariants if desired
              >
                {/* Dynamic form content */}
                <CurrentFormComponent />
              </motion.div>
              {/* </AnimatePresence> */}
            </form>

            {/* Navigation buttons */}
            <Group grow mt="xl" ta="center">
              {currentStep > 0 && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    fullWidth
                    size="lg"
                    color="secondary.5"
                    // c="text.5"
                    c="white"
                    onClick={prevStep}
                  >
                    {t("common.back")}
                  </Button>
                </motion.div>
              )}
              {currentStep < formSteps.length - 1 && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      fullWidth
                      size="lg"
                      onClick={nextStep}
                      // disabled={currentStep === formSteps.length - 1}
                      c="black"
                      color="action.4"
                    >
                      {t("common.next")}
                    </Button>
                  </motion.div>
                </>
              )}
              {currentStep === formSteps.length - 1 && (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      fullWidth
                      size="lg"
                      color="green.4"
                      onClick={nextStep}
                      // disabled={currentStep === formSteps.length - 1}
                    >
                      {t("common.submit")}
                    </Button>
                  </motion.div>
                </>
              )}
            </Group>
          </div>
        </motion.div>
      </FormikContext.Provider>
    </Container>
  );
};

export default MirairoForm;
