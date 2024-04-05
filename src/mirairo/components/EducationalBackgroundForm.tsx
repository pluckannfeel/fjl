import {
  Button,
  Card,
  CardSection,
  Center,
  Grid,
  Group,
  SimpleGrid,
  TextInput,
  Title,
} from "@mantine/core";
import React from "react";
import { motion } from "framer-motion";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";
import { EducationBackground } from "../types/Information";
import { IconX } from "@tabler/icons-react";
import { getNestedError } from "../helpers/constants";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";

const EducationalBackgroundForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  // useEffect(() => {
  //   console.log(formik.values);
  // }, [formik.values]);

  // ======================= EVENT HANDLERS =======================
  const handleAddEducationBackground = () => {
    formik.setFieldValue("education", [
      ...(formik.values.education ?? []),
      {
        id: formik.values.education?.length ?? 0,
        school_name: "",
        faculty: "",
        major: "",
        from: null,
        to: null,
      },
    ]);
  };

  const handleRemoveEducationBackground = (index: number) => {
    const background = [...(formik.values.education ?? [])];
    background.splice(index, 1);
    formik.setFieldValue("education", background);
  };

  return (
    <React.Fragment>
      <Title
        order={2}
        className={commonStyles.title}
        c="text"
        ta="left"
        // mt="sm"
      >
        {t("mirairo.sections.educationalBackground")}
      </Title>
      <>
        <Card mt="xs">
          <CardSection>
            {formik.values.education &&
              formik.values.education.map(
                (background: EducationBackground, index: number) => (
                  <Grid id={background.id?.toString()} key={index} mt="sm">
                    <Grid.Col span={{ base: 12, sm: 11 }}>
                      {/* items */}
                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 4 }}>
                          <TextInput
                            autoFocus
                            label={t("mirairo.form.education.school_name")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={formik.handleChange(
                              `education[${index}].school_name`
                            )}
                            required
                            name={`education[${index}].school_name`}
                            value={background.school_name}
                            error={getNestedError(
                              `education.${index}.school_name`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 6, sm: 2 }}>
                          <TextInput
                            autoFocus
                            label={t("mirairo.form.education.faculty")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={formik.handleChange(
                              `education[${index}].faculty`
                            )}
                            name={`education[${index}].faculty`}
                            value={background.faculty}
                            // error={getNestedError(
                            //   `education.${index}.faculty`,
                            //   formik.errors
                            // )}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 6, sm: 2.5 }}>
                          <TextInput
                            autoFocus
                            label={t("mirairo.form.education.major")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={formik.handleChange(
                              `education[${index}].major`
                            )}
                            name={`education[${index}].major`}
                            value={background.major}
                            error={getNestedError(
                              `education.${index}.major`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 6, sm: 1.75 }}>
                          <DateInput
                            valueFormat="YYYY/MM"
                            label={t("mirairo.form.education.from")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={(value: DateValue) =>
                              formik.setFieldValue(
                                `education[${index}].from`,
                                value
                              )
                            }
                            required
                            name={`education[${index}].from`}
                            // value={background.from}
                            value={
                              background.from
                                ? dayjs(background.from).toDate()
                                : null
                            }
                            error={getNestedError(
                              `education.${index}.from`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 6, sm: 1.75 }}>
                          <DateInput
                            valueFormat="YYYY/MM"
                            label={t("mirairo.form.education.to")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={(value: DateValue) =>
                              formik.setFieldValue(
                                `education[${index}].to`,
                                value
                              )
                            }
                            required
                            name={`education[${index}].to`}
                            // value={background.to}
                            value={
                              background.to
                                ? dayjs(background.to).toDate()
                                : null
                            }
                            error={getNestedError(
                              `education.${index}.to`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                      </Grid>
                    </Grid.Col>

                    <Grid.Col span={{ base: 12, sm: 1 }}>
                      <Center
                        style={{
                          height: "100%",
                        }}
                      >
                        <Button
                          size="sm"
                          color="red.7"
                          px={6}
                          variant="outline"
                          onClick={() => handleRemoveEducationBackground(index)}
                        >
                          <IconX
                            style={{
                              padding: 0,
                              margin: 0,
                            }}
                          />
                        </Button>
                      </Center>
                    </Grid.Col>
                  </Grid>
                )
              )}
          </CardSection>
        </Card>

        <SimpleGrid mt={"xs"} mb={0} pb={0} cols={{ base: 1, sm: 6 }}>
          <Group grow mt="sm" ta="center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                fullWidth
                size="lg"
                c="black"
                // color="action.4"
                color="cyan.4"
                onClick={handleAddEducationBackground}
              >
                {t("common.add")}
              </Button>
            </motion.div>
          </Group>
        </SimpleGrid>
      </>
    </React.Fragment>
  );
};

export default EducationalBackgroundForm;
