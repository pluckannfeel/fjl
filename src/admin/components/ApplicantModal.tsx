import {
  Button,
  Grid,
  Group,
  TextInput,
  Text,
  Modal,
  Autocomplete,
  Avatar,
} from "@mantine/core";
import React from "react";
// import commonStyles from "../classes/Common.module.scss";
import { useTranslation } from "react-i18next";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import { Applicant, ApplicantRecords } from "../types/Applicant";
import { recruiters, resultOptions, visas } from "../helpers/constants";
import * as yup from "yup";
import { useFormik } from "formik";

dayjs.extend(timezone);
// asia/tokyo
dayjs.tz.setDefault("Asia/Tokyo");

interface ApplicantModalProps {
  onAdd: (applicant: Applicant) => void;
  onClose: () => void;
  onEdit: (applicant: Applicant) => void;
  open: boolean;
  processing: boolean;
  applicant: ApplicantRecords | undefined;
}

const ApplicantModal: React.FC<ApplicantModalProps> = ({
  // onAdd,
  onClose,
  onEdit,
  open,
  // processing,
  applicant,
}) => {
  const { t } = useTranslation();

  const recruiterOptions = recruiters.map((item) => ({
    ...item,
    label: t(item.label), // Translates the label
  }));

  const initialValues = {
    id: applicant?.id || "",
    recruiter: applicant?.recruiter || "",
    result: applicant?.result || "",
    interview_date: applicant?.interview_date
      ? dayjs(applicant.interview_date).toDate()
      : null,
    organization: applicant?.organization || "",
    visa: applicant?.visa || "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      recruiter: yup.string().required(t("admin.form.recruiter.required")),
      interview_date: yup
        .string()
        .required(t("admin.form.interview_date.required")),
      organization: yup
        .string()
        .required(t("admin.form.organization.required")),
      visa: yup.string().required(t("admin.form.visa.required")),
    }),
    onSubmit: (values) => {
      if (!applicant) {
        console.log("cant edit when applicant is null");
        return;
      }

      onEdit({
        id: applicant.id,
        recruiter: values.recruiter,
        result: values.result,
        interview_date: values.interview_date,
        organization: values.organization,
        visa: values.visa,
      } as Applicant);
    },
    enableReinitialize: true,
  });

  return (
    <Modal
      opened={open}
      onClose={onClose}
      size={"lg"}
      title={
        // <>
        //   <Text size="xl" fw={700}>
        //     {applicant ? applicant.name : "Applicant Modal"}
        //   </Text>
        // </>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Avatar
            size="lg"
            // radius="sm"
            src={applicant?.img_url as string}
            alt="applicant_image"
          />
          <Text fw="bolder" ml="md">
            {applicant?.name}
          </Text>
        </div>
      }
    >
      {applicant && (
        <form onSubmit={formik.handleSubmit}>
          <Grid id={applicant?.id} key={applicant.id} pt={"lg"}>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Autocomplete
                label={t("admin.form.recruiter.label")}
                data={recruiterOptions}
                name="recruiter"
                required
                maxDropdownHeight={250}
                value={formik.values.recruiter}
                onChange={formik.handleChange("recruiter")}
                error={formik.touched.recruiter && formik.errors.recruiter}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <DateInput
                valueFormat="YYYY/MM/DD"
                label={t("admin.form.interview_date.label")}
                name="interview_date"
                value={formik.values.interview_date}
                onChange={(date: DateValue) => {
                  formik.setFieldValue("interview_date", date);
                }}
                error={
                  formik.touched.interview_date && formik.errors.interview_date
                }
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Autocomplete
                label={t("admin.form.result.label")}
                data={resultOptions}
                name="result"
                required
                maxDropdownHeight={250}
                value={formik.values.result}
                onChange={formik.handleChange("result")}
                error={formik.touched.result && formik.errors.result}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Autocomplete
                label={"VISA"}
                data={visas}
                name="visa"
                required
                maxDropdownHeight={250}
                value={formik.values.visa}
                onChange={formik.handleChange("visa")}
                error={formik.touched.visa && formik.errors.visa}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12 }}>
              <TextInput
                label={t("admin.form.organization.label")}
                name="organization"
                required
                value={formik.values.organization}
                onChange={formik.handleChange("organization")}
                error={
                  formik.touched.organization && formik.errors.organization
                }
              />
            </Grid.Col>
          </Grid>

          <Group mt={"lg"}>
            <Button
              variant="gradient"
              size="md"
              type="submit"
              gradient={{ from: "pink", to: "red" }}
            >
              {t("common.save")}
            </Button>
          </Group>
        </form>
      )}
    </Modal>
  );
};

export default ApplicantModal;
