import { useQuery } from "react-query";
import { Applicant } from "@/admin/types/Applicant";
import { axiosInstance } from "../../api/server";

const fetchApplicants = async (): Promise<Applicant[]> => {
  const { data } = await axiosInstance.get("/applicant/all");
  // you can add affiliation later on if you want to filter by affiliation like angel care services etc..
  return data;
};

export function useGetApplicants() {
  return useQuery(["applicants"], () => fetchApplicants(), {});
}
