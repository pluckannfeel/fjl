import { useQuery } from "react-query";
import { Company } from "../types/Database";
import { axiosInstance } from "../../api/server";

const fetchCompanies = async (): Promise<Company[]> => {
  const { data } = await axiosInstance.get("/company/all");
  // you can add affiliation later on if you want to filter by affiliation like angel care services etc..
  return data;
};

export function useGetCompanies() {
  return useQuery(["database_companies"], () => fetchCompanies(), {});
}
