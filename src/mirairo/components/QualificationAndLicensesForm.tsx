import {
  Button,
  Card,
  CardSection,
  Center,
  Checkbox,
  FileInput,
  Grid,
  Group,
  Radio,
  Select,
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
import {
  EducationBackground,
  QualificationsLicenses,
} from "../types/Information";
import { IconX, IconFileInfo, IconCalendarEvent } from "@tabler/icons-react";
import { getNestedError } from "../helpers/constants";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";

const QualificationAndLicensesForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  // ======================= EVENT HANDLERS =======================
  const handleAddQualification = () => {
    formik.setFieldValue("qualifications_licenses", [
      ...(formik.values.qualifications_licenses ?? []),
      {
        id: formik.values.qualifications_licenses?.length ?? 0,
        name: "",
        acquired_date: "",
        file: null,
      },
    ]);
  };

  const handleRemoveQualification = (index: number) => {
    const background = [...(formik.values.qualifications_licenses ?? [])];
    background.splice(index, 1);
    formik.setFieldValue("qualifications_licenses", background);
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
        {t("mirairo.sections.qualificationsLicenses")}
      </Title>

      <>
        <Card mt="xs">
          <CardSection>
            {formik.values.qualifications_licenses &&
              formik.values.qualifications_licenses.map(
                (item: QualificationsLicenses, index: number) => (
                  <Grid id={item.id?.toString()} key={index} mt="sm">
                    <Grid.Col span={{ base: 12, sm: 11 }}>
                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label={t(
                              "mirairo.form.qualifications_licenses.name"
                            )}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={formik.handleChange(
                              `qualifications_licenses[${index}].name`
                            )}
                            required
                            name={`qualifications_licenses[${index}].name`}
                            value={item.name}
                            error={getNestedError(
                              `qualifications_licenses.${index}.name`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, sm: 2 }}>
                          <DateInput
                            valueFormat="YYYY/MM"
                            rightSection={<IconCalendarEvent />}
                            label={t(
                              "mirairo.form.qualifications_licenses.acquired_date"
                            )}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={(value: DateValue) =>
                              formik.setFieldValue(
                                `qualifications_licenses[${index}].acquired_date`,
                                value
                              )
                            }
                            required
                            name={`qualifications_licenses[${index}].acquired_date`}
                            // value={item.acquired_date}
                            value={
                              item.acquired_date
                                ? dayjs(item.acquired_date).toDate()
                                : null
                            }
                            error={getNestedError(
                              `qualifications_licenses.${index}.acquired_date`,
                              formik.errors
                            )}
                          />
                        </Grid.Col>

                        <Grid.Col span={{ base: 6, sm: 4 }}>
                          <FileInput
                            accept="image/png,image/jpeg,application/pdf"
                            clearable
                            rightSection={<IconFileInfo />}
                            label={t(
                              "mirairo.form.qualifications_licenses.file"
                            )}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            // onChange={formik.handleChange(
                            //   `education[${index}].name`
                            // )}
                            value={item.file}
                            onChange={(payload: File | null) =>
                              formik.setFieldValue(
                                `qualifications_licenses[${index}].file`,
                                payload
                              )
                            }
                            required
                            name={`qualifications_licenses[${index}].file`}
                            // value={item.name}
                            error={getNestedError(
                              `qualifications_licenses.${index}.file`,
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
                          // c="white"
                          variant="outline"
                          onClick={() => handleRemoveQualification(index)}
                        >
                          {/* {t("common.remove")} */}
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
                onClick={handleAddQualification}
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

export default QualificationAndLicensesForm;
