import { isError, useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "@/api/server";
import { Applicant } from "../types/Applicant";

const pdfTranslate = async (applicant: Applicant) => {
  const formData = new FormData();

  const applicantData = {
    id: applicant.id,
    first_name: applicant.first_name,
    last_name: applicant.last_name,
    middle_name: applicant.middle_name,
    other_skills: applicant.other_skills,
    self_introduction: applicant.self_introduction,
    reason_for_application: applicant.reason_for_application,
    past_experience: applicant.past_experience,
    future_career_plan: applicant.future_career_plan,
    unique_questions: applicant.unique_questions,
  };

  formData.append("data", JSON.stringify(applicantData));

  const { data } = await axiosInstance.put(
    `/applicant/applicant_pdf_translate`,
    formData
  );

  return data;
};

export function useAdminPDFTranslate() {
  const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(pdfTranslate, {
    onSuccess: () => {
      queryClient.invalidateQueries("applicants");
    },
  });

  return { isTranslating: isLoading, isError, pdfTranslate: mutateAsync };
}
