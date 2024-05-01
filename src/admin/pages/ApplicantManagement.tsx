import React from "react";
import { Text } from "@mantine/core";
import { useTranslation } from "react-i18next";
import ApplicantTable from "../components/ApplicantTable";
import { useGetApplicants } from "@/mirairo/hooks/useGetApplicants";
import CustomLoader from "@/core/components/Loader";
import { ApplicantRecords } from "../types/Applicant";
import dayjs from "dayjs";

type Props = {};

const ApplicantManagement = (props: Props) => {
  const { t } = useTranslation();
  const { isLoading, data: applicants } = useGetApplicants();

  // Transform the applicants data into ApplicantRecords format
  const applicantRecords: ApplicantRecords[] =
    applicants?.map((applicant) => ({
      id: applicant.id || "Unknown ID",
      registered_date: applicant.created_at || "Unknown Date",
      name: `${applicant.last_name}, ${applicant.first_name}`,
      recruiter: applicant.recruiter || "N/A",
      organization: applicant.organization || "N/A",
      result: "Pending",
      visa: applicant.visa || "N/A",
    })) || [];
  return (
    <React.Fragment>
      {isLoading && <CustomLoader />}
      <Text
        ta="center"
        size="xl"
        style={{ marginTop: "2rem", marginBottom: "2rem" }}
      >
        {t("applicantManagement.title")}
      </Text>

      <ApplicantTable data={applicantRecords} />
    </React.Fragment>
  );
};

export default ApplicantManagement;
