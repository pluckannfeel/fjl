import {
  SimpleGrid,
  Title,
  TextInput,
  Autocomplete,
  Grid,
  Radio,
  Group,
  Select,
  Text,
  PasswordInput,
  Container,
  Button,
  FileInput,
  rem,
  ActionIcon,
} from "@mantine/core";
import { motion } from "framer-motion";
import classes from "../classes/login.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ClickableAvatar from "../../core/components/ClickableAvatar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InterviewDateTime, Interviewee } from "../types/interviewee";
import { showNotification } from "@mantine/notifications";
import {
  calculateAge,
  convertBase64ToFile,
  days,
  genders,
  getNestedError,
  getNestedTouched,
  months,
  nationalities,
  years,
} from "../../mirairo/helpers/constants";
import {
  IconCalendarEvent,
  IconClock,
  IconFileInfo,
} from "@tabler/icons-react";
import { DateInput, DateValue, TimeInput } from "@mantine/dates";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { InterviewTimeSlots } from "../helpers/constants";
import { useRegister } from "../../auth/hooks/useRegister";
import { useRegisterInterviewee } from "../hooks/useRegisterInterviewee";
import i18n from "../../core/config/i18n";
import CustomLoader from "../../core/components/Loader";

dayjs.extend(utc);

interface EntrySheetProps {
  isStarted: boolean;
  setIsStarted: (value: boolean) => void;
}

