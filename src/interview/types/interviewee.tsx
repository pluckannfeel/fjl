export type Interviewee = {
  id?: string;
  img_url: File | string | null;
  //   name: Name;
  first_name?: string;
  last_name?: string;
  middle_name?: string;
  birth_date: BirthDate;
  gender: string;
  age: number;
  nationality: string;
  university_name: string;
  selected_dates: InterviewDateTime[];
  residence_card_number: string;
  residence_card_expiry: string;
  residence_card_image: File | string | null;
  phone_number: string;
  email: string;
  password: string;
  confirm_password: string;
  date_created?: Date;
};

export type InterviewDateTime = {
  id?: string;
  date: string;
  time: string; // range of time e.g 11:00 - 12:00
};

// type Name = {
//   first_name: string;
//   last_name?: string;
//   middle_name: string;
// };

type BirthDate = {
  year: string;
  month: string;
  day: string;
};
