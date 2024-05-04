import React, { useEffect, useState } from "react";
import {
  Paper,
  Container,
  Grid,
  ColorPicker,
  Title,
  Group,
  Button,
  TextInput,
  Textarea,
  Alert,
  Select,
  Radio,
} from "@mantine/core";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import ResumeBuilder from "../components/Resume/ResumeBuilder";
import { IconInfoCircle } from "@tabler/icons-react";

// css
import commonStyles from "../classes/Common.module.scss";

// Import the components for color selection
import { ResumeTheme } from "../types/Resume";
import { useDisclosure, useLocalStorage } from "@mantine/hooks";
import CustomLoader from "../../core/components/Loader";
// import { useNavigate } from "react-router";
// import { useFormikContext } from "../contexts/FormProvider";
// import { useApplicantData } from "../hooks/useApplicantData";
import {
  ApplicantResume,
  // PersonalInformation,
  // WorkExperience,
} from "../types/Information";
import { useApplicantAuth } from "../contexts/ApplicantAuthProvider";
import { useTranslation } from "react-i18next";
// import { debounce } from "lodash";
import { useFormik } from "formik";
// import * as Yup from "yup";
import {
  languageLevels,
  JLPTs,
  JFTs,
  NATs,
  convertImageUrlToBase64,
} from "../helpers/constants";
// import { DateInput, DateValue } from "@mantine/dates";
// import dayjs from "dayjs";
import WorkExperienceModal from "../components/Resume/WorkExperienceModal";
import QualificationsAndLicensesModal from "../components/Resume/QualificationAndLicensesModal";
import EducationModal from "../components/Resume/EducationModal";
import UniqueQuestionsModal from "../components/Resume/UniqueQuestionsModal";
import ClickableAvatar from "../../core/components/ClickableAvatar";
import { useUpdateApplicantResume } from "../hooks/useUpdateApplicantResume";
import { showNotification } from "@mantine/notifications";
import RequiredQuestionsModal from "../components/Resume/RequiredQuestionsModal";
// import { modifyRequiredQuestions } from "../helpers/functions";
import FamilyModal from "../components/Resume/FamilyModal";

