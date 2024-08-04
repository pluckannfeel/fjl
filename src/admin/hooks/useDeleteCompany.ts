import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "../../api/server";

const deleteCompany = async (company_ids: string[]): Promise<string[]> => {
  const formData = new FormData();

  company_ids.forEach((id) => {
    formData.append("company_ids", id);
  });

  const { data } = await axiosInstance.delete<string[]>("/company/delete", {
    data: formData,
  });

  return data;
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(deleteCompany, {
    onSuccess: () => {
      queryClient.invalidateQueries("database_companies");
    },
  });

  return { isDeleting: isLoading, deleteCompany: mutateAsync };
};
