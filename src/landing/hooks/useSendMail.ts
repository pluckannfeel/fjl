import { useMutation, useQueryClient } from "react-query";
import { axiosInstance } from "@/api/server";
import { SendMessage } from "../types/Form";

const sendMail = async (data: SendMessage) => {
  const response = await axiosInstance.get("/send_mail_by_guest", {
    params: {
      email: data.email,
      name: data.name,
      message: data.message,
    },
  });
  return response.data;
};

export function useSendMail() {
  const queryClient = useQueryClient();

  const { isLoading, mutateAsync } = useMutation(sendMail, {
    onSuccess: () => {},
  });

  return { isSending: isLoading, sendMail: mutateAsync };
}
