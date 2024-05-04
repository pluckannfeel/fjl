import { useMutation } from "react-query";
// import { updateOne } from "../../core/utils/crudUtils";
import { Applicant } from "../types/Applicant";
import { axiosInstance } from "../../api/server";

const generatePDFApplicant = async (applicant: Applicant) => {
  const formData = new FormData();

  formData.append("data", JSON.stringify(applicant));

  const { data } = await axiosInstance.post(
    `/applicant/generate_applicant_pdf`,
    formData
  );

  return data;
};

export function useGeneratePDFApplicantCV() {
  //   const queryClient = useQueryClient();
  const { isLoading, mutateAsync } = useMutation(generatePDFApplicant, {
    onSuccess: () => {
      //   queryClient.invalidateQueries("applicants");
    },
  });

  return { isGenerating: isLoading, generatePDFApplicant: mutateAsync };
}
