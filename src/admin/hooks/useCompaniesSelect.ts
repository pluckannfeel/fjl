import { useQuery } from "react-query";
import { CompanySelect } from "../types/Database";
import { axiosInstance } from "@/api/server";

const fetchCompaniesSelect = async (): Promise<CompanySelect[]> => {
  const { data } = await axiosInstance.get("/company/company_select");

  return data;
};

export function useCompaniesSelect() {
  return useQuery(["database_companies_select"], () => fetchCompaniesSelect(), {});
}