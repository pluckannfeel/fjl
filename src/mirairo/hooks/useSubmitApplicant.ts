import { useMutation, useQueryClient } from "react-query";
// import { addOne } from "../../core/utils/crudUtils";
import { PersonalInformation as Applicant } from "../types/Information";
import { axiosInstance } from "../../api/server";
import dayjs from "dayjs";
import { applicantUploadFile, renameFile } from "@/core/helpers/s3Upload";

const submitApplicant = async (applicant: Applicant) => {
  // prepare data
  const applicantImg = applicant.img_url;
  // excluded img url

  const applicant_data = {
    // organization: "mirairo",
    img_url: "",
    first_name: applicant.name.first_name,
    last_name: applicant.name.last_name,
    middle_name: applicant.name.middle_name,
    // birthday by dayjs
    birth_date: dayjs(
      `${applicant.birth_date.year}-${applicant.birth_date.month}-${applicant.birth_date.day}`
    ).format("YYYY-MM-DD"),
    age: applicant.age,
    gender: applicant.gender,
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

  if (applicantImg && applicantImg instanceof File) {
    const renamedFile: File = renameFile(
      `${applicant.name.first_name} ${applicant.name.last_name}`,
      applicantImg as File
    );

    const uploadImageObject = {
      file: renamedFile,
      key: `applicants/img/${renamedFile.name}`,
      user: `${applicant.name.first_name} ${applicant.name.last_name}`,
    };

    const uploadImageData = await applicantUploadFile(uploadImageObject);

    console.log(uploadImageData);

    if(uploadImageData.data?.url) {
      applicant_data.img_url = uploadImageData.data.url;
    }
  }

  const formData = new FormData();

  // display photo append
  // if (applicantImg) formData.append("display_photo", applicantImg);

  // licenses append
  if (applicant.qualifications_licenses) {
    applicant.qualifications_licenses.forEach((license) => {
      if (license.file) {
        formData.append("licenses", license.file);
      }
    });
  }

  //photos append
  if (applicant.photos) {
    applicant.photos.forEach((photo) => {
      formData.append("photos", photo);
    });

    // delete photos from applicant_data
  }

  formData.append("applicant_json", JSON.stringify(applicant_data));


  const { data } = await axiosInstance.post(
    "/applicant/create_applicant",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export function useSubmitApplicant() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(submitApplicant, {
    onSuccess: () => {
      queryClient.invalidateQueries("applicants");
    },
  });

  return { isLoading, submitApplicant: mutateAsync };
}
