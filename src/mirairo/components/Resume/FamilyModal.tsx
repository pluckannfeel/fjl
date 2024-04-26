import {
  Button,
  Card,
  CardSection,
  Center,
  Checkbox,
  Grid,
  Group,
  Radio,
  Select,
  SimpleGrid,
  TextInput,
  Textarea,
  Title,
  Modal,
} from "@mantine/core";
import { DateInput, DateValue } from "@mantine/dates";
import React from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../../classes/Common.module.scss";
import {
  expectedSalaries,
  getNestedError,
  nationalities,
} from "../../helpers/constants";
import { FamilyInformation, Questions } from "@/mirairo/types/Information";
import { IconCalendarEvent, IconX } from "@tabler/icons-react";
import dayjs from "dayjs";

interface FamilyModalProps {
  formik: any;
  close: () => void;
  opened: boolean;
}

const FamilyModal: React.FC<FamilyModalProps> = ({ formik, close, opened }) => {
  const { t } = useTranslation();

  // ======================= EVENT HANDLERS =======================
  const nationalityOptions = nationalities.map((nationality) => ({
    ...nationality,
    label: t(nationality.label), // Translates the label
  }));

  // ======================= EVENT HANDLERS =======================
  const handleAddFamilyMember = () => {
    formik.setFieldValue("family", [
      ...(formik.values.family ?? []),
      {
        id: formik.values.family?.length ?? 0,
        name: "",
        relationship: "",
        birth_date: "",
        age: 0,
        nationality: "",
        intended_to_stay: false,
        work_school_place: "",
        residence_card_number: "",
      },
    ]);
  };

  const handleRemoveFamilyMember = (index: number) => {
    const familyMembers = [...(formik.values.family ?? [])];
    familyMembers.splice(index, 1);
    formik.setFieldValue("family", familyMembers);
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"xl"}
      style={{
        fontSize: "1.6rem",
      }}
      title={t("mirairo.sections.family")}
    >
      <Title order={2} c="text" ta="left"></Title>

      <Grid>
        <Grid.Col span={{ base: 12, md: 12 }}>
          <Radio.Group
            name="has_family"
            // label={t("mirairo.form.marital_status.label")}
            withAsterisk
            required
            value={formik.values.family.length > 0 ? "yes" : "none"}
            onChange={(value) => {
              formik.setFieldValue("has_family", value);
              if (value === "none") {
                formik.setFieldValue("family", []);
              } else {
                // handleAddFamilyMember();
                // # do nothing
              }
            }}
            // onBlur={() => formik.setFieldTouched("marital_status", true)}
            // error={formik.errors.marital_status}
            error={
              formik.touched.has_family && Boolean(formik.errors.has_family)
            }
          >
            <Group mt="xs">
              <Radio
                size="lg"
                color="orange.5"
                value="yes"
                label={t("mirairo.form.has_family.options.yes")}
              />
              <Radio
                size="lg"
                color="orange.5"
                value="none"
                label={t("mirairo.form.has_family.options.none")}
              />
            </Group>
          </Radio.Group>
        </Grid.Col>
      </Grid>

      {formik.values.family.length > 0 && (
        <>
          <Card mt="xs">
            <CardSection>
              {formik.values.family &&
                formik.values.family.map(
                  (family: FamilyInformation, index: number) => (
                    <Grid id={family.id} key={index} mt="sm">
                      <Grid.Col span={{ base: 12, sm: 11 }}>
                        <SimpleGrid cols={{ base: 2, sm: 4 }}>
                          <TextInput
                            label={t("mirairo.form.family.relationship")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={formik.handleChange(
                              `family[${index}].relationship`
                            )}
                            required
                            name={`family[${index}].relationship`}
                            value={family.relationship}
                            error={getNestedError(
                              `family.${index}.relationship`,
                              formik.errors
                            )}
                          />

                          <TextInput
                            label={t("mirairo.form.family.name")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={formik.handleChange(
                              `family[${index}].name`
                            )}
                            required
                            name={`family[${index}].name`}
                            value={family.name}
                            error={getNestedError(
                              `family.${index}.name`,
                              formik.errors
                            )}
                          />

                          <DateInput
                            valueFormat="YYYY/MM/DD"
                            rightSection={<IconCalendarEvent />}
                            label={t("mirairo.form.family.birth_date")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={(value: DateValue) =>
                              formik.setFieldValue(
                                `family[${index}].birth_date`,
                                value
                              )
                            }
                            required
                            name={`family[${index}].birth_date`}
                            value={
                              family.birth_date
                                ? dayjs(family.birth_date).toDate()
                                : null
                            }
                            error={getNestedError(
                              `family.${index}.birth_date`,
                              formik.errors
                            )}
                          />

                          <Select
                            label={t("mirairo.form.family.nationality")}
                            // placeholder={t("mirairo.form.occupation.placeholder")}
                            onChange={(_value, option) => {
                              formik.setFieldValue(
                                `family[${index}].nationality`,
                                option.value
                              );
                            }}
                            data={nationalityOptions}
                            required
                            name={`family[${index}].nationality`}
                            value={family.nationality}
                            error={getNestedError(
                              `family.${index}.nationality`,
                              formik.errors
                            )}
                          />
                        </SimpleGrid>

                        <Grid>
                          <Grid.Col span={{ base: 12, sm: 2 }}>
                            <Checkbox
                              defaultChecked
                              color="lime.5"
                              // color="orange.4"
                              iconColor="dark.8"
                              size="lg"
                              mt={"md"}
                              // value={family.intended_to_stay}
                              label={t("mirairo.form.family.intended_to_stay")}
                              error={getNestedError(
                                `family.${index}.intended_to_stay`,
                                formik.errors
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, sm: 7 }}>
                            <Textarea
                              label={t("mirairo.form.family.work_school_place")}
                              // placeholder={t("mirairo.form.occupation.placeholder")}
                              onChange={formik.handleChange(
                                `family[${index}].work_school_place`
                              )}
                              required
                              name={`family[${index}].work_school_place`}
                              value={family.work_school_place}
                              error={getNestedError(
                                `family.${index}.work_school_place`,
                                formik.errors
                              )}
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, sm: 3 }}>
                            <TextInput
                              label={t(
                                "mirairo.form.family.residence_card_number"
                              )}
                              // placeholder={t("mirairo.form.occupation.placeholder")}
                              onChange={formik.handleChange(
                                `family[${index}].residence_card_number`
                              )}
                              required
                              name={`family[${index}].residence_card_number`}
                              value={family.residence_card_number}
                              error={getNestedError(
                                `family.${index}.residence_card_number`,
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
                            // fullWidth
                            // mt={"xxl"}

                            size="sm"
                            // c="black"
                            // color="action.4"
                            color="red.7"
                            px={6}
                            // c="white"
                            variant="outline"
                            onClick={() => handleRemoveFamilyMember(index)}
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
                    // <Flex
                    //   key={family.id}
                    //   direction={{ base: "column", sm: "row" }}
                    //   gap={{ base: "sm", sm: "lg" }}
                    //   justify={{ sm: "center" }}
                    // >
                    // </Flex>
                  )
                )}
            </CardSection>
          </Card>

          <SimpleGrid mt={"xs"} mb={0} pb={0} cols={{ base: 1, sm: 6 }}>
            <Group grow mt="sm" ta="center">
              <Button
                fullWidth
                size="lg"
                c="black"
                // color="action.4"
                color="cyan.4"
                onClick={handleAddFamilyMember}
              >
                {t("common.add")}
              </Button>
            </Group>
          </SimpleGrid>
        </>
      )}
    </Modal>
  );
};

export default FamilyModal;
