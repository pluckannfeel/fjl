import { useMutation, useQueryClient } from "react-query";
import { addOne } from "../../core/utils/crudUtils";
import { PersonalInformation as Applicant } from "../types/Information";
import { axiosInstance } from "../../api/server";

const submitApplicant = async (applicant: Applicant) => {
  const applicantImg = applicant.img_url;

  const applicant_data = {
    ...applicant,
  };

  delete applicant_data.img_url;

  const formData = new FormData();
  formData.append("applicant_json", JSON.stringify(applicant_data));

  const { data } = await axiosInstance.post(
    "/applicant/create_applicant",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export function useSubmitApplicant() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(submitApplicant, {
    onSuccess: () => {
      queryClient.invalidateQueries("applicants");
    },
  });

  return { isLoading, submitApplicant: mutateAsync };
}
