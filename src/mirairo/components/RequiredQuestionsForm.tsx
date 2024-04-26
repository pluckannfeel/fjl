import React from "react";
import {
  Autocomplete,
  Grid,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Textarea,
  Title,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";
import {
  expectedSalaries,
  getNestedError,
  uniqueQuestionsList,
} from "../helpers/constants";

const RequiredQuestionsForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  const expectedSalaryOptions = expectedSalaries.map((salary) => ({
    ...salary,
    label: t(salary.label), // Translates the label
  }));

  return (
    <React.Fragment>
      <Title order={2} c="text" ta="left">
        {t("mirairo.sections.requiredQuestions")}
      </Title>

      <Grid mt="sm">
        {formik.values.required_questions.map((question, index) => {
          return (
            <React.Fragment key={index}>
              <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
                <Title
                  order={4}
                  c="text"
                  // className={commonStyles.title}
                  ta="left"
                  // mt="sm"
                >
                  {t(`mirairo.form.requiredQuestions.questions.${question.id}`)}
                </Title>
              </Grid.Col>
              <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
                {question.id === "7" ? (
                  <Autocomplete
                    // label={t("mirairo.form.birth_date.options.year")}
                    placeholder={"70,000 PHP~"}
                    data={expectedSalaryOptions}
                    name={`required_questions[${index}].answer`}
                    required
                    maxDropdownHeight={250}
                    value={formik.values.required_questions[index].answer}
                    onChange={formik.handleChange(
                      `required_questions[${index}].answer`
                    )}
                    // error={formik.errors.birth_date?.year}
                    error={getNestedError(
                      `required_questions.${index}.answer`,
                      formik.errors
                    )}
                  />
                ) : (
                  <>
                    <Radio.Group
                      name={`required_questions[${index}].answer`}
                      withAsterisk
                      required
                      c={"white"}
                      value={formik.values.required_questions[index].answer}
                      onChange={formik.handleChange(
                        `required_questions[${index}].answer`
                      )}
                      error={getNestedError(
                        `required_questions.${index}.answer`,
                        formik.errors
                      )}
                    >
                      <Group mt="xs">
                        <Radio
                          size="lg"
                          color="orange.5"
                          value="yes"
                          label={t(
                            "mirairo.form.requiredQuestions.answers.yes"
                          )}
                        />
                        <Radio
                          size="lg"
                          color="orange.5"
                          value="no"
                          label={t("mirairo.form.requiredQuestions.answers.no")}
                        />
                      </Group>
                    </Radio.Group>
                  </>
                )}
              </Grid.Col>
            </React.Fragment>
          );
        })}
      </Grid>
    </React.Fragment>
  );
};

export default RequiredQuestionsForm;
