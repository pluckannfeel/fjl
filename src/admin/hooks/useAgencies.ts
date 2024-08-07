import { useQuery } from "react-query";
import { Agency } from "../types/Database";
import { axiosInstance } from "../../api/server";

const fetchAgencies = async (): Promise<Agency[]> => {
  const { data } = await axiosInstance.get("/company/agencies");
  // you can add affiliation later on if you want to filter by affiliation like angel care services etc..
  return data;
};

export function useGetAgencies() {
  return useQuery(["database_agencies"], () => fetchAgencies(), {});
}
