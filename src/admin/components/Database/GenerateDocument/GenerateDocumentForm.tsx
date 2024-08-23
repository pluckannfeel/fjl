import {
  Button,
  Grid,
  Group,
  TextInput,
  Text,
  Autocomplete,
  Avatar,
  rem,
  Switch,
  useMantineTheme,
  Textarea,
  Divider,
  Center,
  NumberInput,
  NativeSelect,
  Select,
} from "@mantine/core";

import classes from "@/admin/classes/Common.module.scss";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateInput, DateValue } from "@mantine/dates";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import {
  Agency,
  Company,
  GenerateDocument,
  JobDetails,
} from "@/admin/types/Database";
import * as yup from "yup";
import { useFormik } from "formik";
import { usePrefectures } from "@/admin/hooks/useAddressPrefectures";
import {
  IconAt,
  IconCheck,
  IconChevronDown,
  IconCurrencyYen,
  IconMailbox,
  IconPhone,
  IconPlus,
  IconWorldWww,
  IconX,
} from "@tabler/icons-react";
import { getNestedError } from "@/mirairo/helpers/constants";
import { JobPositions, letterPackTOAddresses } from "@/admin/helpers/constants";
import { showNotification } from "@mantine/notifications";

dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Tokyo");

interface GenerateDocumentFormProps {
  applicationType: string | null;
  visaType: string | null;
  documentType: string | null;
  onGenerate: (data: any) => void;
  processing: boolean;
  companies: Company[];
  agencies: Agency[];
}

