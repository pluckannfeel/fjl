import { useQuery } from "react-query";
import { ApplicantResume, PersonalInformation } from "../types/Information";
import { axiosInstance } from "../../api/server";

const fetchApplicantData = async (token: string): Promise<ApplicantResume> => {
  const { data } = await axiosInstance.get(`/applicant/get_applicant_info`, {
    params: {
      token: token,
    },
  });

  return data;
};

export function useGetApplicantData(token: string) {
  return useQuery(["applicant", token], () => fetchApplicantData(token), {
    enabled: !!token,
  });
}
