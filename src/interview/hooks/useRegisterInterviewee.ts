import { useMutation } from "react-query";
import { UserInfo } from "../../auth/types/userInfo";
import { axiosInstance } from "../../api/server";
import { Interviewee } from "../types/interviewee";
import dayjs from "dayjs";

const register = async (user: Interviewee): Promise<Interviewee> => {
  const user_image = user.img_url;

  const user_residence_img = user.residence_card_image;

  const user_data = {
    first_name: user.first_name,
    last_name: user.last_name,
    middle_name: user.middle_name,
    birth_date: dayjs(
      `${user.birth_date.year}-${user.birth_date.month}-${user.birth_date.day}`
    ).format("YYYY-MM-DD"),
    age: user.age,
    gender: user.gender,
    nationality: user.nationality,
    university_name: user.university_name,
    selected_dates: user.selected_dates,
    residence_card_number: user.residence_card_number,
    residence_card_expiry: user.residence_card_expiry,
    phone_number: user.phone_number,
    email: user.email,
    password: user.password,
  };

  const formData = new FormData();

  if (user_image) formData.append("interviewee_image", user_image);

  if (user_residence_img)
    formData.append("residence_card_image", user_residence_img);

  formData.append("data_json", JSON.stringify(user_data));

  const { data } = await axiosInstance.post(
    "/interviewees/register_interviewee",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export function useRegisterInterviewee() {
  const { isLoading, mutateAsync } = useMutation(register);
  return { isRegistering: isLoading, register: mutateAsync };
}
