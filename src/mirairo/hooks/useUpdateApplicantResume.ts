import { useMutation, useQueryClient } from "react-query";
import { updateOne } from "../../core/utils/crudUtils";
import {
  PersonalInformation as Applicant,
  ApplicantResume,
} from "../types/Information";
import { axiosInstance } from "../../api/server";
import dayjs from "dayjs";

const updateResume = async (applicant: ApplicantResume) => {
  const formData = new FormData();

  const applicantImg = applicant.img_url;

  const applicant_data = {
    id: applicant.id,
    first_name: applicant.first_name,
    last_name: applicant.last_name,
    birth_place: applicant.birth_place,
    marital_status: applicant.marital_status,
    occupation: applicant.occupation,
    current_address: applicant.current_address,
    phone_number: applicant.phone_number,
    // legal
    passport_number: applicant.passport_number,
    passport_expiry: applicant.passport_expiry,
    email: applicant.email,
    password: applicant.password,
    family: applicant.family,
    has_family: applicant.has_family,
    education: applicant.education,
    work_experience: applicant.work_experience,
    qualifications_licenses: applicant.qualifications_licenses,
    jlpt: applicant.jlpt,
    jft: applicant.jft,
    nat: applicant.nat,
    japanese: applicant.japanese,
    english: applicant.english,
    computer_skills: applicant.computer_skills,
    other_skills: applicant.other_skills,
    self_introduction: applicant.self_introduction,
    reason_for_application: applicant.reason_for_application,
    past_experience: applicant.past_experience,
    future_career_plan: applicant.future_career_plan,
    links: applicant.links,
    unique_questions: applicant.unique_questions,
    required_questions: applicant.required_questions,
  };

  if (applicantImg && !applicantImg.toString().includes("https://"))
    formData.append("display_photo", applicantImg);

  //   licenses append
  if (applicant.qualifications_licenses) {
    applicant.qualifications_licenses.forEach((license) => {
      if (license.file) {
        formData.append("licenses", license.file);
      }
    });
  }

  // eliminated photos
  formData.append("applicant_json", JSON.stringify(applicant_data));

  try {
    const { data } = await axiosInstance.put(
      "/applicant/update_applicant",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error("Error updating resume", error);
  }
};

export function useUpdateApplicantResume() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(updateResume, {
    onSuccess: () => {
      queryClient.invalidateQueries("applicants");
    },
  });

  return { isLoading, updateResume: mutateAsync };
}
