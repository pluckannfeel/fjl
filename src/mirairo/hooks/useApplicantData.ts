import { useQuery } from "react-query";
import { PersonalInformation } from "../types/Information";
import { axiosInstance } from "../../api/server";

const fetchApplicantData = async (
  applicant_id: string
): Promise<PersonalInformation> => {
  const { data } = await axiosInstance.get(`/applicant/${applicant_id}`);

  return data;
};

export function useApplicantData(applicant_id: string) {
  return useQuery(["applicant", applicant_id], () =>
    fetchApplicantData(applicant_id)
  );
}
