import {
  Button,
  Card,
  CardSection,
  Center,
  Grid,
  Group,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core";
import React from "react";
import { motion } from "framer-motion";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";
import { EducationBackground, WorkExperience } from "../types/Information";
import { IconX } from "@tabler/icons-react";
import { getNestedError } from "../helpers/constants";
import { DateInput, DateValue } from "@mantine/dates";

const WorkExperienceForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  // ======================= EVENT HANDLERS =======================
  const handleAddWorkExperience = () => {
    formik.setFieldValue("work_experience", [
      ...(formik.values.work_experience ?? []),
      {
        id: formik.values.work_experience?.length ?? 0,
        employer_name: "",
        from: null,
        to: null,
        position: "",
        responsibilities: "",
        achievements: "",
      },
    ]);
  };

  const handleRemoveWorkExperience = (index: number) => {
    const experience = [...(formik.values.work_experience ?? [])];
    experience.splice(index, 1);
    formik.setFieldValue("work_experience", experience);
  };
  return (
    <React.Fragment>
      <Title
        order={2}
        className={commonStyles.title}
        c="text"
        ta="left"
        mt="sm"
      >
        {t("mirairo.sections.workExperience")}
      </Title>
      <>
        <Card mt="xs">
          <CardSection>
            {formik.values.work_experience &&
              formik.values.work_experience.map(
                (item: WorkExperience, index: number) => (
                  <Grid id={item.id} key={index} mt="sm">
                    <Grid.Col span={{ base: 12, sm: 11 }}>
                      {/* items */}
                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 4 }}>
                          <TextInput
                            autoFocus
                            label={t(
                              "mirairo.form.work_experience.employer_name"
                            )}
                            onChange={formik.handleChange(
                              `work_experience[${index}].employer_name`
                            )}
                            required
                            name={`work_experience[${index}].employer_name`}
                            value={item.employer_name}
                            error={getNestedError(
                              `work_experience.${index}.employer_name`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 2 }}>
                          <DateInput
                            valueFormat="YYYY/MM"
                            label={t("mirairo.form.work_experience.from")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={(value: DateValue) =>
                              formik.setFieldValue(
                                `work_experience[${index}].from`,
                                value
                              )
                            }
                            required
                            name={`work_experience[${index}].from`}
                            value={item.from}
                            error={getNestedError(
                              `work_experience.${index}.from`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 2 }}>
                          <DateInput
                            valueFormat="YYYY/MM"
                            label={t("mirairo.form.work_experience.to")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={(value: DateValue) =>
                              formik.setFieldValue(
                                `work_experience[${index}].to`,
                                value
                              )
                            }
                            required
                            name={`work_experience[${index}].to`}
                            value={item.to}
                            error={getNestedError(
                              `work_experience.${index}.to`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 4 }}>
                          <TextInput
                            autoFocus
                            label={t("mirairo.form.work_experience.position")}
                            onChange={formik.handleChange(
                              `work_experience[${index}].position`
                            )}
                            required
                            name={`work_experience[${index}].position`}
                            value={item.position}
                            error={getNestedError(
                              `work_experience.${index}.position`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>
                      </Grid>

                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <Textarea
                            autoFocus
                            label={t(
                              "mirairo.form.work_experience.responsibilities"
                            )}
                            onChange={formik.handleChange(
                              `work_experience[${index}].responsibilities`
                            )}
                            name={`work_experience[${index}].responsibilities`}
                            value={item.responsibilities}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <Textarea
                            autoFocus
                            label={t(
                              "mirairo.form.work_experience.achievements"
                            )}
                            onChange={formik.handleChange(
                              `work_experience[${index}].achievements`
                            )}
                            name={`work_experience[${index}].achievements`}
                            value={item.achievements}
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
                          onClick={() => handleRemoveWorkExperience(index)}
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
                onClick={handleAddWorkExperience}
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

export default WorkExperienceForm;
