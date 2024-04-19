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
  Modal,
  Paper,
  Container,
  ModalTitle,
  ModalHeader,
} from "@mantine/core";
import React from "react";
import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { EducationBackground, WorkExperience } from "../../types/Information";
import { IconX } from "@tabler/icons-react";
import { getNestedError } from "../../helpers/constants";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";

interface WorkExperienceModalProps {
  formik: any;
  close: () => void;
  opened: boolean;
}

const WorkExperienceModal: React.FC<WorkExperienceModalProps> = ({
  formik,
  close,
  opened,
}) => {
  const { t } = useTranslation();

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
    <Modal
      opened={opened}
      onClose={close}
      size={"auto"}
      style={{
        fontSize: "1.6rem",
      }}
      title={t("mirairo.sections.workExperience")}
    >
      <SimpleGrid pt={10} cols={1}>
        {formik.values.work_experience &&
          formik.values.work_experience.map(
            (item: WorkExperience, index: number) => (
              <Grid id={item.id?.toString()} key={index}>
                <Grid.Col span={{ base: 12, sm: 11 }}>
                  {/* items */}
                  <Grid>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <TextInput
                        label={t("mirairo.form.work_experience.employer_name")}
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
                        // value={item.from}
                        value={item.from ? dayjs(item.from).toDate() : null}
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
                        value={item.to ? dayjs(item.to).toDate() : null}
                        error={getNestedError(
                          `work_experience.${index}.to`,
                          formik.errors
                        )}
                      />
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, sm: 4 }}>
                      <TextInput
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
                        label={t("mirairo.form.work_experience.achievements")}
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
                      // variant="outline"
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
      </SimpleGrid>
      <SimpleGrid mt={"xs"} mb={0} pb={0} cols={{ base: 2, sm: 6 }}>
        <Group grow mt="sm" ta="center">
          <Button
            fullWidth
            //   size="lg"
            size="auto"
            c="black"
            // color="action.4"
            color="cyan.4"
            onClick={handleAddWorkExperience}
          >
            {t("common.add")}
          </Button>
        </Group>
      </SimpleGrid>
    </Modal>
  );
};

export default WorkExperienceModal;
