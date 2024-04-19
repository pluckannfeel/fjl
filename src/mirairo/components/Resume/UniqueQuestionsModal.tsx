import { SimpleGrid, Textarea, Modal, Select } from "@mantine/core";
import React from "react";
import { useTranslation } from "react-i18next";
import { getNestedError, uniqueQuestionsList } from "../../helpers/constants";

interface UniqueQuestionsModalProps {
  formik: any;
  close: () => void;
  opened: boolean;
}

const UniqueQuestionsModal: React.FC<UniqueQuestionsModalProps> = ({
  formik,
  close,
  opened,
}) => {
  const { t } = useTranslation();

  // ======================= EVENT HANDLERS =======================

  const uniqueQuestionsListOptions = uniqueQuestionsList.map((question) => ({
    ...question,
    label: t(question.label), // Translates the label
  }));

  return (
    <Modal
      opened={opened}
      onClose={close}
      size={"md"}
      style={{
        fontSize: "1.6rem",
      }}
      title={t("mirairo.sections.uniqueQuestions")}
    >
      <SimpleGrid pt={10} cols={1}>
        <Select
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.select")}
          onChange={(_value, option) => {
            formik.setFieldValue(`unique_questions[0].question`, option.value);
          }}
          maxDropdownHeight={300}
          data={uniqueQuestionsListOptions}
          required
          name={`unique_questions[0].question`}
          value={formik.values.unique_questions[0].question}
          error={getNestedError(`unique_questions[0].question`, formik.errors)}
        />
        <Textarea
          // key={question.id}
          // autoFocus={index === 0} // Focus only the first question
          minRows={3}
          // label={t(`mirairo.form.uniqueQuestions.${question.id}`)}
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.answer")}
          required
          onChange={formik.handleChange(`unique_questions[0].answer`)}
          name={`unique_questions[0].answer`}
          value={formik.values.unique_questions[0].answer}
          error={
            formik.touched.unique_questions?.[0]?.answer &&
            getNestedError(`unique_questions.${0}.answer`, formik.errors)
          }
        />

        <Select
          mt={"lg"}
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.select")}
          onChange={(_value, option) => {
            formik.setFieldValue(`unique_questions[1].question`, option.value);
          }}
          maxDropdownHeight={300}
          data={uniqueQuestionsListOptions}
          required
          name={`unique_questions[1].question`}
          value={formik.values.unique_questions[1].question}
          error={getNestedError(`unique_questions[1].question`, formik.errors)}
        />
        <Textarea
          // key={question.id}
          // autoFocus={index === 1} // Focus only the first question
          minRows={3}
          // label={t(`mirairo.form.uniqueQuestions.${question.id}`)}
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.answer")}
          required
          onChange={formik.handleChange(`unique_questions[1].answer`)}
          name={`unique_questions[1].answer`}
          value={formik.values.unique_questions[1].answer}
          error={
            formik.touched.unique_questions?.[1]?.answer &&
            getNestedError(`unique_questions.${1}.answer`, formik.errors)
          }
        />

        <Select
          mt={"lg"}
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.select")}
          onChange={(_value, option) => {
            formik.setFieldValue(`unique_questions[2].question`, option.value);
          }}
          maxDropdownHeight={300}
          data={uniqueQuestionsListOptions}
          required
          name={`unique_questions[2].question`}
          value={formik.values.unique_questions[2].question}
          error={getNestedError(`unique_questions[2].question`, formik.errors)}
        />
        <Textarea
          // key={question.id}
          // autoFocus={index === 0} // Focus only the first question
          minRows={3}
          // label={t(`mirairo.form.uniqueQuestions.${question.id}`)}
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.answer")}
          required
          onChange={formik.handleChange(`unique_questions[2].answer`)}
          name={`unique_questions[2].answer`}
          value={formik.values.unique_questions[2].answer}
          error={
            formik.touched.unique_questions?.[2]?.answer &&
            getNestedError(`unique_questions.${2}.answer`, formik.errors)
          }
        />

        {/* <Select
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.select")}
          onChange={(_value, option) => {
            formik.setFieldValue(`unique_questions[3].question`, option.value);
          }}
          maxDropdownHeight={300}
          data={uniqueQuestionsListOptions}
          required
          name={`unique_questions[3].question`}
          value={formik.values.unique_questions[3].question}
          error={getNestedError(`unique_questions[3].question`, formik.errors)}
        />

        <Textarea
          // key={question.id}
          // autoFocus={index === 0} // Focus only the first question
          minRows={3}
          // label={t(`mirairo.form.uniqueQuestions.${question.id}`)}
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.answer")}
          // required
          onChange={formik.handleChange(`unique_questions[3].answer`)}
          name={`unique_questions[3].answer`}
          value={formik.values.unique_questions[3].answer}
          error={
            formik.touched.unique_questions?.[3]?.answer &&
            getNestedError(`unique_questions.${3}.answer`, formik.errors)
          }
        />

        <Select
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.select")}
          onChange={(_value, option) => {
            formik.setFieldValue(`unique_questions[4].question`, option.value);
          }}
          maxDropdownHeight={300}
          data={uniqueQuestionsListOptions}
          required
          name={`unique_questions[4].question`}
          value={formik.values.unique_questions[4].question}
          error={getNestedError(`unique_questions[4].question`, formik.errors)}
        />

        <Textarea
          // key={question.id}
          // autoFocus={index === 0} // Focus only the first question
          minRows={3}
          // label={t(`mirairo.form.uniqueQuestions.${question.id}`)}
          placeholder={t("mirairo.form.uniqueQuestions.placeholder.answer")}
          // required
          onChange={formik.handleChange(`unique_questions[4].answer`)}
          name={`unique_questions[4].answer`}
          value={formik.values.unique_questions[4].answer}
          error={
            formik.touched.unique_questions?.[4]?.answer &&
            getNestedError(`unique_questions.${4}.answer`, formik.errors)
          }
        /> */}

        {/* {formik.values.unique_questions.map((question, index) => (
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
        ))} */}
      </SimpleGrid>
    </Modal>
  );
};

export default UniqueQuestionsModal;