import { useMutation } from "react-query";
import { axiosInstance } from "../../api/server";
import { ForgotPasswordSubmit } from "../types/Information";

const forgotPasswordSubmit = async (values: ForgotPasswordSubmit) => {
  const formdata = new FormData();

  formdata.append("submit_json", JSON.stringify(values));

  const { data } = await axiosInstance.post(
    "/applicant/forgot_password_submit",
    formdata
  );
  return data;
};

export function useApplicantForgotPasswordSubmit() {
  const { isLoading, mutateAsync } = useMutation(forgotPasswordSubmit);
  return { isLoading, submitNewPassword: mutateAsync };
}
