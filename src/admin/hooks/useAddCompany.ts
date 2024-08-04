import { useMutation, useQueryClient } from "react-query";
import { Company } from "../types/Database";
import { axiosInstance } from "../../api/server";

const addCompany = async (company: Company) => {
  const formData = new FormData();

  const companyObject = {
    ...company,
  };

  formData.append("company_json", JSON.stringify(companyObject));

  const { data } = await axiosInstance.post(`/company/add`, formData);

  return data;
};

export const useAddCompany = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(addCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries("database_companies");
    },
  });

  return { isAdding: isLoading, addCompany: mutateAsync };
};
