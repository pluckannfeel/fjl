import { useQuery } from "react-query";
import { AgencySelect } from "../types/Database";
import { axiosInstance } from "@/api/server";

const fetchAgenciesSelect = async (): Promise<AgencySelect[]> => {
  const { data } = await axiosInstance.get("/company/agency_select");

  return data;
};

export function useAgenciesSelect() {
  return useQuery(["database_agencies_select"], () => fetchAgenciesSelect(), {});
}