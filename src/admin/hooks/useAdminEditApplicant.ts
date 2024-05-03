import { useMutation, useQueryClient } from "react-query";
import { updateOne } from "../../core/utils/crudUtils";
import { Applicant, ApplicantRecords } from "../types/Applicant";
import { axiosInstance } from "../../api/server";

const editApplicant = async (applicant: Applicant) => {
  const formData = new FormData();

  const applicantObject = {
    id: applicant.id,
    recruiter: applicant.recruiter,
    result: applicant.result,
    interview_date: applicant.interview_date,
    organization: applicant.organization,
    visa: applicant.visa,
  };

  formData.append("data", JSON.stringify(applicantObject));

  const { data } = await axiosInstance.put(
    `/applicant/admin_edit_applicant`,
    formData
  );

  return data;
};

export function useAdminEditApplicant() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(editApplicant, {
    onSuccess: () => {
      queryClient.invalidateQueries("applicants");
    },
  });

  return { isEditing: isLoading, editApplicant: mutateAsync };
}