const GenerateDocumentForm: React.FC<GenerateDocumentFormProps> = ({
  applicationType,
  visaType,
  documentType,
  onGenerate,
  processing,
  companies,
  agencies,
}) => {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const initialValues: Partial<GenerateDocument> = {
    created_date: null,
    selected_company: "",
    selected_agency: "",
    job_details: [],
    total_workers: 0,
    employment_address: "",
    employment_term: "",
    job_position_title: "",
    job_position_description: "",
    worker_name: "",
    philippine_address: "",
    civil_status: "",
    passport_no: "",
    passport_date_issued: null,
    passport_place_issued: "",
    ssw_job_title: "",

    // salary breakdown
    basic_salary: 180_000,
    income_tax: 4410,
    social_insurance: 31_460,
    housing_cost: 20_000,
    utility_cost: 4000,
    allowance: 10_000,
    net_salary: 0,
    total_allowances: 0,
    total_deductions: 0,


    // letter pack
    recipient_id: "",
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values: Partial<GenerateDocument>) =>
      handleSubmit(values as GenerateDocument),
    // enableReinitialize: true,
  });

  useEffect(() => {
    // if visaType, applicationType changes, reset the form
    formik.resetForm();
  }, [visaType, applicationType]);

  useEffect(() => {
    const { basic_salary, income_tax, social_insurance, housing_cost, utility_cost } = formik.values;
  
    // Calculate total deductions
    const total_deductions = (income_tax ?? 0) + (social_insurance ?? 0) + (housing_cost ?? 0) + (utility_cost ?? 0);
    formik.setFieldValue('total_deductions', total_deductions);
  
    // Calculate net salary
    const net_salary = (basic_salary ?? 0) - total_deductions;
    formik.setFieldValue('net_salary', net_salary);

    const total_allowances = (formik.values.allowance ?? 0);
    formik.setFieldValue('total_allowances', total_allowances);
  }, [formik.values.basic_salary, formik.values.income_tax, formik.values.social_insurance, formik.values.housing_cost, formik.values.utility_cost, formik.values.allowance]);

  const handleSubmit = (values: GenerateDocument) => {
    let filteredValues: Partial<GenerateDocument> = {};
    switch (documentType) {
      case "manpower_request":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          created_date: values.created_date,
          selected_company: values.selected_company,
          selected_agency: values.selected_agency,
          job_details: values.job_details,
          total_workers: values.job_details?.reduce(
            (acc, job) => acc + job.no_of_workers,
            0
          ),
        };
        break;
      case "application_form":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          created_date: values.created_date,
          selected_company: values.selected_company,
          selected_agency: values.selected_agency,
        };
        break;
      case "employment_contract":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          created_date: values.created_date,
          selected_company: values.selected_company,
          selected_agency: values.selected_agency,
          worker_name: values.worker_name,
          philippine_address: values.philippine_address,
          civil_status: values.civil_status,
          passport_no: values.passport_no,
          passport_date_issued: values.passport_date_issued,
          passport_place_issued: values.passport_place_issued,

          employment_address: values.employment_address,
          // employment_address: values.selected_company !== "" ? companies.find(
          //   (company) => company.id === values.selected_company
          // )?.municipality_town_en || "" : "",
          employment_term: values.employment_term,
          job_position_title: values.job_position_title,
          job_position_description: values.job_position_description,
        };
        break;
      case "recruitment_agreement":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          created_date: values.created_date,
          selected_company: values.selected_company,
          selected_agency: values.selected_agency,
        };
        break;
      // ssw
      case "company_profile":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          created_date: values.created_date,
          selected_company: values.selected_company,
          selected_agency: values.selected_agency,
        };
        break;
      case "task_qualification_list":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          created_date: values.created_date,
          selected_company: values.selected_company,
          selected_agency: values.selected_agency,
          ssw_job_title: values.ssw_job_title,
        };
        break;
      case "aqium_license_copy":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
        };
        break;
      case "aqium_representative_passport_copy":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
        };
        break;
      case "psw_initial_checklist":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
        };
        break;
      case "ssw_initial_checklist":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
        };
        break;
      case "ssw_salary_breakdown":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          created_date: values.created_date,
          selected_company: values.selected_company,
          selected_agency: values.selected_agency,
          basic_salary: values.basic_salary,
          income_tax: values.income_tax,
          social_insurance: values.social_insurance,
          housing_cost: values.housing_cost,
          utility_cost: values.utility_cost,
          allowance: values.allowance,
          net_salary: values.net_salary,
          total_deductions: values.total_deductions,
          total_allowances: values.total_allowances,
          ssw_job_title: values.ssw_job_title,
        };
        break;
      case "letter_pack":
        filteredValues = {
          document_type: documentType,
          visa_type: visaType ?? "",
          application_type: applicationType ?? "",
          selected_company: values.selected_company,
          recipient_id: values.recipient_id,
        };
        break;
    }
    onGenerate(filteredValues as GenerateDocument);
  };

  //   manpower request event handlers
  const handleAddJob = () => {
    // if visatype is 'ssw', only allow 1 job detail
    if (visaType === "ssw") {
      if (formik.values.job_details?.length === 1) {
        showNotification({
          title: t("common.errors.unexpected.title"),
          message: t(
            "特定技能(SSW)ビザの種類については1つの項目のみ追加できます"
          ),
          color: "orange.6",
        });
        return;
      }
    }

    formik.setFieldValue("job_details", [
      ...(formik.values.job_details ?? []),
      {
        id: formik.values.job_details?.length ?? 0,
        title: "",
        no_of_workers: 1,
        salary: "",
      },
    ]);
  };

  const handleRemoveJob = (index: number) => {
    const background = [...(formik.values.job_details ?? [])];
    background.splice(index, 1);
    formik.setFieldValue("job_details", background);
  };

  // disable button conditions
  const shouldDisableButton =
    (!formik.dirty && !formik.isSubmitting) ||
    formik.values.created_date == null ||
    formik.values.selected_company == "" ||
    formik.values.selected_agency == "";

  // Check if documentType is 'aqium_representative_passport_copy' or 'aqium_license_copy' but check first if visaType is not null or empty
  const shouldNegateValues =
    documentType === "aqium_representative_passport_copy" ||
    documentType === "aqium_license_copy" ||
    documentType === "psw_initial_checklist" ||
    documentType === "ssw_initial_checklist" ||
    documentType === "letter_pack";

  // Combine the conditions
  const isButtonDisabled = shouldDisableButton && !shouldNegateValues;

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      {/* ================== GENERAL DOCUMENT FIELDS ================== */}

      {!shouldNegateValues && (
        <>
          <Text mb="md" fz={"h2"} fw={"bold"}>
            {t("database.generateDocument.form.documentInformation")}{" "}
            <span className={classes.required}>
              {t("common.validations.required")}
            </span>
          </Text>

          <Grid px={"md"} mb={"sm"}>
            <Grid.Col span={10}>
              <Text
                size="xl"
                fw={"bold"}
                c={"orange.6"}
                // style={{ borderBottom: "5px solid var(--mantine-color-orange-5)" }}
              >
                {t("database.generateDocument.form.general")}
              </Text>
            </Grid.Col>
            <Grid.Col span={2}></Grid.Col>

            <Grid.Col span={1.5}>
              <DateInput
                valueFormat="YYYY/MM/DD"
                size="md"
                label={t("database.generateDocument.form.createdAt")}
                // placeholder={t("common.form.date.placeholder")}
                value={formik.values.created_date}
                onChange={(value: DateValue) => {
                  formik.setFieldValue("created_date", value);
                }}
                error={formik.errors.created_date as string}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <Autocomplete
                size="md"
                label={t("database.generateDocument.form.company")}
                data={companies.map((company) => ({
                  label: company.name_ja,
                  value: company.id,
                }))}
                value={
                  companies.find(
                    (company) => company.id === formik.values.selected_company
                  )?.name_ja || ""
                }
                onChange={(value) => {
                  const selectedCompany = companies.find(
                    (company) => company.name_ja === value
                  );
                  formik.setFieldValue(
                    "selected_company",
                    selectedCompany?.id || ""
                  );

                  if (selectedCompany) {
                    const address_en = `${selectedCompany?.building_en}, ${selectedCompany?.municipality_town_en}, ${selectedCompany?.prefecture_en}`;

                    // set this to employment_address
                    formik.setFieldValue("employment_address", address_en);
                  } else {
                    formik.setFieldValue("employment_address", "");
                  }
                }}
                error={formik.errors.selected_company as string}
              />
            </Grid.Col>
            <Grid.Col span={3}>
              <Autocomplete
                size="md"
                label={t("database.generateDocument.form.agency")}
                data={agencies.map((agency) => ({
                  label: agency.name,
                  value: agency.id,
                }))}
                value={
                  agencies.find(
                    (agency) => agency.id === formik.values.selected_agency
                  )?.name || ""
                }
                onChange={(value) => {
                  const selectedAgency = agencies.find(
                    (agency) => agency.name === value
                  );

                  formik.setFieldValue(
                    "selected_agency",
                    selectedAgency?.id || ""
                  );
                }}
                error={formik.errors.selected_agency as string}
              />
            </Grid.Col>
          </Grid>
        </>
      )}

      {/* ================== MANPOWER REQUEST DOCUMENT ================== */}
      {documentType == "manpower_request" && (
        <>
          <Grid px={"md"} my={"md"}>
            <Grid.Col span={10}>
              <Text
                // size="xl"
                fz={"h2"}
                fw={"bold"}
                c={"indigo.5"}
                // style={{ borderBottom: "5px solid var(--mantine-color-indigo-5)" }}
              >
                {t("database.generateDocument.form.manpowerRequest")}
              </Text>
            </Grid.Col>
            <Grid.Col span={2}></Grid.Col>

            <Grid.Col span={2}>
              <Button
                size="md"
                c="black"
                // color="action.4"
                color="indigo.4"
                onClick={handleAddJob}
                leftSection={<IconPlus size={24} />}
              >
                {t("database.generateDocument.form.jobDetails.add")}
              </Button>
            </Grid.Col>
            <Grid.Col span={10}></Grid.Col>
          </Grid>

          {formik.values.job_details &&
            formik.values.job_details.map((item: JobDetails, index: number) => (
              <Grid px={"md"} id={item.id?.toString()} key={index}>
                <Grid.Col span={3}>
                  {/* check if visaType is either psw or ssw */}
                  {visaType === "psw" && (
                    <>
                      <TextInput
                        size="md"
                        label={t(
                          "database.generateDocument.form.jobDetails.title"
                        )}
                        // placeholder={t("common.form.company.placeholder")}
                        value={item.title ? item.title : ""}
                        onChange={formik.handleChange(
                          `job_details[${index}].title`
                        )}
                        name={`job_details[${index}].title`}
                        error={getNestedError(
                          `job_details.${index}.title`,
                          formik.errors
                        )}
                      />
                    </>
                  )}

                  {visaType === "ssw" && (
                    <>
                      <Select
                        size="md"
                        // label={t("database.generateDocument.form.company")}
                        label="特定技能の業種"
                        data={JobPositions.map((position) => ({
                          label: position.label,
                          value: position.value,
                        }))}
                        value={item.title ? item.title : ""}
                        onChange={(value) => {
                          formik.setFieldValue(
                            `job_details[${index}].title`,
                            value
                          );
                        }}
                        name={`job_details[${index}].title`}
                        error={getNestedError(
                          `job_details.${index}.title`,
                          formik.errors
                        )}
                        rightSection={
                          <IconChevronDown
                            style={{ width: rem(16), height: rem(16) }}
                          />
                        }
                      />
                    </>
                  )}
                </Grid.Col>
                <Grid.Col span={0.8}>
                  {/* created date */}
                  <NumberInput
                    size="md"
                    min={1}
                    max={50}
                    clampBehavior="strict"
                    label={t(
                      "database.generateDocument.form.jobDetails.noOfWorkers"
                    )}
                    placeholder={t("common.form.date.placeholder")}
                    value={item.no_of_workers ? item.no_of_workers : 0}
                    onChange={(value) =>
                      formik.setFieldValue(
                        `job_details[${index}].no_of_workers`,
                        value
                      )
                    }
                    name={`job_details[${index}].no_of_workers`}
                    error={getNestedError(
                      `job_details.${index}.no_of_workers`,
                      formik.errors
                    )}
                  />
                </Grid.Col>
                <Grid.Col span={1.5}>
                  {/* created date */}
                  <TextInput
                    size="md"
                    leftSection={
                      <IconCurrencyYen
                        size={24}
                        style={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                    }
                    label={t(
                      "database.generateDocument.form.jobDetails.basicSalary"
                    )}
                    // placeholder={t("common.form.company.placeholder")}
                    value={item.basic_salary ? item.basic_salary : ""}
                    onChange={formik.handleChange(
                      `job_details[${index}].basic_salary`
                    )}
                    name={`job_details[${index}].basic_salary`}
                    error={getNestedError(
                      `job_details.${index}.basic_salary`,
                      formik.errors
                    )}
                  />
                </Grid.Col>

                <Grid.Col span={0.5}>
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
                      // variant="outline"
                      onClick={() => handleRemoveJob(index)}
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
            ))}
        </>
      )}
      {/* ================== MANPOWER REQUEST DOCUMENT ================== */}

      {/* ================== EMPLOYMENT CONTRACT DOCUMENT ================== */}
      {documentType === "employment_contract" && visaType === "psw" && (
        <>
          <Grid px={"md"} my={"xs"}>
            <Grid.Col span={10}>
              <Text
                // size="xl"
                fz={"h2"}
                fw={"bold"}
                c={"pink.5"}
                style={{
                  borderBottom: "3px solid var(--mantine-color-pink-5)",
                }}
              >
                {t("database.generateDocument.form.employmentContract")}

                <span className={classes.required}>{"ENGLISH"}</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={2}></Grid.Col>
          </Grid>

          <Grid px={"md"}>
            <Grid.Col span={12}>
              <Text
                // size="xl"
                fz={"h3"}
                fw={"bold"}
                c={"pink.7"}
                // style={{ borderBottom: "5px solid var(--mantine-color-indigo-5)" }}
              >
                {t("database.generateDocument.form.workerDetails")}
              </Text>
            </Grid.Col>

            <Grid.Col span={3}>
              <TextInput
                size="md"
                label={t("database.generateDocument.form.workerName")}
                // placeholder={t("common.form.company.placeholder")}
                value={formik.values.worker_name}
                onChange={formik.handleChange("worker_name")}
                name="worker_name"
                error={formik.errors.worker_name as string}
              />

              {/* civil status  */}
              <Grid.Col span={7} m={0} p={0} mt={"xs"}>
                <Autocomplete
                  size="md"
                  // mt={"xs"}
                  label={t("database.generateDocument.form.civilStatus")}
                  data={[
                    "Single",
                    "Married",
                    "Widowed",
                    "Separated",
                    "Divorced",
                  ]}
                  value={formik.values.civil_status}
                  onChange={formik.handleChange("civil_status")}
                  error={formik.errors.civil_status as string}
                />
              </Grid.Col>
            </Grid.Col>

            <Grid.Col span={5}>
              <Textarea
                size="md"
                label={t("database.generateDocument.form.philippineAddress")}
                // placeholder={t("common.form.company.placeholder")}
                value={formik.values.philippine_address}
                onChange={formik.handleChange("philippine_address")}
                name="philippine_address"
                error={formik.errors.philippine_address as string}
              />
            </Grid.Col>

            <Grid.Col span={4}></Grid.Col>

            {/* passport details */}
            <Grid.Col span={3}>
              <TextInput
                size="md"
                label={t("database.generateDocument.form.passportNumber")}
                // placeholder={t("common.form.company.placeholder")}
                value={formik.values.passport_no}
                onChange={formik.handleChange("passport_no")}
                name="passport_no"
                error={formik.errors.passport_no as string}
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <DateInput
                valueFormat="YYYY/MM/DD"
                size="md"
                label={t("database.generateDocument.form.passportDateIssued")}
                // placeholder={t("common.form.date.placeholder")}
                value={formik.values.passport_date_issued}
                onChange={(value: DateValue) => {
                  formik.setFieldValue("passport_date_issued", value);
                }}
                error={formik.errors.passport_date_issued as string}
              />
            </Grid.Col>

            <Grid.Col span={4}>
              <TextInput
                size="md"
                label={t("database.generateDocument.form.passportPlaceIssued")}
                // placeholder={t("common.form.company.placeholder")}
                value={formik.values.passport_place_issued}
                onChange={formik.handleChange("passport_place_issued")}
                name="passport_place_issued"
                error={formik.errors.passport_place_issued as string}
              />
            </Grid.Col>

            <Grid.Col span={2}></Grid.Col>

            <Grid.Col span={12}>
              <Text
                // size="xl"
                fz={"h3"}
                fw={"bold"}
                c={"pink.7"}
                // style={{ borderBottom: "5px solid var(--mantine-color-indigo-5)" }}
              >
                {t("database.generateDocument.form.employmentDetails")}
              </Text>
            </Grid.Col>

            <Grid.Col span={5}>
              <Textarea
                size="md"
                resize="vertical"
                label={t("database.generateDocument.form.employmentAddress")}
                // placeholder={t("common.form.company.placeholder")}
                value={formik.values.employment_address}
                onChange={formik.handleChange("employment_address")}
                name="employment_address"
                error={formik.errors.employment_address as string}
              />
              {/* <Autocomplete
                size="md"
                label={t("database.generateDocument.form.employmentAddress")}
                data={companies.map((company) => ({
                  label: company.name_ja,
                  value: company.id,
                }))}
                value={
                  companies.find(
                    (company) => company.id === formik.values.employment_address
                  )?.name_ja || ""
                }
                onChange={(value) => {
                  const selectedCompany = companies.find(
                    (company) => company.name_ja === value
                  );
                  formik.setFieldValue(
                    "selected_company",
                    selectedCompany?.id || ""
                  );
                }}
                error={formik.errors.selected_company as string}
              /> */}
            </Grid.Col>
            <Grid.Col span={2}>
              <Autocomplete
                data={["1 years", "3 years", "5 years"]}
                size="md"
                label={t("database.generateDocument.form.employmentTerm")}
                placeholder={"e.g 1 year, 3 years"}
                value={formik.values.employment_term}
                onChange={formik.handleChange("employment_term")}
                name="employment_term"
                error={formik.errors.employment_term as string}
              />
            </Grid.Col>

            <Grid.Col span={5}></Grid.Col>

            <Grid.Col span={5}>
              <TextInput
                size="md"
                label={t("database.generateDocument.form.jobPositionTitle")}
                placeholder={""}
                value={formik.values.job_position_title}
                onChange={formik.handleChange("job_position_title")}
                name="job_position_title"
                error={formik.errors.job_position_title as string}
              />
            </Grid.Col>

            <Grid.Col span={5}>
              <Textarea
                size="md"
                label={t(
                  "database.generateDocument.form.jobPositionDescription"
                )}
                resize="vertical"
                // placeholder={t("common.form.company.placeholder")}
                value={formik.values.job_position_description}
                onChange={formik.handleChange("job_position_description")}
                name="job_position_description"
                error={formik.errors.job_position_description as string}
              />
            </Grid.Col>
          </Grid>
        </>
      )}
      {/* ================== EMPLOYMENT CONTRACT DOCUMENT ================== */}

      {/* ================== SSW LIST OF TASK AND CRITERIA DOCUMENT ================== */}
      {documentType == "task_qualification_list" && (
        <>
          <Grid px={"md"} my={"xs"}>
            <Grid.Col span={10}>
              <Text
                // size="xl"
                fz={"h2"}
                fw={"bold"}
                c={"pink.5"}
                style={{
                  borderBottom: "3px solid var(--mantine-color-pink-5)",
                }}
              >
                {t("database.generateDocument.form.listOfTasksCriteria")}

                <span className={classes.required}>{"ENGLISH"}</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={2}></Grid.Col>
          </Grid>

          <Grid px={"md"}>
            <Grid.Col span={5}>
              <Select
                size="md"
                // label={t("database.generateDocument.form.company")}
                label="特定技能の業種"
                data={JobPositions.map((position) => ({
                  label: position.label,
                  value: position.value,
                }))}
                value={formik.values.ssw_job_title}
                onChange={(value) => {
                  formik.setFieldValue("ssw_job_title", value);
                }}
                error={formik.errors.ssw_job_title as string}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
              />
            </Grid.Col>
          </Grid>
        </>
      )}
      {/* ================== SSW LIST OF TASK AND CRITERIA DOCUMENT ================== */}

      {/* ================== SSW SALARY SCHEME BREAKDOWN ================== */}
      {documentType == "ssw_salary_breakdown" && (
        <>
          {/* <Grid my={"xs"}>
            <Grid.Col span={10}>
              <Text
                // size="xl"
                fz={"h2"}
                fw={"bold"}
                c={"pink.5"}
                // style={{
                //   borderBottom: "3px solid var(--mantine-color-pink-5)",
                // }}
              >
                {t("database.generateDocument.form.salaryScheme")}

                <span className={classes.required}>{"ENGLISH"}</span>
              </Text>
            </Grid.Col>
            <Grid.Col span={2}></Grid.Col>
          </Grid> */}

          <Grid px={"md"}>
            <Grid.Col span={6}>
              <Select
                size="md"
                // label={t("database.generateDocument.form.company")}
                label={t("database.generateDocument.form.jobPositionTitle")}
                data={JobPositions.map((position) => ({
                  label: position.label,
                  value: position.value,
                }))}
                value={formik.values.ssw_job_title}
                onChange={(value) => {
                  formik.setFieldValue("ssw_job_title", value);
                }}
                error={formik.errors.ssw_job_title as string}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>

            <Grid.Col span={12}>
              <Text fw={"bolder"} c={"pink.6"}>
                A. Basic Monthly Salary
              </Text>
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="Salary"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.basic_salary}
                onChange={(value) => {
                  formik.setFieldValue("basic_salary", value);

                  // calculate net salary by basic salary - total deductions
                  const net_salary = formik.values.basic_salary! - formik.values.total_deductions!;
                  formik.setFieldValue("net_salary", net_salary);
                }}
                error={formik.errors.basic_salary as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="Net Salary"
                // allowNegative={false}
                thousandSeparator={","}
                disabled={true}
                // defaultValue={180_000}
                // value={formik.values.basic_salary}
                value={formik.values.net_salary}
                // onChange={(value) => {
                  
                //   // calculate net salary by basic salary - total deductions
                //   const net_salary = formik.values.basic_salary! - formik.values.total_deductions!;

                //   formik.setFieldValue("net_salary", net_salary);
                // }}
                error={formik.errors.basic_salary as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>
            <Grid.Col span={6}></Grid.Col>

            <Grid.Col span={12}>
              <Text fw={"bolder"} c={"pink.6"}>
                B. Approximate Deductions
              </Text>
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="1. Income Tax"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.income_tax}
                onChange={(value) => {
                  formik.setFieldValue("income_tax", value);

                  // calculate total deductions
                  const total_deductions = Number(value) + formik.values.social_insurance! + formik.values.housing_cost! + formik.values.utility_cost!;
                  formik.setFieldValue("total_deductions", total_deductions);

                }}
                error={formik.errors.income_tax as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="2. Social Insurance"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.social_insurance}
                onChange={(value) => {
                  formik.setFieldValue("social_insurance", value);

                  // calculate total deductions
                  const total_deductions = formik.values.income_tax! + Number(value) + formik.values.housing_cost! + formik.values.utility_cost!;
                  formik.setFieldValue("total_deductions", total_deductions);
                }}
                error={formik.errors.social_insurance as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="3. Housing Cost"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.housing_cost}
                onChange={(value) => {
                  formik.setFieldValue("housing_cost", value);

                  // calculate total deductions
                  const total_deductions = formik.values.income_tax! + formik.values.social_insurance! + Number(value) + formik.values.utility_cost!;
                  formik.setFieldValue("total_deductions", total_deductions);
                }}
                error={formik.errors.housing_cost as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="4. Utility Cost"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.utility_cost}
                onChange={(value) => {
                  formik.setFieldValue("utility_cost", value);

                  // calculate total deductions
                  const total_deductions = formik.values.income_tax! + formik.values.social_insurance! + formik.values.housing_cost! + Number(value);
                  formik.setFieldValue("total_deductions", total_deductions);
                }}
                error={formik.errors.utility_cost as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="Total Deductions"
                allowNegative={false}
                thousandSeparator={","}
                disabled
                value={formik.values.total_deductions}
                onChange={(value) => {
                  formik.setFieldValue("total_deductions", value);

                  // calculate net salary by basic salary - total deductions
                  const net_salary = formik.values.basic_salary! - Number(value);
                  formik.setFieldValue("net_salary", net_salary);
                }}
                error={formik.errors.total_deductions as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={9}></Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="4. Utility Cost"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.utility_cost}
                onChange={(value) => {
                  formik.setFieldValue("utility_cost", value);

                  // calculate total deductions
                  const total_deductions = formik.values.income_tax! + formik.values.social_insurance! + formik.values.housing_cost! + Number(value);
                  formik.setFieldValue("total_deductions", total_deductions);
                }}
                error={formik.errors.utility_cost as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={9}></Grid.Col>
            
            <Grid.Col span={12}>
              <Text fw={"bolder"} c={"pink.6"}>
                C. Other Allowances/Benefits (monthly)
              </Text>
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="Allowance"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.allowance}
                onChange={(value) => {
                  formik.setFieldValue("allowance", value);
                }}
                error={formik.errors.allowance as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <NumberInput
                size="md"
                label="Total Allowances"
                allowNegative={false}
                thousandSeparator={","}
                value={formik.values.total_allowances}
                disabled
                // onChange={(value) => {
                //   formik.setFieldValue("total_allowances", value);
                // }}
                error={formik.errors.total_allowances as string}
                rightSection={
                  <IconCurrencyYen
                    style={{ width: rem(20), height: rem(20) }}
                  />
                }
              />
            </Grid.Col>

            <Grid.Col span={9}></Grid.Col>
          </Grid>
        </>
      )}
      {/* ================== SSW SALARY SCHEME BREAKDOWN ================== */}

      {/* ================== LETTER PACK ================== */}
      {documentType == "letter_pack" && (
        <>
          <Grid px={"md"} my={"xs"}>
            <Grid.Col span={10}>
              <Text
                // size="xl"
                fz={"h2"}
                fw={"bold"}
                c={"pink.5"}
                style={{
                  borderBottom: "3px solid var(--mantine-color-pink-5)",
                }}
              >
                {t("database.generateDocument.form.letterPackDetails")}

                <span className={classes.required}>
                  {t("common.validations.required")}
                </span>
              </Text>
            </Grid.Col>
            <Grid.Col span={2}></Grid.Col>
          </Grid>

          <Grid px={"md"}>
            <Grid.Col span={4}>
              <Autocomplete
                size="md"
                // label={t("database.generateDocument.form.company")}
                label="ご依頼主 (FROM)"
                data={companies.map((company) => ({
                  label: company.name_ja,
                  value: company.id,
                }))}
                value={
                  companies.find(
                    (company) => company.id === formik.values.selected_company
                  )?.name_ja || ""
                }
                onChange={(value) => {
                  const selectedCompany = companies.find(
                    (company) => company.name_ja === value
                  );
                  formik.setFieldValue(
                    "selected_company",
                    selectedCompany?.id || ""
                  );

                  if (selectedCompany) {
                    const address_en = `${selectedCompany?.building_en}, ${selectedCompany?.municipality_town_en}, ${selectedCompany?.prefecture_en}`;

                    // set this to employment_address
                    formik.setFieldValue("employment_address", address_en);
                  } else {
                    formik.setFieldValue("employment_address", "");
                  }
                }}
                error={formik.errors.selected_company as string}
              />
            </Grid.Col>

            <Grid.Col span={3}>
              <Select
                size="md"
                // label={t("database.generateDocument.form.company")}
                label="お届け先 (TO)"
                data={letterPackTOAddresses.map((position) => ({
                  label: position.label,
                  value: position.value,
                }))}
                value={formik.values.recipient_id}
                onChange={(value) => {
                  formik.setFieldValue("recipient_id", value);
                }}
                error={formik.errors.recipient_id as string}
                rightSection={
                  <IconChevronDown
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
              />
            </Grid.Col>
          </Grid>
        </>
      )}

      {/* ================== LETTER PACK ================== */}
      <Group py={"md"} mx={"md"}>
        <Button
          variant="gradient"
          size="lg"
          type="submit"
          gradient={{ from: "pink", to: "red" }}
          loading={processing}
          disabled={isButtonDisabled}
        >
          {t("database.generateDocument.actions.generate")}
        </Button>
      </Group>
    </form>
  );
};

export default GenerateDocumentForm;
