import {
  Autocomplete,
  Grid,
  Group,
  Radio,
  Select,
  SimpleGrid,
  Textarea,
  Title,
  Modal,
} from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { expectedSalaries, getNestedError } from "../../helpers/constants";
import { Questions } from "@/mirairo/types/Information";

interface RequiredQuestionsModalProps {
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
        {/* Question Worked Overseas */}
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <Title
            order={4}
            c="text"
            // className={commonStyles.title}
            ta="left"
            // mt="sm"
          >
            {formik.values.required_questions[0].question}
          </Title>
        </Grid.Col>

        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <Radio.Group
            name={`required_questions[${0}].answer`}
            withAsterisk
            required
            c={"white"}
            value={formik.values.required_questions[0].answer}
            onChange={formik.handleChange(`required_questions[${0}].answer`)}
            error={getNestedError(
              `required_questions.${0}.answer`,
              formik.errors
            )}
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
        </Grid.Col>
        {/* Question Worked Overseas */}

        {/* Question Smoke */}
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <Title
            order={4}
            c="text"
            // className={commonStyles.title}
            ta="left"
            // mt="sm"
          >
            {formik.values.required_questions[1].question}
          </Title>
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <Radio.Group
            name={`required_questions[${1}].answer`}
            withAsterisk
            required
            c={"white"}
            value={formik.values.required_questions[1].answer}
            onChange={formik.handleChange(`required_questions[${1}].answer`)}
            error={getNestedError(
              `required_questions.${1}.answer`,
              formik.errors
            )}
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
        </Grid.Col>
        {/* Question Smoke */}

        {/* Question alcohol */}
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <Title
            order={4}
            c="text"
            // className={commonStyles.title}
            ta="left"
            // mt="sm"
          >
            {formik.values.required_questions[2].question}
          </Title>
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <Radio.Group
            name={`required_questions[${2}].answer`}
            withAsterisk
            required
            c={"white"}
            value={formik.values.required_questions[2].answer}
            onChange={formik.handleChange(`required_questions[${2}].answer`)}
            error={getNestedError(
              `required_questions.${2}.answer`,
              formik.errors
            )}
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
        </Grid.Col>
        {/* Question alcohol */}

        {/* We will skip #4 (index 3) questions because it is separated (which in family) */}

        {/* Question tattoo */}
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <Title
            order={4}
            c="text"
            // className={commonStyles.title}
            ta="left"
            // mt="sm"
          >
            {formik.values.required_questions[4].question}
          </Title>
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <Radio.Group
            name={`required_questions[${4}].answer`}
            withAsterisk
            required
            c={"white"}
            value={formik.values.required_questions[4].answer}
            onChange={formik.handleChange(`required_questions[${4}].answer`)}
            error={getNestedError(
              `required_questions.${4}.answer`,
              formik.errors
            )}
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
        </Grid.Col>
        {/* Question tattoo */}

        {/* Question allergy */}
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <Title
            order={4}
            c="text"
            // className={commonStyles.title}
            ta="left"
            // mt="sm"
          >
            {formik.values.required_questions[5].question}
          </Title>
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <Radio.Group
            name={`required_questions[${5}].answer`}
            withAsterisk
            required
            c={"white"}
            value={formik.values.required_questions[5].answer}
            onChange={formik.handleChange(`required_questions[${5}].answer`)}
            error={getNestedError(
              `required_questions.${5}.answer`,
              formik.errors
            )}
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
        </Grid.Col>
        {/* Question allergy */}

        {/* Question operations */}
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <Title
            order={4}
            c="text"
            // className={commonStyles.title}
            ta="left"
            // mt="sm"
          >
            {formik.values.required_questions[6].question}
          </Title>
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <Radio.Group
            name={`required_questions[${6}].answer`}
            withAsterisk
            required
            c={"white"}
            value={formik.values.required_questions[6].answer}
            onChange={formik.handleChange(`required_questions[${6}].answer`)}
            error={getNestedError(
              `required_questions.${6}.answer`,
              formik.errors
            )}
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
        </Grid.Col>
        {/* Question operations */}

        {/* { Question salary} */}
        <Grid.Col mt={"xs"} span={{ base: 12, md: 9 }}>
          <Title
            order={4}
            c="text"
            // className={commonStyles.title}
            ta="left"
            // mt="sm"
          >
            {formik.values.required_questions[7].question}
          </Title>
        </Grid.Col>
        <Grid.Col mt={"xs"} span={{ base: 12, md: 3 }}>
          <Autocomplete
            // label={t("mirairo.form.birth_date.options.year")}
            placeholder={"70,000 PHP~"}
            data={expectedSalaryOptions}
            name={`required_questions[${7}].answer`}
            required
            maxDropdownHeight={250}
            value={formik.values.required_questions[7].answer}
            onChange={formik.handleChange(`required_questions[${7}].answer`)}
            // error={formik.errors.birth_date?.year}
            error={getNestedError(
              `required_questions.${7}.answer`,
              formik.errors
            )}
          />
        </Grid.Col>
        {/* { Question salary} */}

        {/* Expected Salary */}
      </Grid>
    </Modal>
  );
};

export default RequiredQuestionsModal;
