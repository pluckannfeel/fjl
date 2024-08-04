import { useMutation, useQueryClient } from "react-query";
import { Company } from "../types/Database";
import { axiosInstance } from "../../api/server";

const updateCompany = async (company: Company) => {
  const formData = new FormData();

  formData.append("company_json", JSON.stringify(company));

  const { data } = await axiosInstance.put("/company/edit", formData);

  return data;
};

export const useEditCompany = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(updateCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries("database_companies");
    },
  });

  return { isEditing: isLoading, editCompany: mutateAsync };
};