const InterviewEntrySheet: React.FC<EntrySheetProps> = ({ setIsStarted }) => {
  const { t } = useTranslation();

  // hook
  const { isRegistering, register: registerInterviewee } =
    useRegisterInterviewee();

  // image file change handler
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  const initialValues: Interviewee = {
    first_name: "",
    img_url: null,
    last_name: "",
    middle_name: "",
    birth_date: {
      year: "",
      month: "",
      day: "",
    },
    age: 0,
    nationality: "",
    gender: "",
    university_name: "",
    selected_dates: [
      {
        id: "1",
        date: "",
        time: "",
      },
      {
        id: "2",
        date: "",
        time: "",
      },
      {
        id: "3",
        date: "",
        time: "",
      },
    ],
    residence_card_number: "",
    residence_card_expiry: "",
    residence_card_image: null,
    phone_number: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const validationSchema = Yup.object({
    img_url: Yup.mixed().required("Image is required"),
    first_name: Yup.string().required(t("common.errors.required")),
    last_name: Yup.string().required(t("common.errors.required")),
    middle_name: Yup.string().required(t("common.errors.required")),
    birth_date: Yup.object().shape({
      year: Yup.string().required(t("common.errors.required")),
      month: Yup.string().required(t("common.errors.required")),
      day: Yup.string().required(t("common.errors.required")),
    }),
    gender: Yup.string().required(t("common.errors.required")),
    nationality: Yup.string().required(t("common.errors.required")),
    university_name: Yup.string().required(t("common.errors.required")),
    residence_card_number: Yup.string().required(t("common.errors.required")),
    residence_card_expiry: Yup.string().required(t("common.errors.required")),
    residence_card_image: Yup.mixed().required("Image is required"),
    selected_dates: Yup.array().of(
      Yup.object().shape({
        date: Yup.string().required(t("common.errors.required")),
        time: Yup.string().required(t("common.errors.required")),
      })
    ),
    phone_number: Yup.string().required(t("common.errors.required")),
    email: Yup.string()
      .email(t("common.errors.email"))
      .required(t("common.errors.required")),
    // password: Yup.string().required(t("common.errors.required")),
    // confirm_password: Yup.string().oneOf(
    //   [Yup.ref("password"), ""],
    //   t("common.validations.passwordMatch")
    // ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) =>
      handleSubmitEntrySheet({
        ...values,
        img_url: convertBase64ToFile(
          values.img_url as string as string,
          `${values.last_name}_${values.first_name}_img.jpg`
        ),
      }),
  });

  useEffect(() => {
    const birthYear = formik.values.birth_date.year;
    const birthMonth = formik.values.birth_date.month;
    const birthDay = formik.values.birth_date.day;

    if (birthYear && birthMonth && birthDay) {
      // Convert string values to numbers
      const yearNum = parseInt(birthYear, 10);
      const monthNum = parseInt(birthMonth, 10);
      const dayNum = parseInt(birthDay, 10);

      // Ensure all conversions are successful (i.e., the parsed values are not NaN)
      const isValidDate = !isNaN(yearNum) && !isNaN(monthNum) && !isNaN(dayNum);

      if (isValidDate) {
        const age = calculateAge(yearNum, monthNum, dayNum);
        formik.setFieldValue("age", String(age)); // Ensure the age is set as a string if your form expects string values
      }
    }
  }, [
    formik.values.birth_date.year,
    formik.values.birth_date.month,
    formik.values.birth_date.day,
    formik.setFieldValue,
  ]);

  const handleSubmitEntrySheet = async (values: Partial<Interviewee>) => {
    registerInterviewee(values as Interviewee)
      .then((data) => {
        // console.log(data);
        showNotification({
          title: "Entry Sheet Submitted",
          message: "Your entry sheet has been submitted successfully",
          color: "green",
        });

        setFormSubmitted(true);
      })
      .catch((error) => {
        const code = error["response"].data["code"];
        if (code === "data_exist") {
          showNotification({
            title: i18n.language === "en" ? "Error" : "エラー",
            message:
              i18n.language === "en"
                ? "You already have an entry sheet submitted."
                : "すでにエントリーシートを提出しています。",
            color: "red",
          });
        } else {
          showNotification({
            title: i18n.language === "en" ? "Server Error" : "サーバーエラー",
            message: error["response"].data["data"],
            color: "red",
          });
        }
      });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleImageFileSelect = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("img_url", reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      formik.setFieldValue("img_url", null);
    }

    handleClose();
    formik.setFieldTouched("img_url", true, false); // Mark img_url as touched
  };

  // select helpers

  const nationalityOptions = nationalities.map((nationality) => ({
    ...nationality,
    label: t(nationality.label), // Translates the label
  }));

  const genderOptions = genders.map((nationality) => ({
    ...nationality,
    label: t(nationality.label), // Translates the label
  }));

  const formContainerVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 },
  };

  //

  return (
    <motion.div
      variants={formContainerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden" // Define exit animation in formContainerVariants if desired
    >
      <Container size="xm" variant="light" bg="transparent">
        {isRegistering && <CustomLoader />}

        {formSubmitted ? (
          <Container
            style={{
              height: "100vh",
            }}
          >
            <Title className={classes.title}>
              <Text
                // component="span"
                size="xxl"
                inherit
                mt={30}
                variant="gradient"
                gradient={{ from: "pink", to: "red" }}
                //   gradient={{ from: "#0D47A1", to: "#7B1FA2" }} // Deep Blue to Purple Gradient
              >
                {t("mirairo.interview.landing.title")}
              </Text>{" "}
            </Title>

            <Text className={classes.description} mt={30}>
              {t("mirairo.interview.entrySheet.formSubmitted")}
            </Text>

            <Button
              //   variant="gradient"
              bg={"cyan.6"}
              // gradient={{ from: "pink", to: "yellow" }}
              onClick={() => setIsStarted(false)}
              //   gradient={{ from: "pink", to: "violet" }}
              size="xl"
              className={classes.control}
              mt={40}
            >
              {t("common.home")}
            </Button>
          </Container>
        ) : (
          <>
            <Title
              order={1}
              // c="text.1"
              c="cyan.1"
              className={classes.title}
              ta="left"
              // mt="sm"
            >
              {t("mirairo.interview.entrySheet.title")}
            </Title>

            <form onSubmit={formik.handleSubmit} noValidate>
              <Grid mt="sm">
                <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
                  <SimpleGrid mt={0} cols={{ base: 1, sm: 3 }}>
                    <TextInput
                      autoFocus
                      label={t("mirairo.form.last_name.label")}
                      placeholder={t("mirairo.form.last_name.placeholder")}
                      onChange={formik.handleChange("last_name")}
                      name="last_name"
                      value={formik.values.last_name}
                      // error={formik.errors.name?.last_name}
                      error={
                        formik.touched?.last_name &&
                        Boolean(formik.errors?.last_name)
                      }
                    />
                    <TextInput
                      label={t("mirairo.form.first_name.label")}
                      placeholder={t("mirairo.form.first_name.placeholder")}
                      onChange={formik.handleChange("first_name")}
                      name="first_name"
                      value={formik.values.first_name}
                      // error={formik.errors.name?.first_name}
                      error={
                        formik.touched?.first_name &&
                        Boolean(formik.errors?.first_name)
                      }
                    />
                    <TextInput
                      label={t("mirairo.form.middle_name.label")}
                      placeholder={t("mirairo.form.middle_name.placeholder")}
                      name="middle_name"
                      onChange={formik.handleChange("middle_name")}
                      value={formik.values.middle_name}
                      // error={formik.errors.name?.middle_name}
                      error={
                        formik.touched?.middle_name &&
                        Boolean(formik.errors?.middle_name)
                      }
                    />
                  </SimpleGrid>

                  <Grid mt="sm" gutter={{ base: 5 }}>
                    <Grid.Col mt={"xs"} p={0} span={12}>
                      <Title
                        order={3}
                        c="text"
                        // className={commonStyles.title}
                        ta="center"
                      >
                        {t("mirairo.form.birth_date.label")}
                      </Title>
                    </Grid.Col>
                    <Grid.Col span={4}>
                      <Select
                        label={t("mirairo.form.birth_date.options.year")}
                        placeholder={t(
                          "mirairo.form.birth_date.placeholder.year"
                        )}
                        data={years}
                        maxDropdownHeight={250}
                        // onChange={formik.handleChange("birth_date.year")}
                        onChange={(_value, option) => {
                          formik.setFieldValue("birth_date.year", option.value);
                        }}
                        searchable
                        value={formik.values.birth_date.year}
                        // error={formik.errors.birth_date?.year}
                        error={
                          formik.touched.birth_date?.year &&
                          Boolean(formik.errors.birth_date?.year)
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Select
                        label={t("mirairo.form.birth_date.options.month")}
                        placeholder={t(
                          "mirairo.form.birth_date.placeholder.month"
                        )}
                        data={months}
                        maxDropdownHeight={250}
                        // onChange={formik.handleChange("birth_date.month")}
                        onChange={(_value, option) => {
                          formik.setFieldValue(
                            "birth_date.month",
                            option.value
                          );
                        }}
                        searchable
                        value={formik.values.birth_date.month}
                        // error={formik.errors.birth_date?Ï.month}
                        error={
                          formik.touched.birth_date?.month &&
                          Boolean(formik.errors.birth_date?.month)
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={3}>
                      <Select
                        label={t("mirairo.form.birth_date.options.day")}
                        placeholder={t(
                          "mirairo.form.birth_date.placeholder.day"
                        )}
                        data={days}
                        maxDropdownHeight={250}
                        // onChange={formik.handleChange("birth_date.day")}
                        onChange={(_value, option) => {
                          formik.setFieldValue("birth_date.day", option.value);
                        }}
                        searchable
                        value={formik.values.birth_date.day}
                        // error={formik.errors.birth_date?.day}
                        error={
                          formik.touched.birth_date?.day &&
                          Boolean(formik.errors.birth_date?.day)
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={2}>
                      <TextInput
                        disabled
                        label={t("mirairo.form.age.label")}
                        placeholder={t("mirairo.form.age.placeholder")}
                        onChange={formik.handleChange("age")}
                        value={formik.values.age}
                        name="age"
                        // error={formik.errors.age}
                        error={formik.touched.age && Boolean(formik.errors.age)}
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid mt="sm" gutter={{ base: 5 }}>
                    <Grid.Col span={{ base: 12, sm: 3 }}>
                      <Select
                        label={t("mirairo.form.nationality.label")}
                        placeholder={t("mirairo.form.nationality.placeholder")}
                        data={nationalityOptions}
                        maxDropdownHeight={250}
                        onChange={(_value, option) => {
                          formik.setFieldValue("nationality", option.value);
                        }}
                        searchable
                        value={formik.values.nationality}
                        name="nationality"
                        // error={formik.errors.nationality}
                        error={
                          formik.touched.nationality &&
                          Boolean(formik.errors.nationality)
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 3 }}>
                      <Select
                        label={t("mirairo.form.gender.label")}
                        placeholder={t("mirairo.form.gender.placeholder")}
                        data={genderOptions}
                        maxDropdownHeight={250}
                        onChange={(_value, option) => {
                          formik.setFieldValue("gender", option.value);
                        }}
                        searchable
                        value={formik.values.gender}
                        name="gender"
                        // error={formik.errors.gender}
                        error={
                          formik.touched.gender && Boolean(formik.errors.gender)
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 6 }}>
                      <TextInput
                        label={t("mirairo.form.university_name.label")}
                        placeholder={t(
                          "mirairo.form.university_name.placeholder"
                        )}
                        onChange={formik.handleChange("university_name")}
                        name="university_name"
                        value={formik.values.university_name}
                        // error={formik.errors.name?.university_name}
                        error={
                          formik.touched?.university_name &&
                          Boolean(formik.errors?.university_name)
                        }
                      />
                    </Grid.Col>
                  </Grid>

                  <Grid my={"md"}>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label={t("mirairo.interview.phone_number.label")}
                        //   placeholder="you@abc.com"
                        size="sm"
                        required
                        value={formik.values.phone_number}
                        onChange={formik.handleChange("phone_number")}
                        name="phone_number"
                        error={
                          formik.touched.phone_number &&
                          Boolean(formik.errors.phone_number)
                        }
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: 6 }}>
                      <TextInput
                        label={t("mirairo.interview.email.label")}
                        //   placeholder="you@abc.com"
                        size="sm"
                        required
                        value={formik.values.email}
                        onChange={formik.handleChange("email")}
                        name="email"
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
                      />
                    </Grid.Col>
                  </Grid>
                </Grid.Col>
                <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
                  <ClickableAvatar
                    applicant_id={formik.values.id}
                    applicant_image={formik.values.img_url as string}
                    setApplicantImage={(img) => {
                      formik.setFieldValue("img_url", img);
                    }}
                    handleFileSelect={handleImageFileSelect}
                    error={formik.touched.img_url && formik.errors.img_url}
                  />
                </Grid.Col>
              </Grid>

              <Title
                mb={"xs"}
                order={3}
                c="text"
                // className={commonStyles.title}
                ta="left"
              >
                {t("mirairo.interview.interviewDate.title")}
              </Title>

              <Grid mt="sm">
                {formik.values.selected_dates &&
                  formik.values.selected_dates.map(
                    (item: InterviewDateTime, index: number) => (
                      <Grid.Col
                        key={item.id}
                        mt={"xs"}
                        span={{ base: 12, md: 4 }}
                      >
                        <DateInput
                          valueFormat="YYYY/MM/DD"
                          rightSection={<IconCalendarEvent />}
                          label={`${t(
                            "mirairo.interview.interviewDate.label"
                          )} ${index + 1}`}
                          name={`selected_dates[${index}].date`}
                          value={
                            formik.values.selected_dates[index].date
                              ? dayjs
                                  .utc(formik.values.selected_dates[index].date)
                                  .toDate()
                              : null
                          }
                          // value={dayjs(formik.values.selected_dates[index].date).toDate()}
                          onChange={(value: DateValue) =>
                            formik.setFieldValue(
                              `selected_dates[${index}].date`,
                              value ? dayjs.utc(value).format("YYYY/MM/DD") : ""
                            )
                          }
                          error={
                            getNestedTouched(
                              `selected_dates.${index}.date`,
                              formik.touched
                            ) &&
                            Boolean(
                              getNestedError(
                                `selected_dates.${index}.date`,
                                formik.errors
                              )
                            )
                          }
                        />
                        <Select
                          label={`${t(
                            "mirairo.interview.interviewTime.label"
                          )} ${index + 1}`}
                          data={InterviewTimeSlots}
                          maxDropdownHeight={250}
                          // onChange={(_value, option) => {
                          //   formik.setFieldValue(
                          //     "selected_dates[${index}].time`",
                          //     option.value
                          //   );
                          // }}
                          onChange={(value, option) => {
                            formik.setFieldValue(
                              `selected_dates[${index}].time`,
                              value
                            );
                          }}
                          value={formik.values.selected_dates[index].time}
                          error={
                            getNestedTouched(
                              `selected_dates.${index}.time`,
                              formik.touched
                            ) &&
                            Boolean(
                              getNestedError(
                                `selected_dates.${index}.time`,
                                formik.errors
                              )
                            )
                          }
                        />
                      </Grid.Col>
                    )
                  )}
              </Grid>
              <Title
                my={"sm"}
                order={3}
                c="text"
                // className={commonStyles.title}
                ta="left"
              >
                {t("mirairo.interview.residence_card.title")}
              </Title>
              <Grid mt="sm">
                <Grid.Col span={{ base: 12, md: 3 }}>
                  <TextInput
                    label={t("mirairo.interview.phone_number.label")}
                    //   placeholder="you@abc.com"
                    size="sm"
                    required
                    value={formik.values.phone_number}
                    onChange={formik.handleChange("phone_number")}
                    name="phone_number"
                    error={
                      formik.touched.phone_number &&
                      Boolean(formik.errors.phone_number)
                    }
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                  <TextInput
                    label={t("mirairo.interview.residence_card_number.label")}
                    //   placeholder="you@abc.com"
                    size="sm"
                    value={formik.values.residence_card_number}
                    onChange={formik.handleChange("residence_card_number")}
                    name="residence_card_number"
                    error={Boolean(formik.errors.residence_card_number)}
                  />
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 3 }}>
                  <DateInput
                    valueFormat="YYYY/MM"
                    rightSection={<IconCalendarEvent />}
                    label={t(
                      "mirairo.form.qualifications_licenses.acquired_date"
                    )}
                    // placeholder={t("mirairo.form.occupation.placeholder")}
                    onChange={(value: DateValue) =>
                      formik.setFieldValue(`residence_card_expiry`, value)
                    }
                    name={`residence_card_expiry`}
                    // value={item.acquired_date}
                    value={
                      formik.values.residence_card_expiry
                        ? dayjs(formik.values.residence_card_expiry).toDate()
                        : null
                    }
                    error={Boolean(formik.errors.residence_card_expiry)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 3 }}>
                  <FileInput
                    accept="image/png,image/jpeg,application/pdf"
                    clearable
                    rightSection={<IconFileInfo />}
                    label={t("mirairo.form.qualifications_licenses.file")}
                    // placeholder={t("mirairo.form.occupation.placeholder")}
                    // onChange={formik.handleChange(
                    //   `education[${index}].name`
                    // )}
                    value={formik.values.residence_card_image as File | null}
                    onChange={(payload: File | null) =>
                      formik.setFieldValue(`residence_card_image`, payload)
                    }
                    name={`residence_card_image`}
                    // value={item.name}
                    error={Boolean(formik.errors.residence_card_image)}
                  />
                </Grid.Col>

                {/* <Grid.Col  span={{ base: 0, md: 1 }} /> */}
                {/* <Grid.Col mt={"xs"} span={{ base: 12, md: 6 }}>
            <Title
              order={3}
              c="text"
              mb={"xs"}
              // className={commonStyles.title}
              ta="left"
            >
              {t("mirairo.interview.account_information.title")}
            </Title>
            
            <PasswordInput
              label={t("mirairo.interview.password.label")}
              //   placeholder="Your password"

              size="md"
              mt="md"
              value={formik.values.password}
              onChange={formik.handleChange("password")}
              name="password"
              error={formik.touched.password && Boolean(formik.errors.password)}
            />

            <PasswordInput
              label={t("mirairo.interview.confirm_password.label")}
              //   placeholder="Your password"

              size="md"
              mt="md"
              value={formik.values.confirm_password}
              onChange={formik.handleChange("confirm_password")}
              name="confirm_password"
              error={
                formik.touched.confirm_password &&
                formik.errors.confirm_password
              }
            /> 
          </Grid.Col>*/}
              </Grid>

              <Group grow mt="xl" ta="center">
                <Button
                  onClick={() => setIsStarted(false)}
                  fullWidth
                  mt="xl"
                  size="lg"
                  variant="gradient"
                >
                  {t("common.back")}
                </Button>
                <Button fullWidth mt="xl" size="lg" bg="cyan.6" type="submit">
                  {t("common.submit")}
                </Button>
              </Group>
            </form>
          </>
        )}
      </Container>
    </motion.div>
  );
};

export default InterviewEntrySheet;
