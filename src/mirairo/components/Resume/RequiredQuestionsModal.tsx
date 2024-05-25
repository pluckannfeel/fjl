import {
  Autocomplete,
  Grid,
  Group,
  Radio,
  Title,
  Modal,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { expectedSalaries, getNestedError } from "../../helpers/constants";
import { Questions } from "@/mirairo/types/Information";

interface RequiredQuestionsModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: any;
  close: () => void;
  opened: boolean;
}

const RequiredQuestionsModal: React.FC<RequiredQuestionsModalProps> = ({
  formik,
  close,
  opened,
}) => {
  const { t } = useTranslation();

  // ======================= EVENT HANDLERS =======================

  const expectedSalaryOptions = expectedSalaries.map((salary) => ({
    ...salary,
    label: t(salary.label), // Translates the label
  }));

  const questions = formik.values.required_questions;
  const lastIndex = questions.length - 1;

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"xl"}
      style={{
        fontSize: "1.6rem",
      }}
      title={t("mirairo.sections.requiredQuestions")}
    >
      <Grid>
        {questions.map((question: Questions, index: number) => (
          <React.Fragment key={question.id}>
            <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
              <Title
                order={4}
                c="text"
                ta="left"
              >
                {question.question}
              </Title>
            </Grid.Col>
            <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
              {index === lastIndex ? (
                <Autocomplete
                  placeholder={"70,000 PHP~"}
                  data={expectedSalaryOptions}
                  name={`required_questions[${index}].answer`}
                  required
                  maxDropdownHeight={250}
                  value={question.answer}
                  onChange={formik.handleChange(`required_questions[${index}].answer`)}
                  error={getNestedError(`required_questions.${index}.answer`, formik.errors)}
                />
              ) : (
                <Radio.Group
                  name={`required_questions[${index}].answer`}
                  withAsterisk
                  required
                  c={"white"}
                  value={question.answer}
                  onChange={formik.handleChange(`required_questions[${index}].answer`)}
                  error={getNestedError(`required_questions.${index}.answer`, formik.errors)}
                >
                  <Group mt="xs">
                    <Radio
                      size="lg"
                      color="orange.5"
                      value="yes"
                      label={t("mirairo.form.requiredQuestions.answers.yes")}
                    />
                    <Radio
                      size="lg"
                      color="orange.5"
                      value="no"
                      label={t("mirairo.form.requiredQuestions.answers.no")}
                    />
                  </Group>
                </Radio.Group>
              )}
            </Grid.Col>
          </React.Fragment>
        ))}
      </Grid>
    </Modal>
  );
};

export default RequiredQuestionsModal;