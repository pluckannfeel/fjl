import React from "react";
import { SimpleGrid, Textarea, Title } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useFormikContext } from "../contexts/FormProvider";
import { getNestedError } from "../helpers/constants";

const UniqueQuestionsForm = () => {
  const { t } = useTranslation();
  const formik = useFormikContext();

  return (
    <React.Fragment>
      <Title order={2} c="text" ta="left">
        {t("mirairo.sections.uniqueQuestions")}
      </Title>

      <SimpleGrid mt="sm" cols={1}>
        {formik.values.unique_questions.map((question, index) => (
          <Textarea
            key={question.id}
            autoFocus={index === 0} // Focus only the first question
            minRows={3}
            label={t(`mirairo.form.uniqueQuestions.${question.id}`)}
            required
            onChange={formik.handleChange(`unique_questions[${index}].answer`)}
            name={`unique_questions[${index}].answer`}
            value={question.answer}
            error={
              formik.touched.unique_questions?.[index]?.answer &&
              getNestedError(`unique_questions.${index}.answer`, formik.errors)
            }
          />
        ))}
      </SimpleGrid>
    </React.Fragment>
  );
};

export default UniqueQuestionsForm;
