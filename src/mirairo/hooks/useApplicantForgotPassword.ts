import { useMutation } from "react-query";
import { axiosInstance } from "../../api/server";

const forgotPassword = async ({ email }: { email: string }) => {
  const formdata = new FormData();

  formdata.append("email", email);

  const { data } = await axiosInstance.post(
    "/applicant/forgot_password",
    formdata
  );
  return data;
};

export function useApplicantForgotPassword() {
  const { isLoading, mutateAsync } = useMutation(forgotPassword);
  return { isLoading, forgotPassword: mutateAsync };
}