const GenerateResume = () => {
  // const navigate = useNavigate();
  const { t } = useTranslation();

  // image file change handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  //modal
  const [
    workexperienceModalOpened,
    { open: workexperienceModalOpen, close: workexperienceModalClose },
  ] = useDisclosure();

  const [
    familyModalOpened,
    { open: familyModalOpen, close: familyModalClose },
  ] = useDisclosure();

  const [
    educationModalOpened,
    { open: educationModalOpen, close: educationModalClose },
  ] = useDisclosure();

  const [
    licensesModalOpened,
    { open: licensesModalOpen, close: licensesModalClose },
  ] = useDisclosure();

  const [
    uniqueQuestionsModalOpened,
    { open: uniqueQuestionsModalOpen, close: uniqueQuestionsModalClose },
  ] = useDisclosure();

  const [
    requiredQuestionsModalOpened,
    { open: requiredQuestionsModalOpen, close: requiredQuestionsModalClose },
  ] = useDisclosure();

  const [theme, setTheme] = useLocalStorage<ResumeTheme>({
    key: "resume-theme",
    defaultValue: {
      textColor: "#000000",
      backgroundColor: "#E4E4E4",
    },
  });

  const [font, setFont] = useLocalStorage<string>({
    key: "resume-font",
    defaultValue: "Roboto",
  });

  // get local storage applicant_id
  // const applicant_id = localStorage.getItem("applicant_id");

  // const { isLoading, data: applicantData } = useApplicantData(
  //   applicant_id as string
  // );

  const { applicantInfo: applicantData, isDataLoading } = useApplicantAuth();
  const { updateResume, isLoading: isResumeUpdating } =
    useUpdateApplicantResume();
  //set a state for applicant_data

  const initialValues: ApplicantResume = {
    id: applicantData?.id ?? "",
    img_url: applicantData?.img_url ?? null,
    nationality: applicantData?.nationality ?? "",
    first_name: applicantData?.first_name ?? "",
    last_name: applicantData?.last_name ?? "",
    middle_name: applicantData?.middle_name ?? "",
    birth_date: applicantData?.birth_date ?? "",
    age: applicantData?.age ?? 0,
    gender: applicantData?.gender ?? "",
    birth_place: applicantData?.birth_place ?? "",
    marital_status: applicantData?.marital_status ?? "",
    occupation: applicantData?.occupation ?? "",
    current_address: applicantData?.current_address ?? "",
    phone_number: applicantData?.phone_number ?? "",
    passport_number: applicantData?.passport_number ?? "",
    passport_expiry: applicantData?.passport_expiry ?? null,
    email: applicantData?.email ?? "",
    family: applicantData?.family ?? [],
    has_family: applicantData?.has_family ?? "none",
    education: applicantData?.education ?? [],
    work_experience: applicantData?.work_experience ?? [],
    qualifications_licenses: applicantData?.qualifications_licenses ?? [],
    jlpt: applicantData?.jlpt ?? "",
    jft: applicantData?.jft ?? "",
    nat: applicantData?.nat ?? "",
    japanese: applicantData?.japanese ?? "",
    english: applicantData?.english ?? "",
    computer_skills: applicantData?.computer_skills ?? "",
    other_skills: applicantData?.other_skills ?? "",
    self_introduction: applicantData?.self_introduction ?? "",
    reason_for_application: applicantData?.reason_for_application ?? "",
    past_experience: applicantData?.past_experience ?? "",
    future_career_plan: applicantData?.future_career_plan ?? "",
    photos: applicantData?.photos ?? [],
    // links: [
    //   {
    //     id: "0",
    //     link: "",
    //   },
    // ],
    // links: [],
    // unique_questions: [],
    unique_questions: applicantData?.unique_questions ?? [],
    required_questions: applicantData?.required_questions ?? [],
    password: "",
    confirm_password: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const updatedRequiredQuestions = values.required_questions.map(
        (question) => {
          // Check if it's the question we want to update
          if (question.id === "4") {
            return {
              ...question,
              answer: values.family.length > 0 ? "yes" : "no",
            };
          }
          // For all other questions, return them unchanged
          return question;
        }
      );

      // Create a new object with the updated array
      const updatedValues = {
        ...values,
        required_questions: updatedRequiredQuestions,
      };

      setResumeDetails(updatedValues);

      updateResume(updatedValues).then(() => {
        showNotification({
          // title: "Resume Updated",
          message: t("mirairo.form.notifications.updateResumeSuccess"),
          color: "teal",
        });
      });
    },
  });

  const [resumeDetails, setResumeDetails] = useState<ApplicantResume>(
    formik.values
  );

  // Create a debounced function which updates the state
  // const handleInputChange = useCallback(
  //   debounce((name, value) => {
  //     setData((prevData) => ({
  //       ...prevData,
  //       [name]: value,
  //     }));
  //   }, 300),
  //   []
  // );

  // const [resumeInstance, updateResumeInstance] = usePDF({
  //   document: <ResumeBuilder font={font} theme={theme} />,
  // });

  // const changeTheme = (color: string) => {
  //   // Here you can define your theme colors based on the selected color
  //   const themes: { [key: string]: ResumeTheme } = {
  //     pink: { textColor: "#ff79c6", backgroundColor: "#ff79c660" },
  //     yellow: { textColor: "#f1fa8c", backgroundColor: "#f1fa8c60" },
  //     darkBlue: { textColor: "#6272a4", backgroundColor: "#6272a460" },
  //     orange: { textColor: "#ffb86c", backgroundColor: "#ffb86c60" },
  //     grey: { textColor: "#999999", backgroundColor: "#99999960" },
  //   };

  //   setTheme(themes[color] || theme);
  // };

  const [imageBase64, setImageBase64] = useState<string>("");

  useEffect(() => {
    convertImageUrlToBase64(formik.values.img_url as string)
      .then((base64) => setImageBase64(base64))
      .catch((error) => console.error("Failed to convert image:", error));
  }, [formik.values.img_url]);

  // useEffect(() => {
  //   if (formik.values.img_url && "img_url" in  && (formik.values.img_url.img_url as any)) {
  //     // Convert to Base64 and update state
  //     toBase64(formik.values.img_url.img_url as unknown as string)
  //       .then((base64) => {
  //         // setData({
  //         //   ...data,
  //         //   img_url: base64, // Now `img_url` is a Base64 string
  //         // });
  //       })
  //       .catch((error) => {
  //         console.error("Conversion to base64 failed:", error);
  //       });
  //   }
  // }, []);

  // const goBackHandler = () => {
  //   // navigate(-1); // Go back to the previous page
  //   navigate("/mirairo", { replace: true });
  // };

  // Check if any field has been touched
  // const anyTouched = Object.values(formik.touched).some((t) => t === true);

  const languageLevelOptions = languageLevels.map((level) => ({
    ...level,
    label: t(level.label), // Translates the label
  }));

  const jlptOptions = JLPTs.map((level) => ({
    ...level,
    label: t(level.label), // Translates the label
  }));

  const jfOptions = JFTs.map((level) => ({
    ...level,
    label: t(level.label), // Translates the label
  }));

  const natOptions = NATs.map((level) => ({
    ...level,
    label: t(level.label), // Translates the label
  }));

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleImageFileSelect = (file: File | null) => {
    if (file) {
      // const reader = new FileReader();
      // reader.onloadend = () => {
      //   formik.setFieldValue("img_url", reader.result);
      // };
      // reader.readAsDataURL(file);
      formik.setFieldValue("img_url", file);
    } else {
      formik.setFieldValue("img_url", null);
    }

    handleClose();
    formik.setFieldTouched("img_url", true, false); // Mark img_url as touched
  };

  return (
    <React.Fragment>
      <Paper
        style={{
          // width: "100%",
          height: "auto",
        }}
      >
        {(isDataLoading && isResumeUpdating) ?? <CustomLoader />}
        {/* <LandingHeader title="Mirairo 未来路 " /> */}

        <Container size="xl" px="xl" py="lg" mt="md">
          <form
            onSubmit={formik.handleSubmit}
            style={{
              padding: "10px 0",
            }}
          >
            <Title
              order={2}
              c="text"
              className={commonStyles.title}
              ta="center"
              // mt="sm"
            >
              {t("mirairo.title")}
            </Title>

            <Grid mt="md">
              <Grid.Col my={"sm"} span={{ base: 12, xs: 4 }}>
                <div className={commonStyles.fullHeightNoBorderScroll}>
                  <Title
                    order={3}
                    c="text"
                    // className={commonStyles.title}
                    ta="left"
                    mt="sm"
                    mb={"sm"}
                  >
                    {t("mirairo.header.colorThemeSelection")}
                  </Title>

                  <ColorPicker
                    fullWidth
                    value={theme.backgroundColor}
                    onChangeEnd={(color) => {
                      setTheme({ ...theme, backgroundColor: color });
                    }}
                    withPicker={false}
                    swatchesPerRow={11}
                    format="hex"
                    swatches={[
                      // "#FFFFFF",
                      "#2e2e2e",
                      "#1E2C55",
                      "#DBE1EF",
                      "#868e96",
                      "#C01C23",
                      "#fa5252",
                      "#e64980",
                      "#be4bdb",
                      "#7950f2",
                      "#4c6ef5",
                      "#228be6",
                      "#15aabf",
                      "#BFD1B0",
                      "#0B6623",
                      "#12b886",
                      "#40c057",
                      "#82c91e",
                      "#fd7e14",
                      "#FFA500",
                      "#fab005",
                      "#5D478B",
                    ]}
                  />

                  <Title
                    order={3}
                    c="text"
                    // className={commonStyles.title}
                    ta="left"
                    mt="sm"
                    // mb={"sm"}
                  >
                    {t("mirairo.header.fontSelection")}
                  </Title>
                  <Radio.Group
                    value={font}
                    p={1}
                    c="text.8"
                    onChange={setFont}
                    // name="favoriteFramework"
                    // label="Select Font"
                    // description="This is anonymous"
                    withAsterisk
                  >
                    <Radio
                      my={8}
                      color="lime.4"
                      size="md"
                      value="Roboto"
                      label="Roboto"
                    />
                    <Radio
                      my={8}
                      color="cyan.4"
                      size="md"
                      value="EB_Garamond"
                      label="Garamond"
                    />
                    <Radio
                      size="md"
                      color="orange.4"
                      value="Mulish"
                      label="Mulish"
                    />
                  </Radio.Group>

                  {/* form input */}
                  <Grid mt="md">
                    <Grid.Col span={{ base: 12 }}>
                      <Alert
                        variant="light"
                        color="yellow"
                        radius="md"
                        // withCloseButton
                        title="Note!"
                        icon={<IconInfoCircle />}
                      >
                        Make sure to click the update button when finished.
                      </Alert>
                      <Title
                        order={3}
                        c="text"
                        // className={commonStyles.title}
                        ta="left"
                        mt={"sm"}
                      >
                        {t("mirairo.header.resumeDetails")}
                      </Title>
                    </Grid.Col>

                    <Grid.Col mt={"xs"} span={{ base: 12 }}>
                      <ClickableAvatar
                        applicant_id={formik.values.id}
                        applicant_image={formik.values.img_url as string}
                        setApplicantImage={(img) => {
                          formik.setFieldValue("img_url", img);
                        }}
                        imgSizePreview={"auto"}
                        handleFileSelect={handleImageFileSelect}
                        error={formik.touched.img_url && formik.errors.img_url}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, xs: 6 }}>
                      <TextInput
                        label={t("mirairo.form.last_name.label")}
                        placeholder={t("mirairo.form.last_name.placeholder")}
                        onChange={formik.handleChange("last_name")}
                        name="last_name"
                        value={formik.values.last_name}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, xs: 6 }}>
                      <TextInput
                        label={t("mirairo.form.last_name.label")}
                        placeholder={t("mirairo.form.first_name.placeholder")}
                        onChange={formik.handleChange("first_name")}
                        name="first_name"
                        value={formik.values.first_name}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <TextInput
                        label={t("mirairo.form.occupation.label")}
                        placeholder={t("mirairo.form.occupation.placeholder")}
                        onChange={formik.handleChange("occupation")}
                        name="occupation"
                        value={formik.values.occupation}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, xs: 6 }}>
                      <TextInput
                        label={t("mirairo.form.email.label")}
                        placeholder={t("mirairo.form.email.placeholder")}
                        onChange={formik.handleChange("email")}
                        name="email"
                        value={formik.values.email}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, xs: 6 }}>
                      <TextInput
                        label={t("mirairo.form.phone_number.label")}
                        placeholder={t("mirairo.form.phone_number.placeholder")}
                        onChange={formik.handleChange("phone_number")}
                        name="phone_number"
                        value={formik.values.phone_number}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <TextInput
                        label={t("mirairo.form.current_address.label")}
                        placeholder={t(
                          "mirairo.form.current_address.placeholder"
                        )}
                        onChange={formik.handleChange("current_address")}
                        name="current_address"
                        value={formik.values.current_address}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Textarea
                        minRows={3}
                        rows={3}
                        resize="vertical"
                        label={t(
                          "mirairo.form.self_career_plans.self_introduction.label"
                        )}
                        placeholder={t(
                          "mirairo.form.self_career_plans.self_introduction.placeholder"
                        )}
                        onChange={formik.handleChange("self_introduction")}
                        name="self_introduction"
                        value={formik.values.self_introduction}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 2 }}>
                      <TextInput
                        label={t("mirairo.form.age.label")}
                        placeholder={t("mirairo.form.age.placeholder")}
                        onChange={formik.handleChange("age")}
                        name="age"
                        value={formik.values.age}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 6 }}>
                      <TextInput
                        label={t("mirairo.form.birth_place.label")}
                        // placeholder={t("mirairo.form.birh_place.placeholder")}
                        onChange={formik.handleChange("birth_place")}
                        name="birth_place"
                        value={formik.values.birth_place}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 4 }}>
                      <TextInput
                        label={t("mirairo.form.marital_status.label")}
                        onChange={formik.handleChange("marital_status")}
                        name="marital_status"
                        value={formik.values.marital_status}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label={t("mirairo.form.skills_languages.english")}
                        placeholder={t(
                          "mirairo.form.skills_languages.level.placeholder"
                        )}
                        data={languageLevelOptions}
                        maxDropdownHeight={250}
                        onChange={(_value, option) => {
                          formik.setFieldValue("english", option.value);
                        }}
                        searchable
                        value={formik.values.english}
                        name="english"
                        // error={formik.errors.nationality}
                        // error={
                        //   formik.touched.english && Boolean(formik.errors.english)
                        // }
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Select
                        label={t("mirairo.form.skills_languages.japanese")}
                        placeholder={t(
                          "mirairo.form.skills_languages.level.placeholder"
                        )}
                        data={languageLevelOptions}
                        maxDropdownHeight={250}
                        onChange={(_value, option) => {
                          formik.setFieldValue("japanese", option.value);
                        }}
                        searchable
                        value={formik.values.japanese}
                        name="japanese"
                        // error={formik.errors.nationality}
                        // error={
                        //   formik.touched.japanese &&
                        //   Boolean(formik.errors.japanese)
                        // }
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Select
                        label={t("mirairo.form.skills_languages.jlpt.label")}
                        placeholder={t(
                          "mirairo.form.skills_languages.jlpt.placeholder"
                        )}
                        data={jlptOptions}
                        maxDropdownHeight={250}
                        onChange={(_value, option) => {
                          formik.setFieldValue("jlpt", option.value);
                        }}
                        searchable
                        value={formik.values.jlpt}
                        name="jlpt"
                        // error={formik.errors.nationality}
                        // error={formik.touched.jlpt && Boolean(formik.errors.jlpt)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Select
                        label={t("mirairo.form.skills_languages.jft.label")}
                        placeholder={t(
                          "mirairo.form.skills_languages.jft.placeholder"
                        )}
                        data={jfOptions}
                        onChange={(_value, option) => {
                          formik.setFieldValue("jft", option.value);
                        }}
                        searchable
                        value={formik.values.jft}
                        name="jft"
                        // error={formik.errors.nationality}
                        // error={formik.touched.jft && Boolean(formik.errors.jft)}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <Select
                        label={t("mirairo.form.skills_languages.nat.label")}
                        placeholder={t(
                          "mirairo.form.skills_languages.nat.placeholder"
                        )}
                        data={natOptions}
                        onChange={(_value, option) => {
                          formik.setFieldValue("nat", option.value);
                        }}
                        searchable
                        value={formik.values.nat}
                        name="nat"
                        // error={formik.errors.nationality}
                        // error={formik.touched.nat && Boolean(formik.errors.nat)}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Textarea
                        resize="vertical"
                        label={t(
                          "mirairo.form.skills_languages.computer_skills.label"
                        )}
                        // placeholder={t(
                        //   "mirairo.form.skills_languages.computer_skills.placeholder"
                        // )}
                        onChange={formik.handleChange("computer_skills")}
                        name="computer_skills"
                        value={formik.values.computer_skills}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <Textarea
                        resize="vertical"
                        label={t(
                          "mirairo.form.skills_languages.other_skills.label"
                        )}
                        // placeholder={t(
                        //   "mirairo.form.skills_languages.other_skills.placeholder"
                        // )}
                        onChange={formik.handleChange("other_skills")}
                        name="other_skills"
                        value={formik.values.other_skills}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Textarea
                        minRows={3}
                        rows={3}
                        resize="vertical"
                        label={t(
                          "mirairo.form.self_career_plans.future_career_plan.label"
                        )}
                        placeholder={t(
                          "mirairo.form.self_career_plans.future_career_plan.placeholder"
                        )}
                        onChange={formik.handleChange("future_career_plan")}
                        name="future_career_plan"
                        value={formik.values.future_career_plan}
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Textarea
                        minRows={3}
                        rows={2}
                        resize="vertical"
                        label={t(
                          "mirairo.form.self_career_plans.past_experience.label"
                        )}
                        // placeholder={t(
                        //   "mirairo.form.self_career_plans.past_experience.placeholder"
                        // )}
                        onChange={formik.handleChange("past_experience")}
                        name="past_experience"
                        value={formik.values.past_experience}
                        // error={
                        //   formik.touched.past_experience &&
                        //   Boolean(formik.errors.past_experience)
                        // }
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Textarea
                        minRows={3}
                        rows={2}
                        resize="vertical"
                        label={t(
                          "mirairo.form.self_career_plans.reason_for_application.label"
                        )}
                        // placeholder={t(
                        //   "mirairo.form.self_career_plans.reason_for_application.placeholder"
                        // )}
                        onChange={formik.handleChange("reason_for_application")}
                        name="reason_for_application"
                        value={formik.values.reason_for_application}
                        // error={
                        //   formik.touched.reason_for_application &&
                        //   Boolean(formik.errors.reason_for_application)
                        // }
                      />
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Title
                        order={3}
                        // className={commonStyles.title}
                        c="text"
                      >
                        {t("mirairo.sections.family")}
                      </Title>
                      <Group mt="sm" ta="center">
                        <Button
                          // fullWidth
                          size="auto"
                          c="black"
                          // color="action.4"
                          color="cyan.4"
                          onClick={familyModalOpen}
                        >
                          {t("mirairo.header.showFamily")}
                        </Button>
                      </Group>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Title
                        order={3}
                        // className={commonStyles.title}
                        c="text"
                      >
                        {t("mirairo.sections.requiredQuestions")}
                      </Title>
                      <Group mt="sm" ta="center">
                        <Button
                          // fullWidth
                          size="auto"
                          c="black"
                          // color="action.4"
                          color="cyan.4"
                          onClick={requiredQuestionsModalOpen}
                        >
                          {t("mirairo.header.showRequiredQuestions")}
                        </Button>
                      </Group>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Title
                        order={3}
                        // className={commonStyles.title}
                        c="text"
                      >
                        {t("mirairo.sections.workExperience")}
                      </Title>
                      <Group mt="sm" ta="center">
                        <Button
                          // fullWidth
                          size="auto"
                          c="black"
                          // color="action.4"
                          color="cyan.4"
                          onClick={workexperienceModalOpen}
                        >
                          {t("mirairo.header.showExperiences")}
                        </Button>
                      </Group>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Title
                        order={3}
                        // className={commonStyles.title}
                        c="text"
                      >
                        {t("mirairo.sections.educationalBackground")}
                      </Title>
                      <Group mt="sm" ta="center">
                        <Button
                          // fullWidth
                          size="auto"
                          c="black"
                          // color="action.4"
                          color="cyan.4"
                          onClick={educationModalOpen}
                        >
                          {t("mirairo.header.showEducation")}
                        </Button>
                      </Group>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Title
                        order={3}
                        // className={commonStyles.title}
                        c="text"
                      >
                        {t("mirairo.sections.qualificationsLicenses")}
                      </Title>
                      <Group mt="sm" ta="center">
                        <Button
                          // fullWidth
                          size="auto"
                          c="black"
                          // color="action.4"
                          color="cyan.4"
                          onClick={licensesModalOpen}
                        >
                          {t("mirairo.header.showQualificationsLicenses")}
                        </Button>
                      </Group>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12 }}>
                      <Title
                        order={3}
                        // className={commonStyles.title}
                        c="text"
                      >
                        {t("mirairo.sections.uniqueQuestions")}
                      </Title>
                      <Group mt="sm" ta="center">
                        <Button
                          // fullWidth
                          size="auto"
                          c="black"
                          // color="action.4"
                          color="cyan.4"
                          onClick={uniqueQuestionsModalOpen}
                        >
                          {t("mirairo.header.showUniqueQuestions")}
                        </Button>
                      </Group>
                    </Grid.Col>
                  </Grid>

                  <Button
                    fullWidth
                    size="md"
                    mt={"xl"}
                    color="green.4"
                    type="submit"
                    disabled={!formik.dirty && !isResumeUpdating}
                  >
                    {t("mirairo.actions.updateResume")}
                  </Button>

                  {/* end form input */}

                  <Group grow mt="xl" ta="center">
                    <PDFDownloadLink
                      style={{
                        textDecoration: "none",
                        backgroundColor: "#A9E24B",
                        padding: "10px 20px",
                        borderRadius: 10,
                        color: "#000",
                        fontWeight: "bold",
                      }}
                      document={
                        <ResumeBuilder
                          font={font}
                          theme={theme}
                          data={resumeDetails}
                          display_photo={imageBase64}
                        />
                      }
                      fileName="CV.pdf"
                    >
                      {({ loading }) =>
                        loading ? <CustomLoader /> : t("common.download")
                      }
                    </PDFDownloadLink>
                  </Group>
                </div>
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 8 }}>
                <PDFViewer
                  // showToolbar={false}
                  style={{
                    borderRadius: 10,
                    width: "100%",
                    height: "100vh",
                    // height: "100%",
                    border: "none",
                  }}
                >
                  <ResumeBuilder
                    font={font}
                    theme={theme}
                    data={resumeDetails}
                    display_photo={imageBase64}
                  />
                </PDFViewer>
              </Grid.Col>
            </Grid>
          </form>
        </Container>
      </Paper>

      <FamilyModal
        formik={formik}
        opened={familyModalOpened}
        close={familyModalClose}
      />
      <RequiredQuestionsModal
        formik={formik}
        opened={requiredQuestionsModalOpened}
        close={requiredQuestionsModalClose}
      />

      <WorkExperienceModal
        formik={formik}
        opened={workexperienceModalOpened}
        close={workexperienceModalClose}
      />
      <EducationModal
        formik={formik}
        opened={educationModalOpened}
        close={educationModalClose}
      />
      <QualificationsAndLicensesModal
        formik={formik}
        opened={licensesModalOpened}
        close={licensesModalClose}
      />
      <UniqueQuestionsModal
        formik={formik}
        opened={uniqueQuestionsModalOpened}
        close={uniqueQuestionsModalClose}
      />
    </React.Fragment>
  );
};

export default GenerateResume;
