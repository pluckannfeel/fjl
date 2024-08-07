import { useMutation } from "react-query";
import { GenerateDocument } from "../types/Database";
import { axiosInstance } from "../../api/server";

const generateDocument = async (generateDocument: GenerateDocument) => {
  const formData = new FormData();
  formData.append("details", JSON.stringify(generateDocument));

  const response = await axiosInstance.post("/company/generate_document", formData);

  return response.data;
};

export function useGenerateDocument() {
  const { mutateAsync, isLoading } = useMutation(generateDocument);

  return {
    isGeneratingDocument: isLoading,
    generateDocument: mutateAsync,
  };
}
